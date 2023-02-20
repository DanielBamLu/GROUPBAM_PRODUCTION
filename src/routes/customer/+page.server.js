// -- IMPORTS

import { redirect } from '@sveltejs/kit';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals } )
{
    if ( !locals.user ) throw redirect( 307, '/login' );
}
