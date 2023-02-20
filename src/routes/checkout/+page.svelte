<script>
    import ListErrors from '$lib/components/ListErrors.svelte';
    import ListSuccess from '$lib/components/ListSuccess.svelte';
    import { TextField, RadioGroup } from 'attractions';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { enhance } from '$app/forms';
    import PdfIcon from '$lib/components/icon/Pdf.svelte'
    import PaypalLabelIcon from '$lib/components/icon/PaypalLabel.svelte'
    import PaypalIcon from '$lib/components/icon/Paypal.svelte'
    import CheckoutOrderSummary from '$lib/components/CheckoutOrderSummary.svelte';

    let errors;
    let success;

    export let data;

    const paymentMethods = [
        { value: 'credit-card', label: 'Credit card' },
        { value: 'paypal', label: 'Paypal' },
        { value: 'bank-transfer', label: 'Bank transfer' }
    ];

    let paymentMethod = 'credit-card';

</script>

<svelte:head>
    <title>{getTranslatedTextByCode( 'CheckoutPageLabel' )}</title>
</svelte:head>

<div class="checkout">
    <div class="checkout-container">
        <div class="checkout-summary">
            <CheckoutOrderSummary/>
        </div>
        <div class="checkout-main">
            <div class="checkout-page-title">
                {getTranslatedTextByCode( 'CheckoutPageLabel' )}
            </div>
            <div class="checkout-form">
                <ListErrors errors={errors} />
                <ListSuccess success={success} />
                <form
                    id="checkout"
                    method="POST"
                    action="?/checkout"
                    use:enhance={() => {
                        return ( { result, update } ) => {

                            if ( result.data )
                            {
                                if ( result.data.errors )
                                {
                                    errors = result.data.errors;
                                }

                                if ( result.data.success )
                                {
                                    success = result.data.success;
                                }
                            }

                            if ( result.type === 'error' ) update();
                        };
                    }}
                >
                    <div class="checkout-details">
                        <div class="checkout-section-title">
                            {getTranslatedTextByCode( 'CheckoutContactDetailsLabel' )}
                        </div>
                        <div class="checkout-form-container">
                            <div class="checkout-details-input">
                                <div class="checkout-details-label">
                                    {getTranslatedTextByCode( 'CheckoutFirstNameLabel' )}
                                </div>
                                <TextField
                                    name="checkout-contact-first-name"
                                    type="text"
                                    placeholder="{getTranslatedTextByCode( 'CheckoutFirstNamePlaceholder' )}"
                                    value={data.user.firstName}
                                    required
                                />
                            </div>
                            <div class="checkout-details-input">
                                <div class="checkout-details-label">
                                    {getTranslatedTextByCode( 'CheckoutLastNameLabel' )}
                                </div>
                                <TextField
                                    name="checkout-contact-last-name"
                                    type="text"
                                    placeholder="{getTranslatedTextByCode( 'CheckoutLastNamePlaceholder' )}"
                                    value={data.user.lastName}
                                    required
                                />
                            </div>
                            <div class="checkout-details-input">
                                <div class="checkout-details-label">
                                    {getTranslatedTextByCode( 'CheckoutEmailLabel' )}
                                </div>
                                <TextField
                                    name="checkout-contact-email"
                                    type="text"
                                    placeholder="{getTranslatedTextByCode( 'CheckoutEmailPlaceholder' )}"
                                    value={data.user.email}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div class="checkout-payment">
                        <div class="checkout-section-title">
                            {getTranslatedTextByCode( 'CheckoutPaymentMethodLabel' )}
                        </div>
                        <RadioGroup
                            items={paymentMethods}
                            name="payment-methods"
                            bind:value={paymentMethod}
                        />
                        <div class="checkout-payment-container">
                            {#if paymentMethod === 'credit-card'}
                                <div class="checkout-details-input">
                                    <div class="checkout-details-label">
                                        {getTranslatedTextByCode( 'CardNumberLabel' )}
                                    </div>
                                    <TextField
                                        name="checkout-contact-email"
                                        type="text"
                                        placeholder="{getTranslatedTextByCode( 'CardNumberPlaceholder' )}"
                                        required
                                    />
                                </div>
                                <div class="checkout-details-input">
                                    <div class="checkout-details-label">
                                        {getTranslatedTextByCode( 'CardHoldersNameLabel' )}
                                    </div>
                                    <TextField
                                        name="checkout-contact-email"
                                        type="text"
                                        placeholder="{getTranslatedTextByCode( 'CardHoldersPlaceholder' )}"
                                        required
                                    />
                                </div>
                                <div class="checkout-details-input">
                                    <div class="checkout-details-label">
                                        {getTranslatedTextByCode( 'CardMonthLabel' )}
                                    </div>
                                    <TextField
                                        name="checkout-contact-email"
                                        type="text"
                                        placeholder="{getTranslatedTextByCode( 'CardMonthPlaceholder' )}"
                                        required
                                    />
                                </div>
                                <div class="checkout-details-input">
                                    <div class="checkout-details-label">
                                        {getTranslatedTextByCode( 'CardYearLabel' )}
                                    </div>
                                    <TextField
                                        name="checkout-contact-email"
                                        type="text"
                                        placeholder="{getTranslatedTextByCode( 'CardYearPlaceholder' )}"
                                        required
                                    />
                                </div>
                                <div class="checkout-details-input">
                                    <div class="checkout-details-label">
                                        {getTranslatedTextByCode( 'CardCvvLabel' )}
                                    </div>
                                    <TextField
                                        name="checkout-contact-email"
                                        type="text"
                                        placeholder="{getTranslatedTextByCode( 'CardCvvPlaceholder' )}"
                                        required
                                    />
                                </div>
                            {:else if paymentMethod === 'paypal'}
                                <div class="paypal">
                                    <div class="paypal-button">
                                        <PaypalLabelIcon/>
                                    </div>
                                    <div class="paypal-button">
                                        <PaypalIcon/>
                                    </div>
                                </div>
                            {:else if paymentMethod === 'bank-transfer'}
                                <div class="bank-transfer">
                                    <div class="bank-transfer-message">
                                        {getTranslatedTextByCode( 'PaymentMessageBankTransferLabel' )}
                                    </div>
                                    <div class="bank-transfer-container">
                                        <div class="bank-transfer-generate-offer">
                                            <div class="bank-transfer-generate-offer-icon">
                                                <PdfIcon/>
                                            </div>
                                            <div class="bank-transfer-generate-offer-label">
                                                {getTranslatedTextByCode( 'GenerateOfferLabel' )}
                                            </div>
                                        </div>
                                        <div class="bank-transfer-beneficiary-data">
                                            <div class="bank-transfer-beneficiary-data-name">
                                                {data.beneficiary.name}
                                            </div>
                                            <div class="bank-transfer-beneficiary-data-container">
                                                <div class="bank-transfer-beneficiary-data-item">
                                                    <div class="bank-transfer-beneficiary-data-label">
                                                        {getTranslatedTextByCode( 'CheckoutAccountLabel' )}
                                                    </div>
                                                    <div class="bank-transfer-beneficiary-data-value">
                                                        {data.beneficiary.account}
                                                    </div>
                                                </div>
                                                <div class="bank-transfer-beneficiary-data-item">
                                                    <div class="bank-transfer-beneficiary-data-label">
                                                        {getTranslatedTextByCode( 'CheckoutBankLabel' )}
                                                    </div>
                                                    <div class="bank-transfer-beneficiary-data-value">
                                                        {data.beneficiary.bankName}
                                                    </div>
                                                </div>
                                                <div class="bank-transfer-beneficiary-data-item">
                                                    <div class="bank-transfer-beneficiary-data-label">
                                                        {getTranslatedTextByCode( 'CheckoutBankCodeLabel' )}
                                                    </div>
                                                    <div class="bank-transfer-beneficiary-data-value">
                                                        {data.beneficiary.bankCode}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </div>
                    <div class="checkout-billing">
                        <div class="checkout-section-title">
                            {getTranslatedTextByCode( 'CheckoutBillingAddressLabel' )}
                        </div>
                        <div class="checkout-form-container">
                            <div class="checkout-details-input">
                                <div class="checkout-details-label">
                                    {getTranslatedTextByCode( 'CheckoutFirstNameLabel' )}
                                </div>
                                <TextField
                                    name="checkout-billing-first-name"
                                    type="text"
                                    placeholder="{getTranslatedTextByCode( 'CheckoutFirstNamePlaceholder' )}"
                                    value={data.user.firstName}
                                    required
                                />
                            </div>
                            <div class="checkout-details-input">
                                <div class="checkout-details-label">
                                    {getTranslatedTextByCode( 'CheckoutLastNameLabel' )}
                                </div>
                                <TextField
                                    name="checkout-billing-last-name"
                                    type="text"
                                    placeholder="{getTranslatedTextByCode( 'CheckoutLastNamePlaceholder' )}"
                                    value={data.user.lastName}
                                    required
                                />
                            </div>
                            <div class="checkout-details-input">
                                <div class="checkout-details-label">
                                    {getTranslatedTextByCode( 'CheckoutAddressLabel' )}
                                </div>
                                <TextField
                                    name="checkout-billing-address"
                                    type="text"
                                    placeholder="{getTranslatedTextByCode( 'CheckoutAddressPlaceholder' )}"
                                    value={data.user.billingFirstAddressLine}
                                    required
                                />
                            </div>
                            <div class="checkout-details-input">
                                <div class="checkout-details-label">
                                    {getTranslatedTextByCode( 'CheckoutCityCodeLabel' )}
                                </div>
                                <TextField
                                    name="checkout-billing-city-code"
                                    type="text"
                                    placeholder="{getTranslatedTextByCode( 'CheckoutCityCodePlaceholder' )}"
                                    value={data.user.billingCityCode}
                                    required
                                />
                            </div>
                            <div class="checkout-details-input">
                                <div class="checkout-details-label">
                                    {getTranslatedTextByCode( 'CheckoutCityLabel' )}
                                </div>
                                <TextField
                                    name="checkout-billing-city"
                                    type="text"
                                    placeholder="{getTranslatedTextByCode( 'CheckoutCityPlaceholder' )}"
                                    value={data.user.billingCity}
                                    required
                                />
                            </div>
                            <div class="checkout-details-input">
                                <div class="checkout-details-label">
                                    {getTranslatedTextByCode( 'CheckoutCountryLabel' )}
                                </div>
                                <TextField
                                    name="checkout-billing-country"
                                    type="text"
                                    placeholder="{getTranslatedTextByCode( 'CheckoutCountryPlaceholder' )}"
                                    value={data.user.billingCountrySlug}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<style type="text/scss">
    .checkout
    {
        padding: 2rem;
        @media( min-width: 65em )
        {
            padding: 4rem;
        }
    }

    .checkout-container
    {
        @media( min-width: 65em )
        {
            display: flex;
            flex-direction: row-reverse;
            gap: 2rem;
        }
    }

    .checkout-summary
    {
        max-width: 40rem;

        flex: 1;
    }

    .checkout-main
    {
        flex: 1;
    }

    .checkout-form-container
    {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        @media( min-width: 65em )
        {
            grid-template-columns: 1fr 1fr;
        }
    }

    .paypal
    {
        display: flex;
        gap: 1rem;
    }

    .paypal-button
    {
        padding: 0.5rem;

        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;

        background-color: var( --blue-color );
    }

    .bank-transfer-container
    {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        @media( min-width: 65em )
        {
            flex-direction: row;
        }
    }

    .bank-transfer-generate-offer
    {
        height: 10rem;
        border: 0.063rem solid var( --line-color );
        padding: 1rem;

        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
    }

    .bank-transfer-generate-offer-label
    {
        text-align: right;
    }

    .bank-transfer-beneficiary-data
    {
        flex: 1;
    }

    .bank-transfer-beneficiary-data-name
    {
        margin-bottom: 1rem;
    }

    .bank-transfer-beneficiary-data-item
    {
        border-top: 0.063rem solid var( --line-color );

        display: flex;
        justify-content: space-between;
    }
</style>
