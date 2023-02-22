// -- IMPORTS

import { languageTable, textTable } from '$lib/database';
import { getLanguageMap, attachArrayToObject } from '$lib/admin'
import { getRandomTuid } from 'senselogic-gist';
import { redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load(){}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ( { request } ) => {

        const data = await request.formData();

        // TEXT INFO
        let textId = getRandomTuid();

        //Add text
        const addText = await api.post(
            textTable,
            {
                id: textId
            }
        );

        let languageData = await languageTable.selectRows();
        let language = getLanguageMap( languageData );

        //Add slug
        let textSlug = data.get( 'slug' );

        if ( textSlug )
        {
            const addSlug = await api.put(
                textTable,
                {
                    id: textId,
                    slug: textSlug
                }
            );
        }

        //Add code
        let textCode = data.get( 'code' );

        if ( textCode )
        {
            const addCode = await api.put(
                textTable,
                {
                    id: textId,
                    code: textCode
                }
            );
        }

        //Add text
        let textTextElements = data.getAll( 'text' );
        let textText = attachArrayToObject( textTextElements, language );

        if ( textText )
        {
            const addCode = await api.put(
                textTable,
                {
                    id: textId,
                    text: textText
                }
            );
        }

        throw redirect( 303, `/admin/text/edit/${textId}` );
    }
};
