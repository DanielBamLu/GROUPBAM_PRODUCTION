// -- IMPORTS
import { redirect } from '@sveltejs/kit';
import { serviceTable, categoryTable, userSaveServiceTable } from '$lib/database';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load( { params, locals } )
{
    if ( !locals.user ) throw redirect( 307, '/login' );

    let serviceSaved = [];
    let savedArray;

    if ( locals.user )
    {
        savedArray = await userSaveServiceTable.selectRows(
            {
                where : [ [ 'userId' ], '=', locals.user.id ]
            }
            );

        for ( let item of savedArray )
        {
            let service = await serviceTable.selectRow(
                {
                    where : [ [ 'id' ], '=', item.serviceId ]
                }
                );

            let category = await categoryTable.selectRow(
                {
                    where : [ [ 'id' ], '=', service.categoryId ]
                }
                );

            let newItem = {
                info : service,
                category : category
            }

            serviceSaved.push( newItem );
        }
    }

    return {
        serviceSaved : serviceSaved
        };
}
