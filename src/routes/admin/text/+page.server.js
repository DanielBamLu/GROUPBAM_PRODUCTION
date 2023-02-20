// -- IMPORTS

import { textTable } from '$lib/database';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load()
{
    let textArray = await textTable.selectRows();

    return {
        textArray : textArray
        };
}
