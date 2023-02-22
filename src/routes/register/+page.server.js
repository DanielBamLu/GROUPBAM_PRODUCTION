import { error, redirect } from '@sveltejs/kit';
import { userTable } from '$lib/database';
import { getRandomTuid, getTranslatedTextByCode } from 'senselogic-gist';
import * as api from '$lib/api.js';

/** @type {import('./$types').PageServerLoad} */
export async function load( { parent } ) {
    const { user } = await parent();

    if ( user )
    {
        throw redirect( 307, '/admin' );
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

        let id = getRandomTuid();
        let pseudonym = data.get( 'pseudonym' );
        let firstName = data.get( 'firstName' );
        let lastName = data.get( 'lastName' );
        let email = data.get( 'email' );
        let password = data.get( 'password' );

        let userEmail = await userTable.selectRow(
            {
                where : [ [ 'email' ], '=', email ]
            }
            );

        let userPseudonym = await userTable.selectRow(
            {
                where : [ [ 'pseudonym' ], '=', pseudonym ]
            }
            );

        if ( userEmail )
        {
            return {
                errors: getTranslatedTextByCode( 'EmailHasBeenTakenLabel' )
            }
        }

        if ( userPseudonym )
        {
            return {
                errors: getTranslatedTextByCode( 'PseudonymHasBeenTakenLabel' )
            }
        }

        const newUser = await api.post(
            userTable,
            {
                id: id,
                pseudonym: pseudonym,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                provider: 'email',
                role: 'subscriber',
            }
        );

        let userCookie = {
            id: newUser.id,
            pseudonym: newUser.pseudonym,
            fullName: newUser.firstName + ' ' + newUser.lastName,
            email: newUser.email,
            role: newUser.role
        }

        const value = btoa( JSON.stringify( userCookie ) );

        cookies.set( 'jwt', value, { path: '/' } );

        locals.user = userCookie;

        if ( !newUser )
        {
            throw error(
                401,
                {
                    message: getTranslatedTextByCode( 'SomethingWentWrongLabel' )
                }
            );
        }
        else{
            throw redirect( 307, '/admin/settings' );
        }
    }
};
