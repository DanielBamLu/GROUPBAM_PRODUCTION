// -- IMPORTS

import { serviceTable, serviceImageTable, companyTable, industryTable, userSaveServiceTable } from '$lib/database';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals } )
{
    let serviceArray = await serviceTable.selectRows();

    let industryArray = await industryTable.selectRows();

    let service = [];

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

        service.push( newItem );
    }

    return {
        industryArray : industryArray,
        serviceArray : serviceArray,
        service : service,
        };
}
