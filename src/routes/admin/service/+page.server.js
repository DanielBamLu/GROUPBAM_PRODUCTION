// -- IMPORTS

import { serviceTable } from '$lib/database';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load()
{
    let serviceArray = await serviceTable.selectRows();

    return {
        serviceArray : serviceArray
        };
}
