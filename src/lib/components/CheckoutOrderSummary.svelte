<script>
    import { Switch } from 'attractions';
    import { cart, StoreCart } from '$lib/cart';
    import { getPriceCurrency, getCurrencySymbol } from '$lib/currency';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { page } from '$app/stores';
    import ServiceDetailsCard from '$lib/components/ServiceDetailsCard.svelte';

    let currency = getCurrencySymbol();

    function isUrgency(){
        if( $cart.info.urgency )
        {
            $cart.info.urgency = false;
        }
        else
        {
            $cart.info.urgency = true;
        }

        StoreCart( $cart, $page.data.user );
        }

    let refresh = {}
    function restartComponents() {
        refresh = {}
    }

    const cleanCart = () => {
        localStorage.setItem( 'cart', '' );

        setTimeout(() => {
            $cart = {
                services: [],
                info: {}
            };
        }, 1000)
    }
</script>

{#key refresh}
    <div class="checkout-order-summary">
        <div class="checkout-order-summary-heading">
            {getTranslatedTextByCode( 'OrderSummaryLabel' )}
        </div>
        <div class="checkout-order-summary-container">
            {#if $cart.services.length > 0}
                <div class="checkout-order-summary-production-time">
                    <div class="checkout-order-summary-production-time-label">
                        {getTranslatedTextByCode( 'ProductionTimeLabel' )}
                    </div>
                    <div class="checkout-order-summary-production-time-days">
                        {#if $cart.info.productionTime == 1}
                            {$cart.info.productionTime} {getTranslatedTextByCode( 'CartDayLabel' )}
                        {:else}
                            {$cart.info.productionTime} {getTranslatedTextByCode( 'CartDaysLabel' )}
                        {/if}
                    </div>
                </div>
                <div class="checkout-order-summary-items">
                    {#each $cart.services as itemCart}
                        <ServiceDetailsCard data={itemCart} refresh={restartComponents}/>
                    {/each}
                </div>
                <div class="checkout-order-summary-urgency">
                    <div class="checkout-order-summary-urgency-label">
                        {getTranslatedTextByCode( 'UrgencyLabel' )}
                    </div>
                    <Switch name="urgency" value={$cart.info.urgency} on:change={isUrgency}/>
                </div>
                <div class="checkout-order-summary-total">
                    <div class="checkout-order-summary-total-label">
                        {getTranslatedTextByCode( 'TotalToPayLabel' )}
                    </div>
                    <div class="checkout-order-summary-total-value">
                        {currency}{getPriceCurrency( $cart.info.totalPriceCart )}
                    </div>
                </div>
                <div class="checkout-order-summary-actions">
                    <button class="checkout-order-summary-checkout" on:click={cleanCart} type="submit" form="checkout">
                        <div class="checkout-order-summary-checkout-label">
                            {getTranslatedTextByCode( 'CheckoutPlaceOrderButton' )}
                        </div>
                    </button>
                </div>
            {/if}
        </div>
    </div>
{/key}

<style type="text/scss">
    .checkout-order-summary
    {
        background-color: var( --white-color );
    }

    .checkout-order-summary-heading
    {
        height: 4rem;
        padding-left: 2rem;

        display: flex;
        align-items: center;

        background-color: var(--black-color );
    }

    .checkout-order-summary-container
    {
        padding: 2rem;
    }

    .checkout-order-summary-production-time
    {
        margin-top: 1.5rem;

        display: flex;
        justify-content: space-between;
    }

    .checkout-order-summary-items
    {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;

        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .checkout-order-summary-urgency
    {
        margin-bottom: 1rem;
        border-top: 0.063rem solid var( --line-color );
        padding: 1.25rem 0;

        display: flex;
        justify-content: space-between;
    }

    .checkout-order-summary-total
    {
        display: flex;
        justify-content: space-between;
    }

    .checkout-order-summary-actions
    {
        display: flex;
        gap: 1.5rem;
    }

    .checkout-order-summary-checkout
    {
        padding: 1.25rem;

        flex: 1;

        background-color: var( --blue-color );
    }
</style>
