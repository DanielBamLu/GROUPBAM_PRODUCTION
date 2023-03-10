// -- IMPORTS

import { industryTable, languageTable } from '$lib/database';
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
    let industryData = await industryTable.selectRow(
        {
            where : [ [ 'id' ], '=', params.industryId ]
        }
        );

    return {
        industryData : industryData,
        };
}

/** @type {import('./$types').Actions} */
export const actions = {
    edit: async ( { params, request } ) => {

        const data = await request.formData();

        let languageData = await languageTable.selectRows();
        let language = getLanguageMap( languageData );

        const timeStamp = getMillisecondTimestamp();

        let industryId = params.industryId;

        //Edit Name
        let industryNameElements = data.getAll( 'name' );
        let industryName = attachArrayToObject( industryNameElements, language );

        let industrySlug = convertToSlug( industryName, 'map' );

        if ( industryName )
        {
            const putName = await api.put(
                industryTable,
                {
                    id: industryId,
                    name: industryName,
                    slug: industrySlug,
                }
            );
        }

        //Edit IconPath
        let industryFileName = data.get( 'icon-file-name' );
        let industryFileExtension = data.get( 'icon-file-extension' );
        let industryFileData = data.get( 'icon-file-data' );
        let industryOldIconPath = data.get( 'iconPath' );

        let industryIconPath;

        if ( industryFileData )
        {
            unlink( 'static' + industryOldIconPath, ( err ) => {
                console.log( industryOldIconPath + ' was deleted' );
            } );

            industryIconPath = '/image/industry/' + industryFileName + '-' + timeStamp + '.' + industryFileExtension;

            writeFileSync( 'static' + industryIconPath, industryFileData, 'base64' );

            if ( industryIconPath )
            {
                const putIconPath = await api.put(
                    industryTable,
                    {
                        id: industryId,
                        iconPath: industryIconPath,
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

        let industryId = params.industryId;

        const deleteIndustry = await api.del(
            industryTable,
            {
                id: industryId,
            }
        );

        throw redirect( 303, `/admin/industry` );
        }
};
