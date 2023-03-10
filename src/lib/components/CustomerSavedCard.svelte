<script>
    import { invalidateAll } from '$app/navigation';
    import { getTranslatedText, getTranslatedTextByCode } from 'senselogic-gist';
    import { getPriceCurrency, getCurrencySymbol } from '$lib/currency';
    import { multiply, sum, subtract, createNewObject } from '$lib/service';
    import { cart, StoreCart } from '$lib/cart';
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
    import CartIcon from '$lib/components/icon/Cart.svelte';
    import DeleteIcon from '$lib/components/icon/Delete.svelte';

    export let serviceData;

    let currency = getCurrencySymbol();
    let quantity = 1;
    let serviceId = serviceData.info.id;
    let unitTime = serviceData.info.unitTime;
    let totalTime = unitTime * quantity;
    let unitPrice = createNewObject( serviceData.info.unitPrice );
    let totalPrice = multiply( unitPrice, quantity );
    let isOpen = true;
    let cartItemQuantity = 0;
    let cartItemUnitPrice = '';
    let cartItemTotalPrice = '';
    let cartItemTotalTime = 0;

    for ( let cartService of $cart.services )
    {
        if ( serviceData.info.id == cartService.serviceId )
        {
            cartItemQuantity = cartService.quantity;
            cartItemTotalPrice = cartService.totalPrice;
            cartItemTotalTime = cartService.totalTime;
        }
    }

    const addToCart = () => {

        $cart.info.isOpen = isOpen;

        if ( serviceData.info.hasPrice )
        {
            unitPrice = createNewObject( serviceData.info.unitPrice );
        }
        else
        {
            unitPrice = {'dollar': 0, 'euro': 0};
        }

        let previousTotalPrice = {'dollar': 0, 'euro': 0};
        let previousTotalTime = 0;

        cartItemTotalPrice = '';
        cartItemTotalTime = 0;

        if ( serviceData.info.id != serviceId )
        {
            serviceId = serviceData.info.id;
            cartItemQuantity = 0;
        }
        else
        {
            cartItemQuantity = cartItemQuantity;
        }

        cartItemQuantity = cartItemQuantity + quantity;

        if ( serviceData.info.hasPrice )
        {
            cartItemUnitPrice = createNewObject( serviceData.info.unitPrice );
        }
        else
        {
            cartItemUnitPrice = unitPrice;
        }

        cartItemTotalPrice = multiply( unitPrice, cartItemQuantity );

        cartItemTotalTime = ( unitTime * cartItemQuantity );

        let itemCartService = {
            'title' : serviceData.info.title,
            'imagePath' : serviceData.info.imagePath,
            'serviceId' : serviceData.info.id,
            'serviceSlug' : serviceData.info.slug,
            'description' : serviceData.info.description,
            'unitPrice' : cartItemUnitPrice,
            'unitTime' : serviceData.info.unitTime,
            'quantity' : cartItemQuantity,
            'totalPrice' : cartItemTotalPrice,
            'totalTime' : cartItemTotalTime,
            'hasPrice' : serviceData.info.hasPrice
        }

        if ( $cart.services.length > 0 ){

            var isServiceInCart = $cart.services.some( function( element ) {
                return ( element.serviceId === serviceData.info.id );
            } );

            if ( isServiceInCart )
            {
                for ( let cartService of $cart.services )
                {
                    if ( serviceData.info.id == cartService.serviceId )
                    {
                        previousTotalPrice = cartService.totalPrice;
                        previousTotalTime = cartService.totalTime;

                        cartItemTotalPrice = multiply( unitPrice, cartItemQuantity );
                        cartItemTotalTime = ( unitTime * cartItemQuantity );

                        cartService.title = serviceData.info.title;
                        cartService.description = serviceData.info.description;
                        cartService.imagePath = serviceData.info.imagePath;
                        cartService.unitPrice = createNewObject( serviceData.info.unitPrice );
                        cartService.unitTime = serviceData.info.unitTime;

                        cartService.quantity = cartItemQuantity;
                        cartService.totalPrice = cartItemTotalPrice;
                        cartService.totalTime = cartItemTotalTime;
                        cartService.hasPrice = serviceData.info.hasPrice;
                    }
                }
            }
            else{
                $cart.services.push( itemCartService );
            }
        }
        else{
            $cart.services.push( itemCartService );
        }

        if ( $cart.info.totalPriceCart != null )
        {
            $cart.info.totalPriceCart = sum( ( subtract( $cart.info.totalPriceCart, previousTotalPrice ) ), ( cartItemTotalPrice ));
        }
        else
        {
            $cart.info.totalPriceCart = cartItemTotalPrice;
        }

        if ( $cart.info.productionTime != null )
        {
            $cart.info.productionTime = ( parseFloat( $cart.info.productionTime ) - previousTotalTime ) + parseFloat( cartItemTotalTime );
        }
        else
        {
            $cart.info.productionTime = cartItemTotalTime;
        }

        StoreCart( $cart, $page.data.user );
    }
