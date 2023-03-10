<script>
    import { Tabs, TextField, FormField } from 'attractions';
    import { enhance } from '$app/forms';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import ListErrors from '$lib/components/ListErrors.svelte';
    import ListSuccess from '$lib/components/ListSuccess.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    let errors;
    let success;

    let userInfo = data.userData;

    let selectedTab = 'Info';

    let refresh = {}
</script>

<svelte:head>
    <title>{getTranslatedTextByCode( 'SettingsPageTitle' )}</title>
</svelte:head>

<div class="admin-page">
    {#if userInfo.provider === 'email'}
        <Tabs
            name="menu"
            items={[ 'Info', 'Billing', 'Password' ]}
            bind:value={selectedTab}
        />
    {:else}
        <Tabs
            name="menu"
            items={[ 'Info', 'Billing' ]}
            bind:value={selectedTab}
        />
    {/if}
    {#key refresh}
        <ListErrors errors={errors} />
        <ListSuccess success={success} />
    {/key}
    <form
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
        method="POST"
        action="?/edit"
    >
        <div class="admin-tab {selectedTab === 'Info' ? 'selected' : ''}">
            <div class="admin-section">
                <FormField
                        name={getTranslatedTextByCode( 'SettingsEmailLabel' )}
                    >
                        <TextField
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={userInfo.email}
                            disabled
                        />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                        name={getTranslatedTextByCode( 'SettingsPseudonymLabel' )}
                    >
                        <TextField
                            name="pseudonym"
                            type="text"
                            placeholder="Pseudonym"
                            value={userInfo.pseudonym}
                            required
                        />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                        name={getTranslatedTextByCode( 'SettingsFirstNameLabel' )}
                    >
                        <TextField
                            name="first-name"
                            type="text"
                            placeholder="First name"
                            value={userInfo.firstName}
                            required
                        />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                        name={getTranslatedTextByCode( 'SettingsLastNameLabel' )}
                    >
                        <TextField
                            name="last-name"
                            type="text"
                            placeholder="Last name"
                            value={userInfo.lastName}
                            required
                        />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                        name={getTranslatedTextByCode( 'SettingsPhonePrefixLabel' )}
                    >
                        <TextField
                            name="first-phone-prefix"
                            type="text"
                            placeholder="Phone prefix"
                            value={userInfo.firstPhonePrefix}
                            required
                        />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                        name={getTranslatedTextByCode( 'SettingsPhoneNumberLabel' )}
                    >
                        <TextField
                            name="first-phone-number"
                            type="text"
                            placeholder="Phone number"
                            value={userInfo.firstPhoneNumber}
                            required
                        />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                    name={getTranslatedTextByCode( 'SettingsSecondPhonePrefixLabel' )}
                    >
                        <TextField
                            name="second-phone-prefix"
                            type="text"
                            placeholder="Second phone prefix"
                            value={userInfo.secondPhonePrefix}
                        />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                        name={getTranslatedTextByCode( 'SettingsSecondPhoneNumberLabel' )}
                    >
                        <TextField
                            name="second-phone-number"
                            type="text"
                            placeholder="Second phone number"
                            value={userInfo.secondPhoneNumber}
                        />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                        name={getTranslatedTextByCode( 'SettingsRoleLabel' )}
                    >
                        <TextField
                            name="role"
                            type="text"
                            placeholder="Role"
                            value={userInfo.role}
                        />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                        name={getTranslatedTextByCode( 'SettingsBirthDateLabel' )}
                    >
                        <TextField
                            name="date-time"
                            type="text"
                            placeholder="Date"
                            value={userInfo.dateTime}
                        />
                </FormField>
            </div>
        </div>
        <div class="admin-tab {selectedTab === 'Billing' ? 'selected' : ''}">
            <div class="admin-section">
                <FormField
                        name={getTranslatedTextByCode( 'SettingsBillingAddressLabel' )}
                    >
                        <TextField
                            name="billing-first-address-line"
                            type="text"
                            placeholder="Billing address"
                            value={userInfo.billingFirstAddressLine}
                            required
                        />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                        name={getTranslatedTextByCode( 'SettingsSecondBillingAddressLabel' )}
                    >
                        <TextField
                            name="billing-second-address-line"
                            type="text"
                            placeholder="Second billing address"
                            value={userInfo.billingSecondAddressLine}
                        />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                        name={getTranslatedTextByCode( 'SettingsBillingCityLabel' )}
                    >
                        <TextField
                            name="billing-city"
                            type="text"
                            placeholder="Billing city"
                            value={userInfo.billingCity}
                            required
                        />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                        name={getTranslatedTextByCode( 'SettingsBillingCityCodeLabel' )}
                    >
                        <TextField
                            name="billing-city-code"
                            type="text"
                            placeholder="Billing city code"
                            value={userInfo.billingCityCode}
                            required
                        />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                        name={getTranslatedTextByCode( 'SettingsBillingProvinceLabel' )}
                    >
                        <TextField
                            name="billing-province"
                            type="text"
                            placeholder="Billing province"
                            value={userInfo.billingProvince}
                            required
                        />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                        name={getTranslatedTextByCode( 'SettingsBillingCountrySlugLabel' )}
                    >
                        <TextField
                            name="billing-country-slug"
                            type="text"
                            placeholder="Billing country slug"
                            value={userInfo.billingCountrySlug}
                            required
                        />
                </FormField>
            </div>
        </div>
        {#if userInfo.provider === 'email'}
            <div class="admin-tab {selectedTab === 'Password' ? 'selected' : ''}">
                <div class="admin-section">
                    <FormField
                            name={getTranslatedTextByCode( 'SettingsOldPasswordLabel' )}
                        >
                            <TextField
                                name="old-password"
                                type="password"
                            />
                    </FormField>
                </div>
                <div class="admin-section">
                    <FormField
                            name={getTranslatedTextByCode( 'SettingsNewPasswordLabel' )}
                        >
                            <TextField
                                name="new-password"
                                type="password"
                            />
                    </FormField>
                </div>
                <div class="admin-section">
                    <FormField
                            name={getTranslatedTextByCode( 'SettingsReTypeNewPasswordLabel' )}
                        >
                            <TextField
                                name="new-password-retype"
                                type="password"
                            />
                    </FormField>
                </div>
                <div class="admin-section">
                    <FormField
                            name={getTranslatedTextByCode( 'SettingsSecretQuestionLabel' )}
                        >
                            <TextField
                                name="secret-question"
                                value={userInfo.secretQuestion}
                            />
                    </FormField>
                </div>
                <div class="admin-section">
                    <FormField
                            name={getTranslatedTextByCode( 'SettingsSecretAnswerLabel' )}
                        >
                            <TextField
                                name="secret-answer"
                                value={userInfo.secretAnswer}
                            />
                    </FormField>
                </div>
            </div>
        {/if}
        <div class="admin-button">
            <button>{getTranslatedTextByCode( 'SettingsUpdateButton' )}</button>
        </div>
    </form>
    <form use:enhance method="POST" action="?/logout">
        <div class="admin-button">
            <button class="danger">{getTranslatedTextByCode( 'SettingsLogoutButton' )}</button>
        </div>
    </form>
</div>
