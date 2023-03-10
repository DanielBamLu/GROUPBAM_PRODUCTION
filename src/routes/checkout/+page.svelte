<script>
    import { TextField, RadioGroup, FileDropzone } from 'attractions';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { enhance } from '$app/forms';
    import { cart } from '$lib/cart';
    import ListErrors from '$lib/components/ListErrors.svelte';
    import ListSuccess from '$lib/components/ListSuccess.svelte';
    import PdfIcon from '$lib/components/icon/Pdf.svelte'
    import CheckoutOrderSummary from '$lib/components/CheckoutOrderSummary.svelte';
    import CheckoutPaypal from '$lib/components/CheckoutPaypal.svelte';

    let errors;
    let success;

    export let data;

    const paymentMethods = [
        { value: 'paypal', label: 'Paypal or Credit card' },
        { value: 'bank-transfer', label: 'Bank transfer' }
    ];

    let paymentMethod = 'bank-transfer';

    let refresh = {}

    function warning()
    {
        alert( getTranslatedTextByCode( 'CheckoutWarningLabel' ) )

        return true;
    }

    const submitForm = () => warning();

    let refreshFiles = {};
    let filesArray = new Array;
    let newFilesArray = new Array;

    function getBase64( item ) {

        if ( item.length > 0 )
        {
            newFilesArray = new Array;

            for ( let indexFile=0; indexFile < item.length; indexFile++ )
            {
                let file = item[ indexFile ].name.split( '.' );

                let newFile = new Object();

                newFile = {
                    name : file[ 0 ],
                    extension : file[ 1 ],
                    dataFile : '',
                    number: indexFile + 1
                }

                if ( item[ indexFile ] instanceof File )
                {
                    const reader = new FileReader();

                    reader.readAsDataURL( item[ indexFile ] );

                    reader.onload = e => {
                        const fileData = e.target.result.split( ',' );
                        newFile.dataFile = fileData[ 1 ];
                        newFilesArray.push( newFile );
                        refreshFiles = {}
                    };
                }
            }
        }
    };

    let contactFirstName = data.user.firstName;
    let contactLastName = data.user.lastName;
    let contactEmail = data.user.email;
    let description = '';

    let orderData = {
        contactFirstName: contactFirstName,
        contactLastName: contactLastName,
        contactEmail: contactEmail,
        description: description,
        filesArray: newFilesArray,
    }

    function refreshComponent()
    {
        refresh = {}

        orderData.filesArray = newFilesArray;
    }
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
                {#key refresh}
                    <ListErrors errors={errors} />
                    <ListSuccess success={success} />
                {/key}
                <form
                    id="checkout"
                    method="POST"
                    action="?/checkout"
                    on:submit|preventDefault={submitForm}
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

                            refresh = {}

                            update();
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
                                    bind:value={orderData.contactFirstName}
                                    on:change={refreshComponent}
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
                                    bind:value={orderData.contactLastName}
                                    on:change={refreshComponent}
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
                                    bind:value={orderData.contactEmail}
                                    on:change={refreshComponent}
                                    required
                                />
                            </div>
                        </div>
                        <div class="checkout-details-input">
                            <div class="checkout-details-label">
                                {getTranslatedTextByCode( 'CheckoutDescriptionLabel' )}
                            </div>
                            <TextField
                                name="checkout-description"
                                type="text"
                                placeholder="{getTranslatedTextByCode( 'CheckoutDescriptionPlaceholder' )}"
                                bind:value={orderData.description}
                                on:change={refreshComponent}
                            />
                        </div>
                        <div class="checkout-details-input">
                            <div class="checkout-details-label">
                                {getTranslatedTextByCode( 'CheckoutDocumentsLabel' )}
                            </div>
                            <FileDropzone
                                accept="image/*,.pdf"
                                max={7}
                                bind:files={filesArray}
                                on:change={() => getBase64( filesArray )}
                                on:change={refreshComponent}
                            />
                            {#key refreshFiles}
                                {#each newFilesArray as item, index}
                                    <input hidden name="document-file-counter" value="{index}"/>
                                    <input hidden name="document-file-name-{index}" value="{item.name}"/>
                                    <input hidden name="document-file-extension-{index}" value="{item.extension}"/>
                                    <input hidden name="document-file-data-{index}" value="{item.dataFile}"/>
                                {/each}
                            {/key}
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
                            <!-- {#if paymentMethod === 'credit-card'}
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
                            </div> -->
                            {#if paymentMethod === 'paypal'}
                                <div class="paypal">
                                    {#key refresh}
                                        <CheckoutPaypal isOrderPlaced='false' orderId='' totalPrice={$cart.info.totalPriceCart} orderData={orderData}/>
                                    {/key}
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
                                        <div class="bank-transfer-beneficiary">
                                            <div class="bank-transfer-beneficiary-name">
                                                {data.beneficiary.name}
                                            </div>
                                            <div class="bank-transfer-beneficiary-container">
                                                <div class="bank-transfer-beneficiary-item">
                                                    <div class="bank-transfer-beneficiary-label">
                                                        {getTranslatedTextByCode( 'CheckoutAccountLabel' )}
                                                    </div>
                                                    <div class="bank-transfer-beneficiary-value">
                                                        {data.beneficiary.account}
                                                    </div>
                                                </div>
                                                <div class="bank-transfer-beneficiary-item">
                                                    <div class="bank-transfer-beneficiary-label">
                                                        {getTranslatedTextByCode( 'CheckoutBankLabel' )}
                                                    </div>
                                                    <div class="bank-transfer-beneficiary-value">
                                                        {data.beneficiary.bankName}
                                                    </div>
                                                </div>
                                                <div class="bank-transfer-beneficiary-item">
                                                    <div class="bank-transfer-beneficiary-label">
                                                        {getTranslatedTextByCode( 'CheckoutBankCodeLabel' )}
                                                    </div>
                                                    <div class="bank-transfer-beneficiary-value">
                                                        {data.beneficiary.bankCode}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                                                {getTranslatedTextByCode( 'CheckoutSecondAddressLabel' )}
                                            </div>
                                            <TextField
                                                name="checkout-billing-second-address"
                                                type="text"
                                                placeholder="{getTranslatedTextByCode( 'CheckoutSecondAddressPlaceholder' )}"
                                                value={data.user.billingSecondAddressLine}
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
                                                {getTranslatedTextByCode( 'CheckoutProvinceLabel' )}
                                            </div>
                                            <TextField
                                                name="checkout-billing-province"
                                                type="text"
                                                placeholder="{getTranslatedTextByCode( 'CheckoutProvincePlaceholder' )}"
                                                value={data.user.billingProvince}
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
                            {/if}
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

    .bank-transfer-beneficiary
    {
        flex: 1;
    }

    .bank-transfer-beneficiary-name
    {
        margin-bottom: 1rem;
    }

    .bank-transfer-beneficiary-item
    {
        border-top: 0.063rem solid var( --line-color );

        display: flex;
        justify-content: space-between;
    }
</style>
