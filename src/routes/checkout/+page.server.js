// -- IMPORTS

import { redirect } from '@sveltejs/kit';
import { userTable, beneficiaryTable } from '$lib/database';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load(
    { params, locals }
    )
{
    let user;
    if ( locals.user )
    {
        user = await userTable.selectRow(
            {
                where : [ [ 'id' ], '=', locals.user.id ]
            }
            );
    }
    else
    {
        throw redirect( 307, '/login' );
    }

    let beneficiary = await beneficiaryTable.selectRow(
        {
            where : [ [ 'slug' ], '=', 'group-bam-sarls' ]
        }
        );

    return {
        user : user,
        beneficiary : beneficiary
        };
}

/** @type {import('./$types').Actions} */
export const actions = {
    checkout: async ( { request } ) => {

        const data = await request.formData();

        let contactFirstName = data.get( 'checkout-contact-first-name' );
        let contactLastName = data.get( 'checkout-contact-last-name' );
        let contactEmail = data.get( 'checkout-contact-email' );
        let billingFirstName = data.get( 'checkout-billing-first-name' );
        let billingLastName = data.get( 'checkout-billing-last-name' );
        let billingAddress = data.get( 'checkout-billing-address' );
        let billingCityCode = data.get( 'checkout-billing-city-code' );
        let billingCity = data.get( 'checkout-billing-city' );
        let billingCountry = data.get( 'checkout-billing-country' );

        let paymentMethod = data.get( 'payment-methods' );

        console.log(paymentMethod)

        console.log(contactFirstName)
        console.log(contactLastName)
        console.log(contactEmail)
        console.log(billingFirstName)
        console.log(billingLastName)
        console.log(billingAddress)
        console.log(billingCityCode)
        console.log(billingCity)
        console.log(billingCountry)
    }
}
