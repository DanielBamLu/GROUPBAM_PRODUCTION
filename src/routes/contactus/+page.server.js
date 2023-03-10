// -- IMPORTS

import { contactTable } from '$lib/database';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals } )
{
    let contacts = await contactTable.selectRows();

    return {
        contacts : contacts
        };
}
