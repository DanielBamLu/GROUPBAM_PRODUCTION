<script>
    import { getTranslatedText, getTranslatedTextByCode } from 'senselogic-gist';
    import { getPriceCurrency, getCurrencySymbol } from '$lib/currency';
    import { multiply, sum, subtract } from '$lib/service';
    import { cart, StoreCart } from '$lib/cart';
    import { page } from '$app/stores';
    import ChevronIcon from '$lib/components/icon/Chevron.svelte';
    import DeleteIcon from '$lib/components/icon/Delete.svelte';

    export let data;

    export let refresh = () => {}

    let currency = getCurrencySymbol();

    const clearOptionRadioButton = () => {

        for ( let cartService of $cart.services )
        {
            if ( data.serviceId == cartService.serviceId )
            {
                cartService.optionRadioButton = '';
                refresh();
            }
        }

        StoreCart( $cart, $page.data.user );
        }

    const clearOptionTwoInpunts = () => {

        for ( let cartService of $cart.services )
        {
            if ( data.serviceId == cartService.serviceId )
            {
                cartService.optionTwoInputs = '';
                refresh();
            }
        }

        StoreCart( $cart, $page.data.user );
        }

    const increase = () => {
        data.quantity = data.quantity + 1;
        var quantitySelectValue = data.quantity;

        for ( let cartService of $cart.services )
        {
            if ( data.serviceId == cartService.serviceId )
            {
                let previousPrice = data.totalPrice;

                cartService.totalPrice = multiply( data.unitPrice, quantitySelectValue );
                data.totalPrice = multiply( data.unitPrice, quantitySelectValue );

                $cart.info.totalPriceCart = sum( ( subtract( $cart.info.totalPriceCart, previousPrice ) ), ( data.totalPrice ));

                let previousTotalTime = data.totalTime;

                data.totalTime = ( data.unitTime * quantitySelectValue );
                $cart.info.productionTime = ( parseFloat( $cart.info.productionTime ) - previousTotalTime ) + parseFloat( data.totalTime );
            }
        }

        StoreCart( $cart, $page.data.user );
        }

    const decrease = () => {

        if ( data.quantity > 1 )
        {
            data.quantity -= 1
        }

        var quantitySelectValue = data.quantity;

        for ( let cartService of $cart.services )
        {
            if ( data.serviceId == cartService.serviceId )
            {
                let previousPrice = data.totalPrice;

                cartService.totalPrice = multiply( data.unitPrice, quantitySelectValue );
                data.totalPrice = multiply( data.unitPrice, quantitySelectValue );

                $cart.info.totalPriceCart = sum( ( subtract( $cart.info.totalPriceCart, previousPrice ) ), ( data.totalPrice ));

                let previousTotalTime = data.totalTime;

                data.totalTime = ( data.unitTime * quantitySelectValue );
                $cart.info.productionTime = ( parseFloat( $cart.info.productionTime ) - previousTotalTime ) + parseFloat( data.totalTime );
            }
        }

        StoreCart( $cart, $page.data.user );
        }

    const deleteItem = () => {

        for ( let cartIndex = 0; cartIndex < $cart.services.length; ++cartIndex )
        {
            if ( data.serviceId == $cart.services[cartIndex].serviceId )
            {
                $cart.info.totalPriceCart = subtract( $cart.info.totalPriceCart, $cart.services[ cartIndex ].totalPrice )
                $cart.info.productionTime = parseFloat( $cart.info.productionTime ) - $cart.services[ cartIndex ].totalTime;

                $cart.services.splice( cartIndex, 1 );
                refresh();
            }
        }

        if ( $cart.services.length <= 0)
        {
            $cart.info.isOpen = false;
        }

        StoreCart( $cart, $page.data.user );
        }
</script>

<div class="cart-card">
    <a class="cart-card-image" href="/service/{data.serviceSlug}">
        <img src="{data.imagePath}" alt="">
    </a>
    <div class="cart-info">
        <div class="cart-info-container">
            <a class="cart-card-title" href="/service/{data.serviceSlug}">
                {data.title}
            </a>
            <div class="cart-card-description">
                {getTranslatedText(data.description)}
            </div>
            {#if data.optionRadioButton}
                <div class="cart-item-option">
                    <div class="cart-item-option-value">
                        {data.optionRadioButton}
                    </div>
                    <button class="cart-item-option-clear cart-clear" on:click|preventDefault={clearOptionRadioButton}>
                        {getTranslatedTextByCode( 'ClearLabel' )}
                    </button>
                </div>
            {/if}
            {#if data.optionTwoInputs}
                <div class="cart-item-option">
                    <div class="cart-item-option-value">
                        {data.optionTwoInputs}
                    </div>
                    <button class="cart-item-option-clear cart-clear" on:click|preventDefault={clearOptionTwoInpunts}>
                        {getTranslatedTextByCode( 'ClearLabel' )}
                    </button>
                </div>
            {/if}
        </div>
        {#if data.hasPrice}
            <div class="cart-card-quantity">
                <div class="cart-card-quantity-price">
                    <div class="cart-card-quantity-price-label quantity-label-dark">
                        {getTranslatedTextByCode( 'UnitPriceLabel' )}
                    </div>
                    <div class="cart-card-quantity-price-unit quantity-value-dark">
                        {currency}{getPriceCurrency( data.unitPrice )}
                    </div>
                </div>
                <div class="cart-card-quantity-inner">
                    <div class="cart-card-quantity-inner-label quantity-label-dark">
                        {getTranslatedTextByCode( 'QuantityLabel' )}
                    </div>
                    <div class="cart-card-quantity-inner-quantity">
                        <button class="cart-card-quantity-decrease" on:click={decrease}>
                            <ChevronIcon data="dark left"/>
                        </button>
                        <div class="cart-card-quantity-value quantity-value-dark">
                            {data.quantity}
                        </div>
                        <button class="cart-card-quantity-increase" on:click={increase}>
                            <ChevronIcon data="dark right"/>
                        </button>
                    </div>
                </div>
                <div class="cart-card-quantity-total">
                    <div class="cart-card-quantity-total-label quantity-label-dark">
                        {getTranslatedTextByCode( 'TotalLabel' )}
                    </div>
                    <div class="cart-card-quantity-total-price quantity-value-dark">
                        {currency}{getPriceCurrency( data.totalPrice )}
                    </div>
                </div>
            </div>
        {/if}
    </div>
    <button class="cart-delete" on:click={deleteItem}>
        <DeleteIcon/>
    </button>
</div>

<style type="text/scss">

    .cart-info
    {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }
    
    .cart-card
    {
        position: relative;

        padding: 1.5rem;

        display: flex;
        gap: 1.5rem;

        background-color: var( --white-color );
    }

    .cart-delete
    {
        position: absolute;
        right: 1.5rem;

        background: unset;
    }
</style>
