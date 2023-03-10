// -- IMPORTS

import { categoryTable, companyTable, languageTable } from '$lib/database';
import { getTranslatedTextByCode } from 'senselogic-gist';
import { getLanguageMap, attachArrayToObject } from '$lib/admin';
import { redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load(
    { params }
    )
{
    let categoryData = await categoryTable.selectRow(
        {
            where : [ [ 'id' ], '=', params.categoryId ]
        }
        );

    let companyData = await companyTable.selectRows();

    return {
        categoryData : categoryData,
        companyData : companyData,
        };
}

/** @type {import('./$types').Actions} */
export const actions = {
    edit: async ( { params, request } ) => {

        const data = await request.formData();

        let languageData = await languageTable.selectRows();
        let language = getLanguageMap( languageData );

        let categoryId = params.categoryId;

        //Edit title
        let categoryTitleElements = data.getAll( 'title' );
        let categoryTitle = attachArrayToObject( categoryTitleElements, language );

        if ( categoryTitle )
        {
            const putTitle = await api.put(
                categoryTable,
                {
                    id: categoryId,
                    title: categoryTitle
                }
            );
        }

        //Edit companyId
        let companyId = data.get( 'companyId' );

        if ( companyId )
        {
            const putCompanyId = await api.put(
                categoryTable,
                {
                    id: categoryId,
                    companyId: companyId
                }
            );
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

        let categoryId = params.categoryId;

        const deleteCategory = await api.del(
            categoryTable,
            {
                id: categoryId
            }
        );

        throw redirect( 303, `/admin/category` );
        }
};