</script>

<div class="saved-card">
    <div class="saved-card-image-controler-cart">
        <img src="{serviceData.info.imagePath}" alt="">
        <button class="saved-controler-cart" on:click={() => addToCart()}>
            <div class="saved-controler-cart-image">
                <CartIcon data="bright"/>
            </div>
            <div class="saved-controler-cart-label saved-cart-label" >
                {getTranslatedTextByCode( 'MoveToCartButton' )}
            </div>
        </button>
    </div>
    <div class="saved-info">
        <div class="saved-info-container">
            <a class="saved-card-title" href="/service/{serviceData.info.slug}">
                {serviceData.info.title}
            </a>
            <div class="saved-card-description">
                {getTranslatedText( serviceData.info.description )}
            </div>
        </div>
        <div class="saved-card-category-price">
            <div class="saved-card-category">
                <div class="saved-card-category-label">
                    {getTranslatedTextByCode( 'CategoryLabel' )}
                </div>
                <div class="saved-card-category-unit">
                    {getTranslatedText( serviceData.category.title )}
                </div>
            </div>
            <div class="saved-card-unit-price">
                <div class="saved-card-unit-price-label">
                    {getTranslatedTextByCode( 'UnitPriceLabel' )}
                </div>
                <div class="saved-card-unit-price-value">
                    {currency}{getPriceCurrency( serviceData.info.unitPrice )}
                </div>
            </div>
        </div>
    </div>
    <div class="saved-delete">
        <form
            method="POST"
            action="/service/{serviceData.info.slug}?/deleteSave"
            use:enhance={() => {
                return ( { result, update } ) => {
                    invalidateAll();

                    if ( result.type === 'error' ) update();
                };
            }}
        >
            <button>
                <DeleteIcon/>
            </button>
        </form>
    </div>
</div>

<style type="text/scss">
    .saved-card
    {
        position: relative;

        padding: 1.5rem;

        display: flex;
        gap: 1.5rem;

        background-color: var( --white-color );
    }

    .saved-card-image-controler-cart
    {
        display: flex;
        flex-direction: column;
        flex-basis: 40%;
        gap: 1rem;
    }

    .saved-card-image-controler-cart img
    {
        position: relative;

        width: 100%;

        display: inline-block;
        object-fit: cover;
        object-position: 50% 50%;
    }

    .saved-controler-cart
    {
        width: 100%;
        padding: 1rem;

        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;

        background-color: var( --blue-color );

        cursor: pointer;
    }

    .saved-controler-cart-label
    {
        display: none;
        @media( min-width: 50em )
        {
            display: block;
        }
    }

    .saved-info
    {
        display: flex;
        flex-direction: column;
        flex-basis: 60%;
        justify-content: space-between;

        text-align: left;
    }

    .saved-info-container
    {
        padding-bottom: 1rem;
    }

    .saved-card-title
    {
        width: calc( 100% - 2rem );

        display: block;
    }

    .saved-card-category-price
    {
        border-top: 0.063rem solid var( --line-color );
        padding: 1.25rem 0;

        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .saved-card-category
    {
        text-align: left;
    }

    .saved-delete
    {
        position: absolute;
        right: 1.5rem;
    }

    .saved-delete button
    {
        background-color: unset;
    }
</style>
