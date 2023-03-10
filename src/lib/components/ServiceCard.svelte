<script>
    import { onMount } from "svelte";
    import { getTranslatedText, getTranslatedTextByCode } from 'senselogic-gist';
    import { getPriceCurrency, getCurrencySymbol } from '$lib/currency';
    import { multiply, sum, subtract, createNewObject } from '$lib/service';
    import { cart, StoreCart } from '$lib/cart';
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
    import { containerClasses } from '$lib/containerClasses.js';
    import SavedIcon from '$lib/components/icon/Saved.svelte';
    import CartIcon from '$lib/components/icon/Cart.svelte';
    import ArrowLeftIcon from '$lib/components/icon/ArrowLeft.svelte';
    import ArrowRightIcon from '$lib/components/icon/ArrowRight.svelte';

    export let serviceData;

    const breakpoints = {
        500: ["sm"]
    };

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
            unitPrice = { 'dollar': 0, 'euro': 0 };
        }

        let previousTotalPrice = { 'dollar': 0, 'euro': 0 };
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

            if (isServiceInCart)
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

        if ($cart.info.totalPriceCart != null)
        {
            $cart.info.totalPriceCart = sum( ( subtract( $cart.info.totalPriceCart, previousTotalPrice ) ), ( cartItemTotalPrice ));
        }
        else
        {
            $cart.info.totalPriceCart = cartItemTotalPrice;
        }

        if ($cart.info.productionTime != null)
        {
            $cart.info.productionTime = ( parseFloat( $cart.info.productionTime ) - previousTotalTime ) + parseFloat( cartItemTotalTime );
        }
        else
        {
            $cart.info.productionTime = cartItemTotalTime;
        }
        StoreCart( $cart, $page.data.user );
    }

    let carouselComponent;
    let carousel;
    let counter = 1;
    let total = serviceData.images.length;

    let isGallery;

    if ( total <= 0 )
    {
        isGallery = 'no-gallery';
    }

    onMount( async () => {
        const module = await import( 'svelte-carousel' );
        carouselComponent = module.default;
        } );

    const goToPrevPage = () => {
        carousel.goToPrev( { animated: false } )
    }

    const goToNextPage = () => {
        carousel.goToNext( { animated: false } )
    }

    function onChange( index ) {
        counter = index + 1;
    }
</script>

<div class="service-card">
    {#if serviceData.images.length > 0}
        <div class="service-card-image">
            <svelte:component
                bind:this={carousel}
                on:pageChange={ event => onChange( event.detail )}
                this={carouselComponent}
                dots = {false}
                arrows = {false}
                >
                {#each serviceData.images as image}
                    <img src="{image.imagePath}" alt="">
                {/each}
            </svelte:component>
        </div>
    {:else}
        <div class="service-card-image">
            <img src="{serviceData.info.imagePath}" alt="">
        </div>
    {/if}
    <div class="service-card-controler {isGallery}" use:containerClasses={breakpoints}>
        {#if serviceData.images.length > 0}
            <div class="service-card-controler-carousel-control">
                <button class="left" on:click={goToPrevPage}>
                    <ArrowLeftIcon data="bright"/>
                </button>
                <div class="counter service-card-counter">
                    {counter} / {total}
                </div>
                <button class="right" on:click={goToNextPage}>
                    <span class="control right-control">
                        <ArrowRightIcon data="bright"/>
                    </span>
                </button>
            </div>
        {/if}
        <div class="service-card-controler-actions">
            {#if $page.data.user}
                <form
                    class="service-card-controler-save"
                    method="POST"
                    action="/service/{serviceData.info.slug}?/toggleSave"
                    use:enhance={() => {

                        if ( serviceData.isSaved )
                        {
                            serviceData.isSaved = false;;
                        }
                        else
                        {
                            serviceData.isSaved = true;
                        }

                        return ( { result, update } ) => {
                            if ( result.type === 'error' ) update();
                        };
                    }}
                >
                    <input hidden type="checkbox" name="saved" checked={serviceData.isSaved} />
                    <button>
                        {#if serviceData.isSaved}
                            <SavedIcon data="filled bright"/>
                        {:else}
                            <SavedIcon data="bright"/>
                        {/if}
                    </button>
                </form>
            {/if}
            <button class="service-card-controler-cart" style="background-color:{serviceData.company.color};" on:click={() => addToCart()}>
                <div class="service-card-controler-cart-image">
                    <CartIcon data="bright"/>
                </div>
                <div class="service-card-controler-cart-label service-card-cart-label" >
                    {getTranslatedTextByCode( 'AddToCartButton' )}
                </div>
            </button>
        </div>
    </div>
    <a class="service-card-info" href="/service/{serviceData.info.slug}">
        <div class="service-card-company service-card-company-name" style="color:{serviceData.company.color};">
            {serviceData.company.name}
        </div>
        <div class="service-card-name service-card-name">
            {serviceData.info.title}
        </div>
        <div class="service-card-description service-card-description">
            {getTranslatedText( serviceData.info.description )}
        </div>
        {#if serviceData.info.hasPrice }
            <div class="service-card-price">
                <div class="service-card-price service-card-price">
                    {currency}{getPriceCurrency( serviceData.info.unitPrice )}
                </div>
            </div>
        {/if}
    </a>
</div>

<style type="text/scss">
    .service-card
    {
        position: relative;

        min-width: 100%;

        display: block;

        background-color: var( --white-color );
    }

    .service-card-image img
    {
        height: 100%;
        width: 100%;
        aspect-ratio: 2;

        object-fit: cover;
        @media( min-width: 65em )
        {
            aspect-ratio: 1;
        }
    }

    .service-card-controler
    {
        height: 3rem;
        border-left: 0.063rem solid var( --black-color-400 );

        display: flex;
        justify-content: space-between;
        align-items: center;

        background-color: var( --black-color );
    }

    .service-card-controler.no-gallery
    {
        justify-content: flex-end;
    }

    .service-card-controler-carousel-control
    {
        height: 100%;

        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    .service-card-controler-carousel-control button
    {
        height: 100%;
        width: 3rem;

        background: unset;
        background-color: var( --black-color-400 );
    }

    .service-card-controler-actions
    {
        height: 100%;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .service-card-controler-save
    {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;

        height: 3rem;
        width: 3rem;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: rgba(10, 10, 10, 0.4);

        cursor: pointer;
        @media( min-width: 65em )
        {
            position: relative;
            top: unset;
            right: unset;

            background-color: var( --black-color-400 );
        }
    }

    .service-card-controler-save button
    {
        background-color: unset;
    }

    .service-card-controler-cart
    {
        height: 100%;
        width: 3.5rem;

        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;

        background-color: var( --blue-color );

        cursor: pointer;
        @media( min-width: 65em )
        {
            padding: 0 0.5rem;
        }

        @media( min-width: 120em )
        {
            width: max-content;
            padding: 0 1rem;
        }
    }

    :global(.sm) .service-card-controler-cart .service-card-cart-label {
        display: block !important;
    }
    .service-card-controler-cart .service-card-cart-label
    {
        display: none;
    }

    .service-card-info
    {
        height: -webkit-fill-available;
        padding: 1rem 1rem;

        display: block;
        @media( min-width: 65em )
        {
            padding: 2rem 1.5rem;
        }
    }

    .service-card-description
    {
        margin-bottom: 1.5rem;
    }

    .service-card-price
    {
        margin-right: auto;

        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }

    .service-card-price
    {
        margin-right: 1rem;
    }
</style>
