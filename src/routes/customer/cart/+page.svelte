<script>
    import { Switch } from 'attractions';
    import { getPriceCurrency, getCurrencySymbol } from '$lib/currency';
    import { cart, StoreCart } from '$lib/cart';
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
        restartComponents();
        }

    let refresh = {}
    function restartComponents() {
        refresh = {}
    }
</script>

<svelte:head>
  <title>{getTranslatedTextByCode( 'CartTitle' )}</title>
</svelte:head>
{#key refresh}
    <div class="cart">
        <div class="cart-heading">
            {#if $cart.services.length === 0}
                <div class="cart-empty">
                    {getTranslatedTextByCode( 'CartEmptyLabel' )}
                </div>
            {/if}
        </div>
        <div class="cart-container">
            {#if $cart.services.length > 0}
                <div class="cart-info">
                    <div class="cart-info-container">
                        <div class="cart-items-lenght">
                            {$cart.services.length} {getTranslatedTextByCode( 'CartItemsLabel' )}
                        </div>
                        <div class="cart-total-price">
                            {getTranslatedTextByCode( 'CartTotalLabel' )}: {currency}{getPriceCurrency( $cart.info.totalPriceCart )}
                        </div>
                        <div class="cart-production-time">
                            <div class="cart-production-time-label">
                                {getTranslatedTextByCode( 'ProductionTimeLabel' )} :
                                {#if $cart.info.productionTime == 1}
                                    {$cart.info.productionTime} {getTranslatedTextByCode( 'CartDayLabel' )}
                                {:else}
                                    {$cart.info.productionTime} {getTranslatedTextByCode( 'CartDaysLabel' )}
                                {/if}
                            </div>
                        </div>
                    </div>
                    <a class="cart-checkout" href="/checkout">
                        <div class="cart-checkout-label">
                            {getTranslatedTextByCode( 'CheckoutLabel' )}
                        </div>
                    </a>
                </div>
                <div class="cart-items">
                    {#each $cart.services as itemCart}
                        <ServiceDetailsCard data={itemCart} refresh={restartComponents}/>
                    {/each}
                </div>
                <div class="cart-urgency">
                    <div class="cart-urgency-label">
                        {getTranslatedTextByCode( 'UrgencyLabel' )}
                    </div>
                    <Switch name="urgency" value={$cart.info.urgency} on:change={isUrgency}/>
                </div>
                <a class="cart-checkout mobile" href="/checkout">
                    <div class="cart-checkout-label">
                        {getTranslatedTextByCode( 'CheckoutLabel' )}
                    </div>
                </a>
            {/if}
        </div>
    </div>
{/key}

<style type="text/scss">
    .cart
    {
        padding: 2rem;
        @media( min-width: 65em )
        {
            padding: 4rem;
        }
    }

    .cart-info
    {
        @media( min-width: 65em )
        {
            display: flex;
            justify-content: space-between;
        }
    }

    .cart-checkout
    {
        padding: 1.25rem 3.5rem;

        display: none;

        background-color: var( --blue-color );

        text-align: center;
        @media( min-width: 65em )
        {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    .cart-checkout.mobile
    {
        display: block;
        @media( min-width: 65em )
        {
            display: none;
        }
    }

    .cart-items
    {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;

        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        @media( min-width: 65em )
        {
            grid-template-columns: 1fr 1fr;
        }
    }

    .cart-urgency
    {
        margin-bottom: 1rem;
        border-top: 0.063rem solid var( --line-color );
        border-bottom: 0.063rem solid var( --line-color );
        padding: 1.25rem 0;

        display: flex;
        justify-content: space-between;
    }
</style>
