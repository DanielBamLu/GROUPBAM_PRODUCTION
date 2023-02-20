import { redirect } from '@sveltejs/kit';

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
}
