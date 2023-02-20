<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { Switch } from 'attractions';
    import { getPriceCurrency, getCurrencySymbol } from '$lib/currency';
    import { cart, StoreCart } from '$lib/cart';
    import { page } from '$app/stores';
    import CloseIcon from '$lib/components/icon/Close.svelte';
    import OrderSummaryItem from '$lib/components/OrderSummaryItem.svelte'
    import LockIcon from '$lib/components/icon/Lock.svelte';
    import PrintIcon from '$lib/components/icon/Print.svelte';

    let currency = getCurrencySymbol();

    let urgency = false;
    $cart.info.urgency = urgency;

    const isUrgency = () => {
        $cart.info.urgency = urgency;
        StoreCart( $cart, $page.data.user );
        }

    const generateOffer = () => {
        console.log($cart);
        }

    export let closeModalOrderSummary = () => {}
</script>

{#if $cart.info.isOpen}
    {#if $cart.services.length > 0}
        <div class="order-summary-card">
            <div class="modal-close">
                <button class="modal-close-button" on:click={closeModalOrderSummary}>
                    <CloseIcon/>
                </button>
            </div>
            <div class="order-summary-card-container">
                <div class="order-summary-card-title order-summary-title">
                    {getTranslatedTextByCode( 'OrderSummaryLabel' )}
                </div>
                <div class="order-summary-card-production-time">
                    <div class="order-summary-card-production-time-label order-summary-production-time-label">
                        {getTranslatedTextByCode( 'ProductionTimeLabel' )}
                    </div>
                    <div class="order-summary-card-production-time-days order-summary-production-time-days">
                        {#if $cart.info.productionTime == 1}
                            {$cart.info.productionTime} {getTranslatedTextByCode( 'OrderSummaryDayLabel' )}
                        {:else}
                            {$cart.info.productionTime} {getTranslatedTextByCode( 'OrderSummaryDaysLabel' )}
                        {/if}
                    </div>
                </div>
                {#each $cart.services as itemCart}
                    <OrderSummaryItem item={itemCart}/>
                {/each}
                <div class="order-summary-card-urgency">
                    <div class="order-summary-card-urgency-label order-summary-urgency-label">
                        {getTranslatedTextByCode( 'UrgencyLabel' )}
                    </div>
                    <Switch name="urgency" bind:value={urgency} on:change={isUrgency}/>
                </div>
                <div class="order-summary-card-secure-payment">
                    <div class="order-summary-secure-payment-icon">
                        <LockIcon/>
                    </div>
                    <div class="order-summary-card-secure-payment-label order-summary-secure-payment-label">
                        {getTranslatedTextByCode( 'SecurePaymentLabel' )}
                    </div>
                </div>
                <a class="order-summary-checkout" href="/checkout">
                    <div class="order-summary-checkout-label order-summary-checkout-text">
                        {getTranslatedTextByCode( 'CheckoutLabel' )}
                    </div>
                    <div class="order-summary-checkout-price order-summary-checkout-text">
                        {currency}{getPriceCurrency( $cart.info.totalPriceCart )}
                    </div>
                </a>
                <button class="order-summary-generate-offer" on:click={() => generateOffer()}>
                    <div class="order-summary-generate-offer-icon">
                        <PrintIcon/>
                    </div>
                    <div class="order-summary-generate-offer-label order-summary-generate-offer-text">
                        {getTranslatedTextByCode( 'GenerateOfferLabel' )}
                    </div>
                </button>
            </div>
        </div>
    {/if}
{/if}

<style type="text/scss">
    .order-summary-card{

        height: 100%;
        min-width: 20rem;

        flex: 1;

        background-color: var( --white-color );
        @media( min-width: 120em )
        {
            padding: 1.5rem;

            flex: unset;
        }
    }

    .order-summary-card .modal-close
    {
        @media( min-width: 65em )
        {
            display: none;
        }
    }

    .order-summary-card-container
    {
        padding: 1.5rem;
        @media( min-width: 120em )
        {
            padding: 0;
        }
    }

    .order-summary-card-title
    {
        display: none;
        @media( min-width: 65em )
        {
            display: block;
        }
    }

    .order-summary-card-production-time
    {
        border-bottom: 0.063rem solid var( --line-color );
        padding: 1.25rem 0;

        display: flex;
        justify-content: space-between;
    }

    .order-summary-card-urgency
    {
        border-top: 0.063rem solid var( --line-color );
        padding: 1.25rem 0;

        display: flex;
        justify-content: space-between;
    }

    .order-summary-card-secure-payment
    {
        border-top: 0.063rem solid var( --line-color );
        padding: 1.25rem 0;

        display: flex;
        gap: 0.875rem;
        align-items: center;
    }

    .order-summary-checkout
    {
        margin-bottom: 0.5rem;
        width: 100%;
        padding: 1.25rem 1.5rem;

        display: flex;
        justify-content: space-between;
        align-items: center;

        background-color: var( --blue-color );
    }

    .order-summary-generate-offer
    {
        width: 100%;
        padding: 1.25rem;

        display: flex;
        gap: 0.875rem;
        justify-content: center;
        align-items: center;

        background-color: var( --line-tint-color );
    }
</style>
