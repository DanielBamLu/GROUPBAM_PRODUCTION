// -- IMPORTS

import { redirect } from '@sveltejs/kit';
import { getFormatedDateTime } from '$lib/date';
import { userTable, beneficiaryTable, orderTable, orderServiceTable, orderServicePackTable, orderServiceOptionVariantTable } from '$lib/database';
import { getRandomTuid, getUuidFromTuid, getMillisecondTimestamp } from 'senselogic-gist';
import { writeFileSync } from 'fs';
import * as api from '$lib/api.js';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load(
    { params, locals }
    )
{
    let user;
    if ( locals.user )
    {
        user = await userTable.selectRow(
            {
                where : [ [ 'id' ], '=', locals.user.id ]
            }
            );

        if ( !user.cartInfo )
        {
            throw redirect( 307, '/customer/cart' );
        }
    }
    else
    {
        throw redirect( 307, '/login' );
    }

    let beneficiary = await beneficiaryTable.selectRow(
        {
            where : [ [ 'slug' ], '=', 'group-bam-sarls' ]
        }
        );

    return {
        user : user,
        beneficiary : beneficiary
        };
}

/** @type {import('./$types').Actions} */
export const actions = {
    checkout: async ( { request, locals } ) => {

        const data = await request.formData();
        const timeStamp = getMillisecondTimestamp();

        let contactFirstName = data.get( 'checkout-contact-first-name' );
        let contactLastName = data.get( 'checkout-contact-last-name' );
        let contactEmail = data.get( 'checkout-contact-email' );
        let description = data.get( 'checkout-description' );
        let billingFirstName = data.get( 'checkout-billing-first-name' );
        let billingLastName = data.get( 'checkout-billing-last-name' );
        let billingAddress = data.get( 'checkout-billing-address' );
        let billingSecondAddress = data.get( 'checkout-billing-second-address' );
        let billingCityCode = data.get( 'checkout-billing-city-code' );
        let billingProvince = data.get( 'checkout-billing-province' );
        let billingCity = data.get( 'checkout-billing-city' );
        let billingCountry = data.get( 'checkout-billing-country' );

        let user = await userTable.selectRow(
            {
                where : [ [ 'id' ], '=', locals.user.id ]
            }
            );

        let userCartInfo = JSON.parse( atob( user.cartInfo ) );

        const deleteCartInfoUser = await api.put(
            userTable,
            {
              id: locals.user.id ,
              cartInfo: ''
            }
        );

        let orderId = getRandomTuid();

        const addOrder = await api.post(
            orderTable,
            {
              id: orderId,
              referenceNumber: getUuidFromTuid( orderId ),
              totalPrice: userCartInfo.info.totalPriceCart,
              productionTime: userCartInfo.info.productionTime,
              description: description,
              contactFirstName: contactFirstName,
              contactLastName: contactLastName,
              contactEmail: contactEmail,
              billingFirstName: billingFirstName,
              billingLastName: billingLastName,
              billingFirstAddressLine: billingAddress,
              billingSecondAddressLine: billingSecondAddress,
              billingCity: billingCity,
              billingCityCode: billingCityCode,
              billingProvince: billingProvince,
              billingCountrySlug: billingCountry,
              status: 'pending',
              orderDateTime: getFormatedDateTime(),
              deliveryDateTime: getFormatedDateTime(),
              userId: locals.user.id,
              urgency: userCartInfo.info.urgency,
            }
        );

        let documentFile = data.getAll('document-file-counter');
        
        let documentArray = [];
        if ( documentFile )
        {
            for ( let indexDocumentFile= 0; indexDocumentFile < documentFile.length ;indexDocumentFile++ )
            {
                let documentFileName = data.get( 'document-file-name-' + documentFile[ indexDocumentFile ] );
                let documentFileExtension = data.get( 'document-file-extension-' + documentFile[ indexDocumentFile ] );
                let documentFileData = data.get( 'document-file-data-' + documentFile[ indexDocumentFile ] );

                let galleryImagePath;

                if ( documentFileData )
                {
                    galleryImagePath = '/document/orders/' + documentFileName + '-' + timeStamp + '.' + documentFileExtension;

                    documentArray.push( galleryImagePath )

                    writeFileSync( 'static' + galleryImagePath, documentFileData, 'base64' );
                }
            }

            if ( documentArray.length > 0 )
            {
                const editDocumentArray = await api.put(
                    orderTable,
                    {
                        id: orderId,
                        documentArray: documentArray,
                    }
                );
            }
        }

        for ( const indexCartService in userCartInfo.services )
        {
            let orderServiceId = getRandomTuid();

            const addOrderService = await api.post(
                orderServiceTable,
                {
                    id: orderServiceId,
                    orderId: orderId,
                    serviceId: userCartInfo.services[ indexCartService ].serviceId,
                    quantity: userCartInfo.services[ indexCartService ].quantity,
                    status: 'pending'
                }
            );

            if ( userCartInfo.services[ indexCartService ].options )
            {
                for ( const element of userCartInfo.services[ indexCartService ].options ) {

                    const addOrderServiceOptionVariant = await api.post(
                        orderServiceOptionVariantTable,
                        {
                            orderServiceId: orderServiceId,
                            value: element.value
                        }
                    );
                }
            }
        }

        throw redirect( 307, '/customer/orders/' +  orderId );
    }
}
