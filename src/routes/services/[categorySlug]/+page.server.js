// -- IMPORTS

import { categoryTable, companyTable, serviceTable, serviceImageTable, userSaveServiceTable } from '$lib/database';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load( { params, locals } )
{
    let category = await categoryTable.selectRow(
        {
            where : [ [ 'slug' ], '=', params.categorySlug ]
        });

    let categoryId = '';

    if ( category )
    {
        categoryId = category.id;
    }

    let serviceArray = await serviceTable.selectRows(
        {
            where : [ [ 'categoryId' ], '=', categoryId ]
        }
        );

    let serviceCategory = [];

    for ( let item of serviceArray )
    {
        let company = await companyTable.selectRow(
            {
                where : [ [ 'id' ], '=', item.companyId ]
            }
            );

        let serviceImages = await serviceImageTable.selectRows(
            {
                where : [ [ 'serviceId' ], '=', item.id ]
            }
            );

        let saved = await userSaveServiceTable.selectRow(
            {
                where : [ [ 'serviceId' ], '=', item.id ]
            }
            );

        let isSaved = false;

        if ( saved && locals.user )
        {
            if ( saved.userId === locals.user.id)
            {
                isSaved = true;
            }
        }

        let newItem = {
            info : item,
            isSaved: isSaved,
            company : company,
            images : serviceImages
        }

        serviceCategory.push( newItem );
    }

    return {
        serviceCategory : serviceCategory
        };
}
