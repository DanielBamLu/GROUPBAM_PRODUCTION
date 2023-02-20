// -- IMPORTS

import { languageTable, industryTable } from '$lib/database';
import { getLanguageMap, attachArrayToObject, convertToSlug } from '$lib/admin'
import { getRandomTuid, getMillisecondTimestamp } from 'senselogic-gist';
import { redirect } from '@sveltejs/kit';
import { writeFileSync } from 'fs';
import * as api from '$lib/api.js';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load()
{
    let languageData = await languageTable.selectRows();

    return {
        languageData : languageData,
        };
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ( { request } ) => {

        const data = await request.formData();

        let languageData = await languageTable.selectRows();
        let language = getLanguageMap( languageData );

        const timeStamp = getMillisecondTimestamp();

        //Add industry
        let industryId = getRandomTuid();

        let industryNameElements =  data.getAll( 'name' );
        let industryName = attachArrayToObject( industryNameElements, language );

        let industrySlug = convertToSlug( industryName, 'map' );

        if ( industryName )
        {
            const addIndustry = await api.post(
                industryTable,
                {
                    id: industryId,
                    name: industryName,
                    slug: industrySlug
                }
            );
        }

        //Add IconPath
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
                    industryTable,
                    {
                        id: industryId,
                        iconPath: iconImagePath,
                    }
                );
            }
        }

        throw redirect( 303, `/admin/industry/edit/${industryId}` );
    }
};
