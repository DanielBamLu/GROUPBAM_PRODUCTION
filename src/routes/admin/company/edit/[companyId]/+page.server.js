// -- IMPORTS

import { companyTable, languageTable } from '$lib/database';
import { attachArrayToObject, convertToSlug, getLanguageMap } from '$lib/admin';
import { redirect } from '@sveltejs/kit';
import { getMillisecondTimestamp, getTranslatedTextByCode } from 'senselogic-gist';
import { writeFileSync, unlink } from 'fs';
import * as api from '$lib/api.js';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load(
    { params }
    )
{
    let companyData = await companyTable.selectRow(
        {
            where : [ [ 'id' ], '=', params.companyId ]
        }
        );

    return {
        companyData : companyData,
        };
}

/** @type {import('./$types').Actions} */
export const actions = {
    edit: async ( { params, request } ) => {

        const data = await request.formData();

        let languageData = await languageTable.selectRows();
        let language = getLanguageMap( languageData );

        const timeStamp = getMillisecondTimestamp();

        let companyId = params.companyId;

        //Edit name
        let companyName = data.get( 'name' );

        if ( companyName )
        {
            const putName = await api.put(
                companyTable,
                {
                    id: companyId,
                    name: companyName
                }
            );
        }

        //Edit slug
        let companySlug = convertToSlug( companyName, 'string' );

        if ( companySlug )
        {
            const putSlug = await api.put(
                companyTable,
                {
                    id: companyId,
                    slug: companySlug,
                }
            );
        }

        //Edit summary
        let companySummaryElements = data.getAll( 'summary' );
        let companySummary = attachArrayToObject( companySummaryElements, language );

        if ( companySummary )
        {
            const putSummary = await api.put(
                companyTable,
                {
                    id: companyId,
                    summary: companySummary
                }
            );
        }

        //Edit description
        let companyDescriptionElements = data.getAll( 'description' );
        let companyDescription = attachArrayToObject( companyDescriptionElements, language );

        if ( companyDescription )
        {
            const putDescription = await api.put(
                companyTable,
                {
                    id: companyId,
                    description: companyDescription
                }
            );
        }

        //Edit domain
        let companyDomainElements = data.getAll( 'domain' );
        let companyDomain = attachArrayToObject( companyDomainElements, language );

        if ( companyDomain )
        {
            const putDomain = await api.put(
                companyTable,
                {
                    id: companyId,
                    domain: companyDomain
                }
            );
        }

        //Edit color
        let companyColor = data.get( 'color' );

        if ( companyColor )
        {
            const putColor = await api.put(
                companyTable,
                {
                    id: companyId,
                    color: companyColor
                }
            );
        }

        //Edit iconPath
        let companyIconFileName = data.get( 'icon-file-name' );
        let companyIconFileExtension = data.get( 'icon-file-extension' );
        let companyIconFileData = data.get( 'icon-file-data' );
        let companyIconOldIconPath = data.get( 'iconPath' );

        let companyIconPath;

        if ( companyIconFileData )
        {
            unlink( 'static' + companyIconOldIconPath, ( err ) => {
                console.log( companyIconOldIconPath + ' was deleted' );
            } );

            companyIconPath = '/image/industry/' + companyIconFileName + '-' + timeStamp + '.' + companyIconFileExtension;

            writeFileSync( 'static' + companyIconPath, companyIconFileData, 'base64' );

            if ( companyIconPath )
            {
                const putIconPath = await api.put(
                    companyTable,
                    {
                        id: companyId,
                        iconPath: companyIconPath,
                    }
                );
            }
        }

        //Edit iconGrayPath
        let companyIconGrayFileName = data.get( 'icon-gray-file-name' );
        let companyIconGrayFileExtension = data.get( 'icon-gray-file-extension' );
        let companyIconGrayFileData = data.get( 'icon-gray-file-data' );
        let companyIconGrayOldIconGrayPath = data.get( 'iconGrayPath' );

        let companyIconGrayPath;

        if ( companyIconGrayFileData )
        {
            unlink( 'static' + companyIconGrayOldIconGrayPath, ( err ) => {
                console.log( companyIconGrayOldIconGrayPath + ' was deleted' );
            } );

            companyIconGrayPath = '/image/industry/' + companyIconGrayFileName + '-' + timeStamp + '.' + companyIconGrayFileExtension;

            writeFileSync( 'static' + companyIconGrayPath, companyIconGrayFileData, 'base64' );

            if ( companyIconGrayPath )
            {
                const putIconGrayPath = await api.put(
                    companyTable,
                    {
                        id: companyId,
                        iconGrayPath: companyIconGrayPath,
                    }
                );
            }
        }
        //Edit imagePath
        let companyImageFileName = data.get( 'image-file-name' );
        let companyImageFileExtension = data.get( 'image-file-extension' );
        let companyImageFileData = data.get( 'image-file-data' );
        let companyImageOldImagePath = data.get( 'imagePath' );

        let companyImagePath;

        if ( companyImageFileData )
        {
            unlink( 'static' + companyImageOldImagePath, ( err ) => {
                console.log( companyImageOldImagePath + ' was deleted' );
            } );

            companyImagePath = '/image/industry/' + companyImageFileName + '-' + timeStamp + '.' + companyImageFileExtension;

            writeFileSync( 'static' + companyImagePath, companyImageFileData, 'base64' );

            if ( companyImagePath )
            {
                const putImagePath = await api.put(
                    companyTable,
                    {
                        id: companyId,
                        imagePath: companyImagePath,
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
        },

    delete: async ( { params } ) => {

        let companyId = params.companyId;

        const deleteCompany = await api.del(
            companyTable,
            {
                id: companyId,
            }
        );

        throw redirect( 303, `/admin/company` );
        }
};
