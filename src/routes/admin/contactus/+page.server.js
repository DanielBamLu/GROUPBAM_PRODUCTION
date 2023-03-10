// -- IMPORTS
import { contactTable } from '$lib/database';
import { getTranslatedTextByCode, getRandomTuid } from 'senselogic-gist';
import * as api from '$lib/api.js';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load()
{
    let contacts = await contactTable.selectRows();

    return {
        contacts : contacts
        };
}


/** @type {import('./$types').Actions} */
export const actions = {
    edit: async ( { request } ) => {

        const data = await request.formData();

        //CONTACT
        let contacts = await contactTable.selectRows();

        for ( let indexContact in contacts)
        {
            let contactId = contacts[ indexContact ].id;

            //Edit contact city
            let contactCity = '';
            contactCity = data.get( 'contact-city-' +  contacts[ indexContact ].id );

            if ( contactCity )
            {
                const putContactCity = await api.put(
                    contactTable,
                    {
                        id: contactId,
                        city: contactCity
                    }
                );
            }

            //Edit contact city
            let contactAddress = '';
            contactAddress = data.get( 'contact-address-' +  contacts[ indexContact ].id );

            if ( contactAddress )
            {
                const putContactAddress = await api.put(
                    contactTable,
                    {
                        id: contactId,
                        address: contactAddress
                    }
                );
            }

            //Edit contact postCode
            let contactPostCode = '';
            contactPostCode = data.get( 'contact-post-code-' +  contacts[ indexContact ].id );

            if ( contactPostCode )
            {
                const putContactPostCode = await api.put(
                    contactTable,
                    {
                        id: contactId,
                        postCode: contactPostCode
                    }
                );
            }

            //Edit contact country
            let contactCountry = '';
            contactCountry = data.get( 'contact-country-' +  contacts[ indexContact ].id );

            if ( contactCountry )
            {
                const putContactCountry = await api.put(
                    contactTable,
                    {
                        id: contactId,
                        country: contactCountry
                    }
                );
            }
            
            //Edit contact phoneNumber
            let contactPhoneNumber = '';
            contactPhoneNumber = data.get( 'contact-phone-number-' +  contacts[ indexContact ].id );

            if ( contactPhoneNumber )
            {
                const putContactPhoneNumber = await api.put(
                    contactTable,
                    {
                        id: contactId,
                        phoneNumber: contactPhoneNumber
                    }
                );
            }

            //Edit contact email
            let contactEmail = '';
            contactEmail = data.get( 'contact-email-' +  contacts[ indexContact ].id );

            if ( contactEmail )
            {
                const putContactEmail = await api.put(
                    contactTable,
                    {
                        id: contactId,
                        email: contactEmail
                    }
                );
            }

            //Edit contact directionLink
            let contactDirectionLink = '';
            contactDirectionLink = data.get( 'contact-direction-link-' +  contacts[ indexContact ].id );

            if ( contactDirectionLink )
            {
                const putContactDirectionLink = await api.put(
                    contactTable,
                    {
                        id: contactId,
                        directionLink: contactDirectionLink
                    }
                );
            }

            if ( contactCity == '' || contactCity == null )
            {
                //Delete contact
                const deleteContact = await api.del(
                    contactTable,
                    {
                        id: contactId
                    }
                );
            }
        }

        //New contact
        let contactCounter = data.getAll( 'new-contact-counter' );

        for ( let indexContactCounter = 0; indexContactCounter < contactCounter.length; indexContactCounter++ )
        {
            //Add new contact
            let contactId = getRandomTuid();

            if ( contactId )
            {
                const postNewContact = await api.post(
                    contactTable,
                    {
                        id: contactId
                    }
                );
            }

            //Add new contact city
            let contactCityNew = data.get( 'new-contact-city-' + contactCounter[ indexContactCounter ] );

            if ( contactCityNew )
            {
                const postNewContactCity = await api.put(
                    contactTable,
                    {
                        id: contactId,
                        city: contactCityNew
                    }
                );
            }

            //Add new contact city
            let contactAddressNew = data.get( 'new-contact-address-' + contactCounter[ indexContactCounter ] );

            if ( contactAddressNew )
            {
                const postNewContactAddress = await api.put(
                    contactTable,
                    {
                        id: contactId,
                        address: contactAddressNew
                    }
                );
            }

            //Add new contact post code
            let contactPostCodeNew = data.get( 'new-contact-post-code-' + contactCounter[ indexContactCounter ] );

            if ( contactPostCodeNew )
            {
                const postNewContactPostCode = await api.put(
                    contactTable,
                    {
                        id: contactId,
                        postCode: contactPostCodeNew
                    }
                );
            }

            //Add new contact country
            let contactCountryNew = data.get( 'new-contact-country-' + contactCounter[ indexContactCounter ] );

            if ( contactCountryNew )
            {
                const postNewContactCountry = await api.put(
                    contactTable,
                    {
                        id: contactId,
                        country: contactCountryNew
                    }
                );
            }

            //Add new contact phone number
            let contactPhoneNumberNew = data.get( 'new-contact-phone-number-' + contactCounter[ indexContactCounter ] );

            if ( contactPhoneNumberNew )
            {
                const postNewContactPhoneNumber = await api.put(
                    contactTable,
                    {
                        id: contactId,
                        phoneNumber: contactPhoneNumberNew
                    }
                );
            }

            //Add new contact email
            let contactEmailNew = data.get( 'new-contact-email-' + contactCounter[ indexContactCounter ] );

            if ( contactEmailNew )
            {
                const postNewContactEmail = await api.put(
                    contactTable,
                    {
                        id: contactId,
                        email: contactEmailNew
                    }
                );
            }

            //Add new contact email
            let contactDirectionLinkNew = data.get( 'new-contact-direction-link-' + contactCounter[ indexContactCounter ] );

            if ( contactDirectionLinkNew )
            {
                const postNewContactDirectionLink = await api.put(
                    contactTable,
                    {
                        id: contactId,
                        directionLink: contactDirectionLinkNew
                    }
                );
            }
        }

        if ( data )
        {
            return {
                success: getTranslatedTextByCode( 'SuccessfullyUpdatedLabel' )
            }
        }
        else
        {
            return {
                errors: getTranslatedTextByCode( 'UnsuccessfullyUpdatedLabel' )
            }
        }
    },
};
