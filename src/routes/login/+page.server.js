import { getTranslatedTextByCode } from 'senselogic-gist';
import { redirect } from '@sveltejs/kit';
import { userTable } from '$lib/database';
import * as api from '$lib/api.js';

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals } ) {
    if ( locals.user )
    {
        if ( locals.user.role == 'admin' )
        {
            throw redirect( 307, '/admin' );
        }
        else
        {
            throw redirect( 307, '/' );
        }
    }
    else
    {
        throw redirect( 307, '/' );
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ( { cookies, request, locals } ) => {

        const data = await request.formData();

        let email = data.get( 'email' );
        let password = data.get( 'password' );

        const body = await api.get(
            'users/login',
            userTable,
            {
                email: email,
                password: password
            }
        );

        if ( !body )
        {
            return {
                errors: getTranslatedTextByCode( 'EmailPasswordWrongLabel' )
            }
        }

        let userCookie = {
            id: body.id,
            fullName: body.firstName + ' ' + body.lastName,
            pseudonym: body.pseudonym,
            email: body.email,
            role: body.role
        }

        const value = btoa( JSON.stringify( userCookie ) );

        cookies.set( 'jwt', value, { path: '/' } );

        locals.user = userCookie;

        if ( body.role == 'admin' )
        {
            throw redirect( 301, '/' );
        }
        else
        {
            throw redirect( 301, '/' );
        }
    }
};
