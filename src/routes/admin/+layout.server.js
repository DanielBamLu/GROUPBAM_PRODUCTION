import { redirect } from '@sveltejs/kit';
import { languageTable } from '$lib/database';

/** @type {import('./$types').LayoutServerLoad} */
export async function load( { locals } )
{
    if ( locals.user )
    {
        if ( locals.user.role != 'admin' )
        {
            throw redirect( 307, '/customer' );
        }
    }
    else
    {
        throw redirect( 307, '/login' );
    }

    let languageData = await languageTable.selectRows();

    return {
        languageData : languageData,
        };
}
