<script>
    import { TextField, FormField, Button } from 'attractions';
    import { enhance } from '$app/forms';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { afterNavigate } from '$app/navigation';
    import { completeLanguageMap } from '$lib/admin'
    import ListErrors from '$lib/components/ListErrors.svelte';
    import ListSuccess from '$lib/components/ListSuccess.svelte';

    export let data;

    let errors;
    let success;

    let refresh = {}

    let refreshContact = {};
    let contacts = data.contacts;
    let newContacts = new Array();
    let indexContact = 0;
    
    const addContact = ( info ) => () => {
        indexContact++
        let newContact = {
            index: indexContact,
            city:  '',
            address:  '',
            postCode: '',
            country: '',
            phoneNumber: '',
            email: '',
            directionLink: ''
            }

        newContacts.push( newContact );

        refreshContact = {}
    }

    const deleteContact = ( info, isNew ) => () => {

        if ( isNew )
        {
            for ( let indexContact = 0; indexContact < newContacts.length; indexContact++ )
            {
                var index = newContacts.indexOf( info.contact );

                if ( index !== -1 ) {
                    newContacts.splice( index, 1 );
                }

                refreshContact = {}
            }
        }
        else
        {
            for ( let indexContact = 0; indexContact < contacts.length; indexContact++ )
            {
                var index = contacts.indexOf( info.contact );

                if ( index !== -1 ) {
                    contacts.splice( index, 1 );
                }
                refreshContact = {}
            }
        }
    }
</script>

<svelte:head>
    <title></title>
</svelte:head>
<div class="admin-page">
    {#key refresh}
        <ListErrors errors={errors} />
        <ListSuccess success={success} />
    {/key}
    <form
        method="POST"
        action="?/edit"
        use:enhance={() => {
            return ( { result, update } ) => {
                if ( result.data )
                {
                    if ( result.data.errors )
                    {
                        success = '';
                        errors = result.data.errors;
                    }

                    if ( result.data.success )
                    {
                        errors = '';
                        success = result.data.success;
                    }
                }

                refresh = {}

                if ( result.type === 'error' ) update();
            };
        }}
    >
        <div class="admin-section contactus">
            {#key refreshContact}
                {#each contacts as contact}
                    <div class="admin-section-container">
                        <FormField
                            name="{getTranslatedTextByCode( 'ContactCityLabel' )}"
                        >
                            <TextField
                                name="contact-city-{contact.id}"
                                value={contact.city}
                            />
                        </FormField>
                        <FormField
                            name="{getTranslatedTextByCode( 'ContactAddressLabel' )}"
                        >
                            <TextField
                                name="contact-address-{contact.id}"
                                value={contact.address}
                            />
                        </FormField>
                        <FormField
                            name="{getTranslatedTextByCode( 'ContactPostCodeLabel' )}"
                        >
                            <TextField
                                name="contact-post-code-{contact.id}"
                                value={contact.postCode}
                            />
                        </FormField>
                        <FormField
                            name="{getTranslatedTextByCode( 'ContactCountryLabel' )}"
                        >
                            <TextField
                                name="contact-country-{contact.id}"
                                value={contact.country}
                            />
                        </FormField>
                        <FormField
                            name="{getTranslatedTextByCode( 'ContactPhoneNumberLabel' )}"
                        >
                            <TextField
                                name="contact-phone-number-{contact.id}"
                                value={contact.phoneNumber}
                            />
                        </FormField>
                        <FormField
                            name="{getTranslatedTextByCode( 'ContactEmailLabel' )}"
                        >
                            <TextField
                                name="contact-email-{contact.id}"
                                value={contact.email}
                            />
                        </FormField>
                        <FormField
                            name="{getTranslatedTextByCode( 'ContactDirectionLinkLabel' )}"
                        >
                            <TextField
                                name="contact-direction-link-{contact.id}"
                                value={contact.directionLink}
                            />
                        </FormField>
                        <div class="admin-button">
                            <Button filled danger on:click={deleteContact( ( {contact} ), false )}>{getTranslatedTextByCode( 'DeleteContactButton' )}</Button>
                        </div>
                    </div>
                {/each}
                {#each newContacts as contact}
                    <div class="admin-section-container">
                        <div hidden>
                            <TextField
                                name="new-contact-counter"
                                value={contact.index}
                            />
                        </div>
                        <FormField
                            name="{getTranslatedTextByCode( 'ContactCityLabel' )}"
                        >
                            <TextField
                                name="new-contact-city-{contact.index}"
                                value={contact.city}
                            />
                        </FormField>
                        <FormField
                            name="{getTranslatedTextByCode( 'ContactAddressLabel' )}"
                        >
                            <TextField
                                name="new-contact-address-{contact.index}"
                                value={contact.address}
                            />
                        </FormField>
                        <FormField
                            name="{getTranslatedTextByCode( 'ContactPostCodeLabel' )}"
                        >
                            <TextField
                                name="new-contact-post-code-{contact.index}"
                                value={contact.postCode}
                            />
                        </FormField>
                        <FormField
                            name="{getTranslatedTextByCode( 'ContactCountryLabel' )}"
                        >
                            <TextField
                                name="new-contact-country-{contact.index}"
                                value={contact.country}
                            />
                        </FormField>
                        <FormField
                            name="{getTranslatedTextByCode( 'ContactPhoneNumberLabel' )}"
                        >
                            <TextField
                                name="new-contact-phone-number-{contact.index}"
                                value={contact.phoneNumber}
                            />
                        </FormField>
                        <FormField
                            name="{getTranslatedTextByCode( 'ContactEmailLabel' )}"
                        >
                            <TextField
                                name="new-contact-email-{contact.index}"
                                value={contact.email}
                            />
                        </FormField>
                        <FormField
                            name="{getTranslatedTextByCode( 'ContactDirectionLinkLabel' )}"
                        >
                            <TextField
                                name="new-contact-direction-link-{contact.index}"
                                value={contact.directionLink}
                            />
                        </FormField>
                        <div class="admin-button">
                            <Button filled danger on:click={deleteContact( ( {contact} ), true )}>{getTranslatedTextByCode( 'DeleteContactButton' )}</Button>
                        </div>
                    </div>
                {/each}
            {/key}
            <div class="admin-button">
                <Button filled on:click={addContact()}>{getTranslatedTextByCode( 'AddContactButton' )}</Button>
            </div>
        </div>
        <div class="admin-button">
            <button>{getTranslatedTextByCode( 'SavePageButton' )}</button>
        </div>
    </form>
</div>

<style type="text/scss">
    .admin-section.contactus
    {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        @media( min-width: 65em )
        {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1rem;
        }
    }
</style>