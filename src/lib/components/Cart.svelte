<script>
    import { Switch } from 'attractions';
    import { cart, StoreCart } from '$lib/cart';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import ServiceDetailsCard from '$lib/components/ServiceDetailsCard.svelte';

    export let closeModalCart = () => {}

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

    const gotoCart = () => {
        closeModalCart();
        goto( '/customer/cart' )
    }

    const gotoCheckout = () => {
        closeModalCart();
        goto( '/checkout' )
    }
</script>

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
                <div class="cart-production-time">
                    <div class="cart-production-time-label">
                        {getTranslatedTextByCode( 'ProductionTimeLabel' )}
                    </div>
                    <div class="cart-production-time-days">
                        {#if $cart.info.productionTime == 1}
                            {$cart.info.productionTime} {getTranslatedTextByCode( 'CartDayLabel' )}
                        {:else}
                            {$cart.info.productionTime} {getTranslatedTextByCode( 'CartDaysLabel' )}
                        {/if}
                    </div>
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
                <div class="cart-actions">
                    <button class="cart-view-cart" on:click={gotoCart}>
                        {getTranslatedTextByCode( 'ViewCartLabel' )}
                    </button>
                    <button class="cart-checkout" on:click={gotoCheckout}>
                        <div class="cart-checkout-label">
                            {getTranslatedTextByCode( 'CheckoutLabel' )}
                        </div>
                    </button>
                </div>
            {/if}
        </div>
    </div>
{/key}

<style type="text/scss">
    .cart
    {
        padding: 2rem;

        background-color: var( --white-color );

        text-align: center;
        @media( min-width: 65em )
        {
            min-width: 50rem;
            padding: 4rem;
        }
    }

    .cart-production-time
    {
        margin-top: 1.5rem;

        display: flex;
        justify-content: space-between;
    }

    .cart-items
    {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;

        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .cart-urgency
    {
        margin-bottom: 1rem;
        border-top: 0.063rem solid var( --line-color );
        padding: 1.25rem 0;

        display: flex;
        justify-content: space-between;
    }

    .cart-actions
    {
        display: flex;
        gap: 1.5rem;
    }

    .cart-checkout
    {
        padding: 1.25rem;

        flex: 1;

        background-color: var( --blue-color );
    }

    .cart-view-cart
    {
        padding: 1.25rem;

        flex: 1;

        background-color: var( --background-color );
    }
</style>
