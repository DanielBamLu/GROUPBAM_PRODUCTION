// -- IMPORTS

import { companyTable, serviceTable, testimonialTable, serviceImageTable, userSaveServiceTable } from '$lib/database';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals } )
{
    let companyArray = await companyTable.selectRows();
    let serviceArray = await serviceTable.selectRows(
        {
            where : [ [ 'highlight' ], '=', 1 ]
        }
        );
    let testimonialArray = await testimonialTable.selectRows();

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
        companyArray : companyArray,
        serviceArray : serviceArray,
        service : service,
        testimonialArray : testimonialArray
        };
}
