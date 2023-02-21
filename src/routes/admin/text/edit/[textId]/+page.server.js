// -- IMPORTS

import { textTable } from '$lib/database';
import { attachArrayToObject } from '$lib/admin';
import { redirect } from '@sveltejs/kit';
import { getTranslatedTextByCode } from 'senselogic-gist';
import * as api from '$lib/api.js';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load(
    { params }
    )
{
    let textData = await textTable.selectRow(
        {
            where : [ [ 'id' ], '=', params.textId ]
        }
        );

    return {
        textData : textData
        };
}

/** @type {import('./$types').Actions} */
export const actions = {
    edit: async ( { params, request } ) => {

        const data = await request.formData();

        // TEXT INFO
        let textId = params.textId;

        let textData = await textTable.selectRow(
            {
                where : [ [ 'id' ], '=', params.textId ]
            }
            );

        //Edit slug
        let textSlug =  data.get( 'slug' );

        if ( textSlug )
        {
            const putSlug = await api.put(
                textTable,
                {
                    id: textId,
                    slug: textSlug
                }
            );
        }

        //Edit code
        let textCode =  data.get( 'code' );

        if ( textSlug )
        {
            const putCode = await api.put(
                textTable,
                {
                    id: textId,
                    code: textCode
                }
            );
        }

        //Edit text
        let textTextElements =  data.getAll( 'text' );
        let textText = attachArrayToObject( textTextElements, textData.text );

        if ( textText )
        {
            const putText = await api.put(
                textTable,
                {
                    id: textId,
                    text: textText
                }
            );
        }

        if( data )
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

        let textId = params.textId;

        const deleteText = await api.del(
            textTable,
            {
                id: textId,
            }
        );

        throw redirect( 303, `/admin/text` );
        }
};
