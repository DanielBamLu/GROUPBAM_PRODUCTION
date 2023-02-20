// -- IMPORTS

import { languageTable, companyTable, categoryTable } from '$lib/database';
import { getLanguageMap, attachArrayToObject } from '$lib/admin'
import { getRandomTuid } from 'senselogic-gist';
import { redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load()
{
    let languageData = await languageTable.selectRows();

    let companyData = await companyTable.selectRows();

    return {
        languageData : languageData,
        companyData : companyData,
        };
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ( { request } ) => {

        const data = await request.formData();

        // CATEGORY INFO
        let categoryId = getRandomTuid();

        //Add category
        const addCategory = await api.post(
            categoryTable,
            {
                id: categoryId
            }
        );

        let languageData = await languageTable.selectRows();
        let language = getLanguageMap( languageData );

        //Add Title
        let categorTitleElements = data.getAll( 'title' );
        let categorTitle = attachArrayToObject( categorTitleElements, language );

        if ( categorTitle )
        {
            const addTitle = await api.put(
                categoryTable,
                {
                    id: categoryId,
                    title: categorTitle
                }
            );
        }

        //Add companyId
        let companyId = data.get( 'companyId' );

        if ( companyId )
        {
            const addCompanyId = await api.put(
                categoryTable,
                {
                    id: categoryId,
                    companyId: companyId
                }
            );
        }

        throw redirect( 303, `/admin/category/edit/${categoryId}` );
    }
};
