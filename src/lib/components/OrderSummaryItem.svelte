<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { getPriceCurrency, getCurrencySymbol } from '$lib/currency';
    import { multiply, sum, subtract } from '$lib/service';
    import { slide } from 'svelte/transition';
    import { cart , StoreCart } from '$lib/cart';
    import { page } from '$app/stores';
    import ChevronIcon from '$lib/components/icon/Chevron.svelte';

    export let item;
    export let refresh = () => {}

    let currency = getCurrencySymbol();
    let isOpen = true;
    const toggle = () => isOpen = !isOpen;

    const increase = () => {
        item.quantity = item.quantity + 1;
        var quantitySelectValue = item.quantity;

        for ( let cartService of $cart.services )
        {
            if ( item.serviceId == cartService.serviceId )
            {
                let previousPrice = item.totalPrice;

                cartService.totalPrice = multiply( item.unitPrice, quantitySelectValue );
                item.totalPrice = multiply( item.unitPrice, quantitySelectValue );

                $cart.info.totalPriceCart = sum( ( subtract( $cart.info.totalPriceCart, previousPrice ) ), ( item.totalPrice ));

                let previousTotalTime = item.totalTime;

                item.totalTime = ( item.unitTime * quantitySelectValue );
                $cart.info.productionTime = ( parseFloat( $cart.info.productionTime ) - previousTotalTime ) + parseFloat( item.totalTime );
            }
        }

        StoreCart( $cart, $page.data.user );
        }

    const decrease = () => {

        if ( item.quantity > 1 )
        {
            item.quantity -= 1
        }

        var quantitySelectValue = item.quantity;

        for ( let cartService of $cart.services )
        {
            if ( item.serviceId == cartService.serviceId )
            {
                let previousPrice = item.totalPrice;

                cartService.totalPrice = multiply( item.unitPrice, quantitySelectValue );
                item.totalPrice = multiply( item.unitPrice, quantitySelectValue );

                $cart.info.totalPriceCart = sum( ( subtract( $cart.info.totalPriceCart, previousPrice ) ), ( item.totalPrice ));

                let previousTotalTime = item.totalTime;

                item.totalTime = ( item.unitTime * quantitySelectValue );
                $cart.info.productionTime = ( parseFloat( $cart.info.productionTime ) - previousTotalTime ) + parseFloat( item.totalTime );
            }
        }

        StoreCart( $cart, $page.data.user );
        }

    function clearOption( event ){
        const index = event.target.value;

        for ( let cartService of $cart.services )
        {
            if ( item.serviceId == cartService.serviceId )
            {
                cartService.options.splice( index, 1 );
            }
        }

        StoreCart( $cart, $page.data.user );
        refresh();
    }
</script>

<div class="order-summary-item">
    {#if item.hasPrice}
        <div class="order-summary-item-button">
            <button on:click={toggle} aria-expanded={isOpen}>
                <div class="order-summary-item-button-title order-summary-item-title">
                    {item.title}
                </div>
                <div class="order-summary-item-button-arrow">
                    <ChevronIcon data="dark bottom"/>
                </div>
            </button>
        </div>
        <div class="order-summary-item-container">
            {#if isOpen}
                <div class="order-summary-item-container-inner" transition:slide={{ duration: 300 }}>
                    {#if item.options}
                        {#each item.options as option, index}
                            <div class="order-summary-item-option">
                                <div class="order-summary-item-option-value">
                                    {option.value}
                                </div>
                                <button class="order-summary-item-option-clear order-summary-clear" on:click={clearOption} value={index}>
                                    {getTranslatedTextByCode( 'ClearLabel' )}
                                </button>
                            </div>
                        {/each}
                    {/if}
                    <div class="order-summary-item-quantity">
                        <div class="order-summary-item-info-quantity-price">
                            <div class="order-summary-item-info-quantity-price-label quantity-label-dark">
                                {getTranslatedTextByCode( 'UnitPriceLabel' )}
                            </div>
                            <div class="order-summary-item-info-quantity-price-unit quantity-value-dark">
                                {currency}{getPriceCurrency( item.unitPrice )}
                            </div>
                        </div>
                        <div class="order-summary-item-info-quantity-inner">
                            <div class="order-summary-item-info-quantity-inner-label quantity-label-dark">
                                {getTranslatedTextByCode( 'QuantityLabel' )}
                            </div>
                            <div class="order-summary-item-info-quantity-inner-toggle">
                                <button class="order-summary-item-info-quantity-inner-toggle-decrease" on:click={decrease}>
                                    <ChevronIcon data="dark left"/>
                                </button>
                                <div class="order-summary-item-info-quantity-inner-toggle-value quantity-value-dark">
                                    {item.quantity}
                                </div>
                                <button class="order-summary-item-info-quantity-inner-toggle-increase" on:click={increase}>
                                    <ChevronIcon data="dark right"/>
                                </button>
                            </div>
                        </div>
                        <div class="order-summary-item-info-quantity-total">
                            <div class="order-summary-item-info-quantity-total-label quantity-label-dark">
                                {getTranslatedTextByCode( 'TotalLabel' )}
                            </div>
                            <div class="order-summary-item-info-quantity-total-price quantity-value-dark">
                                {currency}{getPriceCurrency( item.totalPrice )}
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    {:else}
        <div class="order-summary-item-button">
            <button on:click={toggle} aria-expanded={isOpen}>
                <div class="order-summary-item-button-title order-summary-item-title">
                    {item.title}
                </div>
                <div class="order-summary-item-button-arrow">
                    <ChevronIcon data="dark bottom"/>
                </div>
            </button>
        </div>
        <div class="order-summary-item-container">
            {#if isOpen}
                <div class="order-summary-item-container-inner" transition:slide={{ duration: 300 }}>
                    {#if item.options}
                        {#each item.options as option, index}
                            <div class="order-summary-item-option">
                                <div class="order-summary-item-option-value">
                                    {option.value}
                                </div>
                                <button class="order-summary-item-option-clear order-summary-clear"  on:click={clearOption} value={index}>
                                    {getTranslatedTextByCode( 'ClearLabel' )}
                                </button>
                            </div>
                        {/each}
                    {/if}
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    .order-summary-item
    {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    .order-summary-item-button button
    {
        width: 100%;

        display: flex;
        justify-content: space-between;

        background: unset;
    }

    .order-summary-item-button .order-summary-item-button-arrow
    {
        transition: transform 0.2s ease-in;
    }

    .order-summary-item-button [aria-expanded=true] .order-summary-item-button-arrow
    {
        transform: rotate(0.25turn);
    }

    .order-summary-item-option
    {
        border-bottom: 0.063rem solid var( --line-color );
        padding: 1.25rem 0;

        display: flex;
        justify-content: space-between;
    }

    .order-summary-item-option-clear
    {
        background-color: unset;
    }

    .order-summary-item-info-quantity-inner
    {
        text-align: center;
    }

    .order-summary-item-quantity
    {
        padding: 0.75rem 0;

        display: flex;
        justify-content: space-between;
    }

    .order-summary-item-info-quantity-inner-toggle
    {
        display: flex;
        gap: 1rem;
    }
    .order-summary-item-info-quantity-inner-toggle-decrease
    {
        background-color: unset;
    }

    .order-summary-item-info-quantity-inner-toggle-increase
    {
        background-color: unset;
    }
</style>
