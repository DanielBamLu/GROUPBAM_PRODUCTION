<script>
    import { TextField } from 'attractions';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { enhance } from '$app/forms';
    import ListErrors from '$lib/components/ListErrors.svelte';
    import ListSuccess from '$lib/components/ListSuccess.svelte';
    import CloseIcon from '$lib/components/icon/Close.svelte';

    export let data;
    export let closeBillingAddressModal = () => {}

    let errors;
    let success;

    let refresh = {}
</script>

<div class="modal">
    <div class="modal-close">
        <button class="modal-close-button" on:click={closeBillingAddressModal}>
            <CloseIcon/>
        </button>
    </div>
    <div class="modal-container">
        {#key refresh}
            <ListErrors errors={errors} />
            <ListSuccess success={success} />
        {/key}
        <form
            method="POST"
            action="/customer/account?/editBillingAddress"
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
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsBillingAddressLabel' )}
                </div>
                <TextField
                    name="billing-first-address-line"
                    type="text"
                    placeholder="Billing address"
                    value={data.billingFirstAddressLine}
                    required
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsSecondBillingAddressLabel' )}
                </div>
                <TextField
                    name="billing-second-address-line"
                    type="text"
                    placeholder="Second billing address"
                    value={data.billingSecondAddressLine}
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsBillingCityLabel' )}
                </div>
                <TextField
                    name="billing-city"
                    type="text"
                    placeholder="Billing city"
                    value={data.billingCity}
                    required
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsBillingCityCodeLabel' )}
                </div>
                <TextField
                    name="billing-city-code"
                    type="text"
                    placeholder="Billing city code"
                    value={data.billingCityCode}
                    required
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsBillingProvinceLabel' )}
                </div>
                <TextField
                    name="billing-province"
                    type="text"
                    placeholder="Billing province"
                    value={data.billingProvince}
                    required
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsBillingCountrySlugLabel' )}
                </div>
                <TextField
                    name="billing-country-slug"
                    type="text"
                    placeholder="Billing country slug"
                    value={data.billingCountrySlug}
                    required
                />
            </div>
            <div class="modal-actions">
                <div class="modal-button-cancel" on:click={closeBillingAddressModal}>
                    {getTranslatedTextByCode( 'ModalCancelButton' )}
                </div>
                <div class="modal-button">
                    <button>{getTranslatedTextByCode( 'ModalSaveButton' )}</button>
                </div>
            </div>
        </form>
    </div>
</div>
