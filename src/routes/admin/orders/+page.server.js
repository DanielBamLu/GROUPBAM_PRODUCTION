import { getTranslatedTextByCode } from 'senselogic-gist';
import { error, redirect } from '@sveltejs/kit';
import { orderTable } from '$lib/database';
import * as api from '$lib/api.js';

/** @type {import('./$types').PageServerLoad} */
export async function load(
    { locals }
    )
{
    if ( locals.user )
    {
        if ( locals.user.role != 'admin' )
        {
            throw redirect( 307, '/admin' );
        }
    }

    let orders = await orderTable.selectRows();

    return {
        orders: orders
        };
}

// /** @type {import('./$types').Actions} */
// export const actions = {

// };
