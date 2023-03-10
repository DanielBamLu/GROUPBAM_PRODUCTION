// -- IMPORTS
import { redirect } from '@sveltejs/kit';
import { userTable, orderTable, orderServiceTable, orderServicePackTable, orderServiceOptionVariantTable, beneficiaryTable } from '$lib/database';
import { getMillisecondTimestamp, getTranslatedTextByCode } from 'senselogic-gist';
import { writeFileSync, unlink } from 'fs';
import * as api from '$lib/api.js';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load(
    { params, locals }
    )
{
    let order = await orderTable.selectRow(
        {
            where : [ [ 'id' ], '=', params.orderId ]
        }
        );

    if ( locals.user.id != order.userId )
    {
        throw redirect( 307, '/' );
    }

    let orderServices = await orderServiceTable.selectRows(
        {
            where : [ [ 'orderId' ], '=', order.id ]
        }
        );

    let beneficiary = await beneficiaryTable.selectRow(
        {
            where : [ [ 'slug' ], '=', 'group-bam-sarls' ]
        }
        );

    return {
        order : order,
        orderServices : orderServices,
        beneficiary : beneficiary
        };
}

/** @type {import('./$types').Actions} */
export const actions = {
    edit: async ( { request, locals, params } ) => {

        const data = await request.formData();

        const timeStamp = getMillisecondTimestamp();
        //GALLERY
        let order = await orderTable.selectRow(
            {
                where : [ [ 'id' ], '=', params.orderId ]
            }
            );

        //Delete deleted items on gallery
        let galleryCounter = data.getAll( 'document-file-counter' );
        let galleryArray = [];

        for ( let indexGalleryCounter = 0; indexGalleryCounter < galleryCounter.length ;indexGalleryCounter++ )
        {
            let filePath = data.get( 'document-file-path-' + galleryCounter[ indexGalleryCounter ] );

            galleryArray.push( filePath );
        }

        for ( let indexServiceImages = 0; indexServiceImages < order.documentArray.length ;indexServiceImages++ )
        {
            const found = galleryArray.find( element => element == order.documentArray[ indexServiceImages ] );

            if ( found === undefined )
            {
                const documentToDelete = order.documentArray[ indexServiceImages ];
                unlink('static' + documentToDelete, ( err ) => {
                    console.log( documentToDelete + ' was deleted' );
                } );
                
                var index = order.documentArray.indexOf( order.documentArray[ indexServiceImages ] );

                let documentArray = order.documentArray;

                if ( index !== -1 ) {
                    documentArray.splice( index, 1 );
                }

                const editDocumentArray = await api.put(
                    orderTable,
                    {
                        id: params.orderId,
                        documentArray: documentArray
                    }
                );
            }
        }
        //Add new items on gallery
        let newOrder = await orderTable.selectRow(
            {
                where : [ [ 'id' ], '=', params.orderId ]
            }
            );
        let newGalleryCounter = data.getAll( 'new-document-file-counter' );
        let newDocumentArray = newOrder.documentArray;
        if ( newGalleryCounter )
        {
            for ( let indexNewGalleryCounter= 0; indexNewGalleryCounter< newGalleryCounter.length ;indexNewGalleryCounter++ )
            {
                let fileName = data.get( 'new-document-file-name-' + newGalleryCounter[ indexNewGalleryCounter ] );
                let fileExtension = data.get( 'new-document-file-extension-' + newGalleryCounter[ indexNewGalleryCounter ] );
                let fileData = data.get( 'new-document-file-data-' + newGalleryCounter[ indexNewGalleryCounter ] );

                let galleryImagePath;

                if ( fileData )
                {
                    galleryImagePath = '/document/orders/' + fileName + '-' + timeStamp + '.' + fileExtension;

                    newDocumentArray.push( galleryImagePath )

                    writeFileSync( 'static' + galleryImagePath, fileData, 'base64' );
                }
            }

            if ( newDocumentArray.length > 0 )
            {
                const editDocumentArray = await api.put(
                    orderTable,
                    {
                        id: params.orderId,
                        documentArray: newDocumentArray,
                    }
                );
            }
        }

        if ( data )
        {
            return {
                success: getTranslatedTextByCode( 'SuccessfullyUpdatedLabel' )
            }
        }
        else
        {
            return {
                errors: getTranslatedTextByCode( 'UnsuccessfullyUpdatedLabel' )
            }
        }
    }
}
