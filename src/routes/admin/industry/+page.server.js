// -- IMPORTS

import { industryTable } from '$lib/database';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load()
{
    let industryArray = await industryTable.selectRows();

    return {
        industryArray : industryArray
        };
}
