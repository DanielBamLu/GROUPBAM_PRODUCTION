<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { clickOutside } from '$lib/clickOutside.js';
    import { Modal } from 'attractions';
    import { invalidateAll } from '$app/navigation';
    import PersonalInfoModal from '$lib/components/PersonalInfoModal.svelte';
    import PasswordModal from '$lib/components/PasswordModal.svelte';
    import BillingAddressModal from '$lib/components/BillingAddressModal.svelte';

    export let data;

    let userInfo = data.userData;

    function closePersonalInfoModal() {
        if ( modalPersonalInfoOpen )
        {
            modalPersonalInfoOpen = false;
        }
    }

    function closePasswordModal() {
        if ( modalPasswordOpen )
        {
            modalPasswordOpen = false;
        }
    }

    function closeBillingAddressModal() {
        if ( modalBillingAddressOpen )
        {
            modalBillingAddressOpen = false;
        }
    }

    let modalPersonalInfoOpen = false;
    let modalPasswordOpen = false;
    let modalBillingAddressOpen = false;
</script>

<svelte:head>
    <title>{getTranslatedTextByCode( 'SettingsPageTitle' )}</title>
</svelte:head>

<div class="account">
    <div class="account-section account-personal">
        <div class="account-section-title">
            {getTranslatedTextByCode( 'AccountPersonalInformationLabel' )}
        </div>
        <div class="account-section-container">
            <div class="account-personal-field">
                <div class="account-personal-field-label">
                    {getTranslatedTextByCode( 'SettingsPseudonymLabel' )}
                </div>
                <div class="account-personal-field-text">
                    {userInfo.pseudonym}
                </div>
            </div>
            <div class="account-personal-field">
                <div class="account-personal-field-label">
                    {getTranslatedTextByCode( 'SettingsFirstNameLabel' )}
                </div>
                <div class="account-personal-field-text">
                    {userInfo.firstName}
                </div>
            </div>
            <div class="account-personal-field">
                <div class="account-personal-field-label">
                    {getTranslatedTextByCode( 'SettingsLastNameLabel' )}
                </div>
                <div class="account-personal-field-text">
                    {userInfo.lastName}
                </div>
            </div>
            <div class="account-personal-field">
                <div class="account-personal-field-label">
                    {getTranslatedTextByCode( 'SettingsEmailLabel' )}
                </div>
                <div class="account-personal-field-text">
                    {userInfo.email}
                </div>
            </div>
            <div class="account-personal-field">
                <div class="account-personal-field-label">
                    {getTranslatedTextByCode( 'SettingsBirthDateLabel' )}
                </div>
                <div class="account-personal-field-text">
                    {userInfo.dateTime}
                </div>
            </div>
            <div class="account-personal-field">
                <div class="account-personal-field-label">
                    {getTranslatedTextByCode( 'SettingsBillingCountrySlugLabel' )}
                </div>
                <div class="account-personal-field-text">
                    {userInfo.countrySlug}
                </div>
            </div>
            <div class="account-personal-field">
                <div class="account-personal-field-label">
                    {getTranslatedTextByCode( 'SettingsPhonePrefixLabel' )}
                </div>
                <div class="account-personal-field-text">
                    {userInfo.firstPhonePrefix}
                </div>
            </div>
            <div class="account-personal-field">
                <div class="account-personal-field-label">
                    {getTranslatedTextByCode( 'SettingsPhoneNumberLabel' )}
                </div>
                <div class="account-personal-field-text">
                    {userInfo.firstPhoneNumber}
                </div>
            </div>
            <div class="account-personal-field">
                <div class="account-personal-field-label">
                    {getTranslatedTextByCode( 'SettingsSecondPhonePrefixLabel' )}
                </div>
                <div class="account-personal-field-text">
                    {userInfo.secondPhonePrefix}
                </div>
            </div>
            <div class="account-personal-field">
                <div class="account-personal-field-label">
                    {getTranslatedTextByCode( 'SettingsSecondPhoneNumberLabel' )}
                </div>
                <div class="account-personal-field-text">
                    {userInfo.secondPhoneNumber}
                </div>
            </div>
            <div class="account-personal-field">
                <div class="account-personal-field-label">
                    {getTranslatedTextByCode( 'SettingsSecretQuestionLabel' )}
                </div>
                <div class="account-personal-field-text">
                    {userInfo.secretQuestion}
                </div>
            </div>
            <div class="account-personal-field">
                <div class="account-personal-field-label">
                    {getTranslatedTextByCode( 'SettingsSecretAnswerLabel' )}
                </div>
                <div class="account-personal-field-text">
                    {userInfo.secretAnswer}
                </div>
            </div>
        </div>
        <button class="account-section-button" on:click={() => modalPersonalInfoOpen = true}>{getTranslatedTextByCode( 'AccountEditButton' )}</button>
        {#if modalPersonalInfoOpen}
            <Modal bind:open={modalPersonalInfoOpen}>
                <div class="modal-login" use:clickOutside on:click_outside={closePersonalInfoModal}>
                    <PersonalInfoModal data={userInfo} closePersonalInfoModal={closePersonalInfoModal}/>
                </div>
            </Modal>
        {/if}
    </div>
    <div class="account-section account-payment">
        <div class="account-section-title">
            {getTranslatedTextByCode( 'AccountPaymentLabel' )}
        </div>
    </div>
    <div class="account-section account-password">
        <div class="account-section-title">
            {getTranslatedTextByCode( 'AccountSecurityLabel' )}
        </div>
        <button class="account-section-button-password" on:click={() => modalPasswordOpen = true}>{getTranslatedTextByCode( 'AccountChangePasswordButton' )}</button>
        {#if modalPasswordOpen}
            <Modal bind:open={modalPasswordOpen}>
                <div class="modal-login" use:clickOutside on:click_outside={closePasswordModal}>
                    <PasswordModal closePasswordModal={closePasswordModal}/>
                </div>
            </Modal>
        {/if}
    </div>
    <div class="account-section account-billing">
        <div class="account-section-title">
            {getTranslatedTextByCode( 'AccountBillingAddressLabel' )}
        </div>
        <div class="account-section-container">
            <div class="account-section-text">
                {userInfo.billingFirstAddressLine}
            </div>
            <div class="account-section-text">
                {userInfo.billingSecondAddressLine}
            </div>
            <div class="account-section-text">
                {userInfo.billingCity}
            </div>
            <div class="account-section-text">
                {userInfo.billingCityCode}
            </div>
            <div class="account-section-text">
                {userInfo.billingProvince}
            </div>
            <div class="account-section-text">
                {userInfo.billingCountrySlug}
            </div>
        </div>
        <button class="account-section-button" on:click={() => modalBillingAddressOpen = true}>{getTranslatedTextByCode( 'AccountEditButton' )}</button>
        {#if modalBillingAddressOpen}
            <Modal bind:open={modalBillingAddressOpen}>
                <div class="modal-login" use:clickOutside on:click_outside={closeBillingAddressModal}>
                    <BillingAddressModal data={userInfo} closeBillingAddressModal={closeBillingAddressModal}/>
                </div>
            </Modal>
        {/if}
    </div>
</div>

<style type="text/scss">
    .account
    {
        padding: 2rem;

        display: flex;
        flex-wrap: wrap;
        gap: 3rem;
        align-items: flex-start;
        @media( min-width: 65em )
        {
            padding: 3rem;
        }
    }
    .account-section
    {
        padding: 2rem;

        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 2rem;

        background-color: var( --white-color );
        @media( min-width: 65em )
        {
            min-width: calc( 50% - 2.1rem );
        }
    }

    .account-personal-field
    {
        border-bottom: 0.063rem solid var( --line-color );
        padding: 1rem 0;

        display: flex;
        justify-content: space-between;
    }

    .account-section-button-password
    {
        border: 0.063rem solid var( --blue-color );
        padding: 1rem;

        background-color: var( --white-color );

        text-align: center;
    }

    .account-section-button
    {
        padding: 1rem;

        background-color: var( --background-color );

        text-align: center;
    }
</style>
