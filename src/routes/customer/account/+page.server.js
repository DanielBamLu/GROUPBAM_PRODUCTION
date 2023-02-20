import { getTranslatedTextByCode } from 'senselogic-gist';
import { error, redirect } from '@sveltejs/kit';
import { userTable } from '$lib/database';
import * as api from '$lib/api.js';

/** @type {import('./$types').PageServerLoad} */
export async function load(
    { locals }
    )
{
    if ( !locals.user ) throw redirect( 302, '/login' );

    let userData;

    if ( locals.user.email )
    {
        userData = await userTable.selectRow(
            {
                where : [ [ 'email' ], '=', locals.user.email ]
            }
            );
    }

    return {
        userData: userData
        };
}

/** @type {import('./$types').Actions} */
export const actions = {
    logout: async ( { cookies, locals } ) => {

        cookies.delete( 'jwt', { path: '/' } );

        locals.user = null;
    },

    editPersonalInfo: async ( { request, locals } ) => {

        const data = await request.formData();

        let userId = locals.user.id

        //Edit pseudonym
        let userPseudonym =  data.get( 'pseudonym' );

        if ( userPseudonym )
        {
            const putPseudonym = await api.put(
                userTable,
                {
                    id: userId,
                    pseudonym: userPseudonym,
                }
            );
        }

        //Edit first name
        let userFirstName =  data.get( 'firstName' );

        if ( userFirstName )
        {
            const putFirstName = await api.put(
                userTable,
                {
                    id: userId,
                    firstName: userFirstName,
                }
            );
        }

        //Edit last name
        let userLastName =  data.get( 'lastName' );

        if ( userLastName )
        {
            const putLastName = await api.put(
                userTable,
                {
                    id: userId,
                    lastName: userLastName,
                }
            );
        }

        //Edit date
        let userDate =  data.get( 'date-time' );

        if ( userDate )
        {
            const putRole = await api.put(
                userTable,
                {
                    id: userId,
                    dateTime: userDate,
                }
            );
        }

        //Edit country
        let userCountrySlug =  data.get( 'country' );

        if ( userCountrySlug )
        {
            const putCountrySlug = await api.put(
                userTable,
                {
                    id: userId,
                    countrySlug: userCountrySlug,
                }
            );
        }

        //Edit phone prefix
        let userFirstPhonePrefix =  data.get( 'first-phone-prefix' );

        if ( userFirstPhonePrefix )
        {
            const putFirstPhonePrefix = await api.put(
                userTable,
                {
                    id: userId,
                    firstPhonePrefix: userFirstPhonePrefix,
                }
            );
        }

        //Edit phone number
        let userFirstPhoneNumber =  data.get( 'first-phone-number' );

        if ( userFirstPhoneNumber )
        {
            const putFirstPhoneNumber = await api.put(
                userTable,
                {
                    id: userId,
                    firstPhoneNumber: userFirstPhoneNumber,
                }
            );
        }

        //Edit second phone prefix
        let userSecondPhonePrefix =  data.get( 'second-phone-prefix' );

        if ( userSecondPhonePrefix )
        {
            const putSecondPhonePrefix = await api.put(
                userTable,
                {
                    id: userId,
                    secondPhonePrefix: userSecondPhonePrefix,
                }
            );
        }

        //Edit second phone number
        let userSecondPhoneNumber =  data.get( 'second-phone-number' );

        if ( userSecondPhoneNumber )
        {
            const putSecondPhoneNumber = await api.put(
                userTable,
                {
                    id: userId,
                    secondPhoneNumber: userSecondPhoneNumber,
                }
            );
        }

        //Edit secret question
        let userSecretQuestion =  data.get( 'secret-question' );

        if ( userSecretQuestion )
        {
            const putSecretQuestion = await api.put(
                userTable,
                {
                    id: userId,
                    secretQuestion: userSecretQuestion,
                }
            );
        }

        //Edit secret question
        let userSecretAnswer =  data.get( 'secret-answer' );

        if ( userSecretAnswer )
        {
            const putSecretAnswer = await api.put(
                userTable,
                {
                    id: userId,
                    secretAnswer: userSecretAnswer,
                }
            );
        }

        return {
            success: getTranslatedTextByCode( 'PersonalInfoChangedSuccessfullyLabel' )
        }

    },
    editBillingAddress: async ( { request, locals } ) => {

        const data = await request.formData();

        let userId = locals.user.id

        //Edit billing address
        let userBillingFirstAddressLine =  data.get( 'billing-first-address-line' );

        if ( userBillingFirstAddressLine )
        {
            const putBillingFirstAddressLine = await api.put(
                userTable,
                {
                    id: userId,
                    billingFirstAddressLine: userBillingFirstAddressLine,
                }
            );
        }

        //Edit second billing address
        let userBillingSecondAddressLine =  data.get( 'billing-second-address-line' );

        if ( userBillingSecondAddressLine )
        {
            const putBillingSecondAddressLine = await api.put(
                userTable,
                {
                    id: userId,
                    billingSecondAddressLine: userBillingSecondAddressLine,
                }
            );
        }

        //Edit billing city
        let userBillingCity =  data.get( 'billing-city' );

        if ( userBillingCity )
        {
            const putBillingCity = await api.put(
                userTable,
                {
                    id: userId,
                    billingCity: userBillingCity,
                }
            );
        }

        //Edit billing city code
        let userBillingCityCode =  data.get( 'billing-city-code' );

        if ( userBillingCityCode )
        {
            const putBillingCityCode = await api.put(
                userTable,
                {
                    id: userId,
                    billingCityCode: userBillingCityCode,
                }
            );
        }

        //Edit billing province
        let userBillingProvince =  data.get( 'billing-province' );

        if ( userBillingProvince )
        {
            const putBillingProvince = await api.put(
                userTable,
                {
                    id: userId,
                    billingProvince: userBillingProvince,
                }
            );
        }

        //Edit billing country slug
        let userBillingCountrySlug =  data.get( 'billing-country-slug' );

        if ( userBillingCountrySlug )
        {
            const putBillingCountrySlug = await api.put(
                userTable,
                {
                    id: userId,
                    billingCountrySlug: userBillingCountrySlug,
                }
            );
        }

        return {
            success: getTranslatedTextByCode( 'BillingAddressChangedSuccessfullyLabel' )
        }
    },
    editPassword: async ( { request, locals, cookies } ) => {

        const data = await request.formData();

        let userId = locals.user.id;
        let userEmail = locals.user.email;

        //Edit password
        let userOldPassword =  data.get( 'old-password' );
        let userNewPassword =  data.get( 'new-password' );
        let userNewPasswordRetype =  data.get( 'new-password-retype' );

        if ( userOldPassword )
        {
            let user = await userTable.selectRow(
                {
                    where : [ [ 'email' ], '=', locals.user.email ]
                }
                );

            if ( user.password === userOldPassword )
            {
                if ( userNewPassword === userNewPasswordRetype )
                {
                    const putPassword = await api.put(
                        userTable,
                        {
                            id: userId,
                            password: userNewPassword,
                        }
                    );

                    const body = await api.get(
                        'users/login',
                        userTable,
                        {
                            email: userEmail,
                            password: userNewPassword
                        }
                    );

                    if ( body === undefined )
                    {
                        throw error(
                            401,
                            {
                                message: getTranslatedTextByCode( 'SomethingWentWrongLabel' )
                            }
                        );
                    }

                    let userCookie = {
                        id: body.id,
                        pseudonym: body.pseudonym,
                        email: body.email,
                        role: body.role
                    }

                    const value = btoa( JSON.stringify( userCookie ) );

                    cookies.set( 'jwt', value, { path: '/' } );

                    locals.user = body;

                    return {
                        success: getTranslatedTextByCode( 'PasswordsChangedSuccessfullyLabel' )
                    }
                }
                else
                {
                    return {
                        errors: getTranslatedTextByCode( 'PasswordsNotMatchLabel' )
                    }
                }
            }
            else
            {
                return {
                    errors: getTranslatedTextByCode( 'OldPasswordIsWrongLabel' )
                }
            }
        }
        else
        {
            return {
                errors: getTranslatedTextByCode( 'OldPasswordIsWrongLabel' )
            }
        }
    },
};
