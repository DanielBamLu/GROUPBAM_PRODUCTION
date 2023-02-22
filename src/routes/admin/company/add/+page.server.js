// -- IMPORTS

import { languageTable, companyTable } from '$lib/database';
import { getLanguageMap, attachArrayToObject, convertToSlug } from '$lib/admin'
import { getRandomTuid, getMillisecondTimestamp } from 'senselogic-gist';
import { redirect } from '@sveltejs/kit';
import { writeFileSync } from 'fs';
import * as api from '$lib/api.js';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load(){}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ( { request } ) => {

        const data = await request.formData();

        let languageData = await languageTable.selectRows();
        let language = getLanguageMap( languageData );

        const timeStamp = getMillisecondTimestamp();

        //Add company
        let companyId = getRandomTuid();

        let companyName =  data.get( 'name' );

        if ( companyName )
        {
            const addCompany = await api.post(
                companyTable,
                {
                    id: companyId,
                    name: companyName
                }
            );
        }

        //Add slug
        let companySlug = convertToSlug( companyName, 'string' );

        if ( companySlug )
        {
            const addSlug = await api.put(
                companyTable,
                {
                    id: companyId,
                    slug: companySlug,
                }
            );
        }

        //Add summary
        let companySummaryElements = data.getAll( 'summary' );
        let companySummary = attachArrayToObject( companySummaryElements, language );

        if ( companySummary )
        {
            const addSummary = await api.put(
                companyTable,
                {
                    id: companyId,
                    summary: companySummary
                }
            );
        }

        //Add description
        let companyDescriptionElements = data.getAll( 'description' );
        let companyDescription = attachArrayToObject( companyDescriptionElements, language );

        if ( companyDescription )
        {
            const addDescription = await api.put(
                companyTable,
                {
                    id: companyId,
                    description: companyDescription
                }
            );
        }

        //Add domain
        let companyDomainElements = data.getAll( 'domain' );
        let companyDomain = attachArrayToObject( companyDomainElements, language );

        if ( companyDomain )
        {
            const addDomain = await api.put(
                companyTable,
                {
                    id: companyId,
                    domain: companyDomain
                }
            );
        }

        //Add color
        let companyColor = data.get( 'color' );

        if ( companyColor )
        {
            const addColor = await api.put(
                companyTable,
                {
                    id: companyId,
                    color: companyColor
                }
            );
        }

        //Add iconPath
        let iconFileName =  data.get( 'icon-file-name' );
        let iconFileExtension =  data.get( 'icon-file-extension' );
        let iconFileData =  data.get( 'icon-file-data' );

        let iconImagePath;

        if ( iconFileData )
        {
            iconImagePath = '/image/service/' + iconFileName + '-' + timeStamp + '.' + iconFileExtension;

            writeFileSync( 'static' + iconImagePath, iconFileData, 'base64' );

            if ( iconImagePath )
            {
                const addIconPath = await api.put(
                    companyTable,
                    {
                        id: companyId,
                        iconPath: iconImagePath,
                    }
                );
            }
        }

        //Add iconGrayPath
        let iconGrayFileName =  data.get( 'icon-gray-file-name' );
        let iconGrayFileExtension =  data.get( 'icon-gray-file-extension' );
        let iconGrayFileData =  data.get( 'icon-gray-file-data' );

        let iconGrayImagePath;

        if ( iconGrayFileData )
        {
            iconGrayImagePath = '/image/service/' + iconGrayFileName + '-' + timeStamp + '.' + iconGrayFileExtension;

            writeFileSync( 'static' + iconGrayImagePath, iconGrayFileData, 'base64' );

            if ( iconGrayImagePath )
            {
                const addIconGrayPath = await api.put(
                    companyTable,
                    {
                        id: companyId,
                        iconGrayPath: iconGrayImagePath,
                    }
                );
            }
        }

        //Add imagePath
        let imageFileName =  data.get( 'image-file-name' );
        let imageFileExtension =  data.get( 'image-file-extension' );
        let imageFileData =  data.get( 'image-file-data' );

        let imagePath;

        if ( imageFileData )
        {
            imagePath = '/image/service/' + imageFileName + '-' + timeStamp + '.' + imageFileExtension;

            writeFileSync( 'static' + imagePath, imageFileData, 'base64' );

            if ( imagePath )
            {
                const addImagePath = await api.put(
                    companyTable,
                    {
                        id: companyId,
                        imagePath: imagePath,
                    }
                );
            }
        }

        throw redirect( 303, `/admin/company/edit/${companyId}` );
    }
};
