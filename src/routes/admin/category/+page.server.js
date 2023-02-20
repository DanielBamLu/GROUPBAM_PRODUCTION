// -- IMPORTS

import { categoryTable } from '$lib/database';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load()
{
    let categoryArray = await categoryTable.selectRows();

    return {
        categoryArray : categoryArray
        };
}
