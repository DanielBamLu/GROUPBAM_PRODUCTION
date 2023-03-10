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

    function clearOption( event ){
        const index = event.target.value;

        for ( let cartService of $cart.services )
        {
            if ( data.serviceId == cartService.serviceId )
            {
                cartService.options.splice( index, 1 );
            }
        }

        StoreCart( $cart, $page.data.user );
        refresh();
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

<div class="service-details-card">
    <a class="service-details-card-image" href="/service/{data.serviceSlug}">
        <img src="{data.imagePath}" alt="">
    </a>
    <div class="service-details-card-info">
        <div class="service-details-card-info-container">
            <a class="service-details-card-title" href="/service/{data.serviceSlug}">
                {data.title}
            </a>
            <div class="service-details-card-description">
                {getTranslatedText( data.description )}
            </div>
            {#if data.options}
                {#each data.options as option, index}
                    <div class="service-details-card-item-option">
                        <div class="service-details-card-item-option-value">
                            {option.value}
                        </div>
                        <button class="service-details-card-item-option-clear service-details-card-clear" on:click={clearOption} value={index}>
                            {getTranslatedTextByCode( 'ClearLabel' )}
                        </button>
                    </div>
                {/each}
            {/if}
        </div>
        {#if data.hasPrice}
            <div class="service-details-card-quantity">
                <div class="service-details-card-quantity-price">
                    <div class="service-details-card-quantity-price-label quantity-label-dark">
                        {getTranslatedTextByCode( 'UnitPriceLabel' )}
                    </div>
                    <div class="service-details-card-quantity-price-unit quantity-value-dark">
                        {currency}{getPriceCurrency( data.unitPrice )}
                    </div>
                </div>
                <div class="service-details-card-quantity-inner">
                    <div class="service-details-card-quantity-inner-label quantity-label-dark">
                        {getTranslatedTextByCode( 'QuantityLabel' )}
                    </div>
                    <div class="service-details-card-quantity-inner-quantity">
                        <button class="service-details-card-quantity-decrease" on:click={decrease}>
                            <ChevronIcon data="dark left"/>
                        </button>
                        <div class="service-details-card-quantity-value quantity-value-dark">
                            {data.quantity}
                        </div>
                        <button class="service-details-card-quantity-increase" on:click={increase}>
                            <ChevronIcon data="dark right"/>
                        </button>
                    </div>
                </div>
                <div class="service-details-card-quantity-total">
                    <div class="service-details-card-quantity-total-label quantity-label-dark">
                        {getTranslatedTextByCode( 'TotalLabel' )}
                    </div>
                    <div class="service-details-card-quantity-total-price quantity-value-dark">
                        {currency}{getPriceCurrency( data.totalPrice )}
                    </div>
                </div>
            </div>
        {/if}
    </div>
    <button class="service-details-card-delete" on:click={deleteItem}>
        <DeleteIcon/>
    </button>
</div>

<style>
    .service-details-card-delete
    {
        border-left: 0.063rem solid var( --line-color );
        padding-left: 1.5rem;

        display: flex;
        align-items: center;

        background: unset;
    }
</style>
