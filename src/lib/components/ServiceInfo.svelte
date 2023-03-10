<script>
    import { getTranslatedText, getTranslatedTextByCode } from 'senselogic-gist';
    import { getPriceCurrency, getCurrencySymbol } from '$lib/currency';
    import { multiply, sum, subtract, createNewObject } from '$lib/service';
    import { cart, StoreCart } from '$lib/cart';
    import { review } from '$lib/review';
    import { beforeUpdate } from 'svelte';
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
    import ChevronIcon from '$lib/components/icon/Chevron.svelte';
    import DotIcon from '$lib/components/icon/Dot.svelte';
    import StarIcon from '$lib/components/icon/Star.svelte';

    export let serviceData;
    export let serviceReviewData;

    let currency = getCurrencySymbol();
    let quantity = 1;
    let serviceId = serviceData.info.id;
    let unitPrice = createNewObject( serviceData.info.unitPrice );
    let totalPrice = multiply( unitPrice, quantity );
    let unitTime = serviceData.info.unitTime;
    let totalTime = unitTime * quantity;
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

    beforeUpdate( () => {

        reviewInfo = review( serviceReviewData );

        if ( serviceData.info.id != serviceId )
        {
            quantity = 1;
        }

        unitPrice = createNewObject( serviceData.info.unitPrice );
        unitTime = serviceData.info.unitTime;

        totalPrice = multiply( unitPrice, quantity )
        totalTime = unitTime * quantity;
    } );

    const increase = () => {
        quantity = quantity + 1;

        totalPrice = multiply( unitPrice, quantity );

        totalTime = ( unitTime * quantity );
        }

    const decrease = () => {

        if ( quantity > 1 )
        {
            quantity -= 1
        }

        totalPrice = multiply( unitPrice, quantity )

        totalTime = ( unitTime * quantity );
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

        let reviewInfo = review( serviceReviewData );
</script>

<div class="service-info">
    <div class="service-info-title-description-review">
        <div class="service-info-title service-title">
            {serviceData.info.title}
        </div>
        <div class="service-info-description service-description">
            { getTranslatedText( serviceData.info.description) }
        </div>
        {#if reviewInfo.reviewCount != 0}
            <div class="service-info-average-review">
                <div class="service-info-average-review-average-stars">
                    {#each {length: reviewInfo.numberStarsEnable} as _, i}
                        <StarIcon data="yellow"/>
                    {/each}
                    {#each {length: reviewInfo.numberStarsDisable} as _, i}
                        <StarIcon data="gray"/>
                    {/each}
                </div>
                <div class="service-info-average-review-average-separator service-review">
                    <DotIcon data="bright"/>
                </div>
                <div class="service-info-average-review-average service-review">
                    {reviewInfo.reviewAverage}
                </div>
                <div class="service-info-average-review-average-based service-review">
                    {reviewInfo.reviewCount}
                    {getTranslatedTextByCode( 'ReviewBasedOnReviewsText' )}
                </div>
            </div>
        {/if}
    </div>
    {#if serviceData.info.hasPrice }
        <div class="service-info-price service-price">
            {currency}{getPriceCurrency( unitPrice )}
        </div>
        <div class="service-info-quantity">
            <div class="service-info-quantity-price">
                <div class="service-info-quantity-price-label quantity-label-bright">
                    {getTranslatedTextByCode( 'UnitPriceLabel' )}
                </div>
                <div class="service-info-quantity-price-unit quantity-value-bright">
                    {currency}{getPriceCurrency( unitPrice )}
                </div>
            </div>
            <div class="service-info-quantity-inner">
                <div class="service-info-quantity-inner-label quantity-label-bright">
                    {getTranslatedTextByCode( 'QuantityLabel' )}
                </div>
                <div class="service-info-quantity-inner-toggle quantity-value-bright">
                    <button class="service-info-quantity-inner-toggle-decrease" on:click={decrease}>
                        <ChevronIcon data="bright left"/>
                    </button>
                    <div class="service-info-quantity-inner-toggle-value quantity-value-bright">
                        {quantity}
                    </div>
                    <button class="service-info-quantity-inner-toggle-increase" on:click={increase}>
                        <ChevronIcon data="bright right"/>
                    </button>
                </div>
            </div>
            <div class="service-info-quantity-total">
                <div class="service-info-quantity-total-label quantity-label-bright">
                    {getTranslatedTextByCode( 'TotalLabel' )}
                </div>
                <div class="service-info-quantity-total-price quantity-value-bright">
                    {currency}{getPriceCurrency( totalPrice )}
                </div>
            </div>
        </div>
    {/if}
    <div class="service-info-purchase">
        <button id="service-info-purchase-cart" class="service-info-purchase-cart service-cart-button" on:click={() => addToCart()}>
            {getTranslatedTextByCode( 'AddToCartButton' )}
        </button>
        {#if $page.data.user}
            <form
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
                <button class="service-info-purchase-save service-save-button">
                    {#if serviceData.isSaved}
                        {getTranslatedTextByCode( 'SavedButton' )}
                    {:else}
                        {getTranslatedTextByCode( 'SaveButton' )}
                    {/if}
                </button>
            </form>
        {/if}
    </div>
</div>

<style type="text/scss">
    .service-info
    {
        margin-bottom: 3rem;
        padding: 2rem;
        @media( min-width: 65em )
        {
            margin-bottom: unset;
            min-width: 20rem;
            padding: 3rem;
        }

        @media( min-width: 90em )
        {
            min-width: 30rem;

            flex-basis: 30%;
        }
    }

    .service-info-title-description-review
    {
        border-bottom: 1px solid var( --line-color );
    }

    .service-info-title
    {
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
    }

    .service-info-description
    {
        margin-bottom: 1.625rem;
    }

    .service-info-average-review
    {
        margin-bottom: 1.5rem;

        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
    }

    .service-info-average-review-average-stars
    {
        display: flex;
        gap: 0.375rem;
        align-items: center;
    }

    .service-info-price
    {
        border-bottom: 1px solid var( --line-color );
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
    }

    .service-info-quantity
    {
        border-bottom: 1px solid var( --line-color );
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;

        display: flex;
        justify-content: space-between;
    }

    .service-info-quantity-inner
    {
        text-align: center;
    }

    .service-info-quantity-inner-toggle
    {
        display: flex;
        gap: 1rem;
    }
    .service-info-quantity-inner-toggle-decrease
    {
        background-color: unset;
    }

    .service-info-quantity-inner-toggle-increase
    {
        background-color: unset;
    }
    .service-info-quantity-total
    {
        text-align: right;
    }

    .service-info-purchase
    {
        margin-top: 3rem;
    }

    .service-info-purchase .service-info-purchase-cart
    {
        margin-bottom: 0.5rem;
        width: 100%;
        padding: 1rem 2rem;

        text-align: center;

        cursor: pointer;
    }

    .service-info-purchase .service-info-purchase-save
    {
        width: 100%;
        padding: 1rem 2rem;

        text-align: center;

        cursor: pointer;
    }
</style>
