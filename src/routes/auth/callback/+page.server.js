import { error, redirect } from '@sveltejs/kit';
import { userTable } from '$lib/database';
import { getRandomTuid, getTranslatedTextByCode } from 'senselogic-gist';
import jwt from 'jsonwebtoken';
import * as api from '$lib/api.js';

// https://github.com/duffn/sveltekit-netlify-google-oauth-example
export async function load( { cookies, url } ) {
    const code = url.searchParams.get( 'code' );
    const state = url.searchParams.get( 'state' );

    if ( code && state ) {
        const account = await googleAuth( code );

        const user = await api.get(
            'users/login/google',
            userTable,
            {
                email: account.email,
            }
        );

        if ( user )
        {
            let userCookie = {
                id: user.id,
                fullName: user.firstName + ' ' + user.lastName,
                pseudonym: user.pseudonym,
                email: user.email,
                role: user.role
            }

            const value = btoa( JSON.stringify( userCookie ) );

            cookies.set( 'jwt', value, { path: '/' } );

            if ( user.role == 'admin' )
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
            let id = getRandomTuid();
            const newUser = await api.post(
                userTable,
                {
                    id: id,
                    pseudonym: account.given_name + account.family_name,
                    firstName: account.given_name,
                    lastName: account.family_name,
                    email: account.email,
                    provider: 'google',
                    role: 'subscriber'
                }
            );

            if ( newUser === undefined )
            {
                throw error(
                    401,
                    {
                        message: getTranslatedTextByCode( 'SomethingWentWrongLabel' )
                    }
                );
            }

            let userCookie = {
                id: newUser.id,
                fullName: newUser.firstName + ' ' + newUser.lastName,
                pseudonym: newUser.pseudonym,
                email: newUser.email,
                role: newUser.role
            }

            const value = btoa( JSON.stringify( userCookie ) );

            cookies.set( 'jwt', value, { path: '/' } );

            throw redirect( 307, '/customer/account' );
        }
    }
}

async function googleAuth( code ) {
    const wellKnown = await fetch('https://accounts.google.com/.well-known/openid-configuration', {
        headers: { Accept: 'application/json' }
    });
    const wellKnownJson = await wellKnown.json();

    const idToken = await fetch( wellKnownJson.token_endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: JSON.stringify({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.AUTH_REDIRECT,
            grant_type: 'authorization_code'
        })
    });

    const idTokenJson = await idToken.json();

    return jwt.decode( idTokenJson.id_token );
}
