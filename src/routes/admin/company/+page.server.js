// -- IMPORTS

import { companyTable } from '$lib/database';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load()
{
    let companyArray = await companyTable.selectRows();

    return {
        companyArray : companyArray
        };
}
