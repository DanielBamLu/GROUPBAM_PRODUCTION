<script>
    import { onMount } from "svelte";
    import { cart } from '$lib/cart';
    import Back from '$lib/components/Back.svelte';
    import ArrowLeftIcon from '$lib/components/icon/ArrowLeft.svelte';
    import ArrowRightIcon from '$lib/components/icon/ArrowRight.svelte';

    export let serviceImages;

    let carouselComponent;
    let ComponentsecondaryCarousel;
    let mainCarousel;
    let secondaryCarousel;

    let counter = 1;
    let total = serviceImages.length;

    let slidesToShow = 5;
    let slidesHidden = (total - slidesToShow);
    let minimumBorder = 1;
    let maximumBorder = (total - slidesHidden);

    onMount( async () => {
        const module = await import( 'svelte-carousel' );
        carouselComponent = module.default;
        ComponentsecondaryCarousel = module.default;
        } );

    const goToPrevPage = () => {
        mainCarousel.goToPrev( { animated: false } )
    }

    const goToNextPage = () => {
        mainCarousel.goToNext( { animated: false } )
    }

    function onChange( index ) {
        counter = index + 1;

        let currentIndex = (index + 1);

        if ( (currentIndex - maximumBorder) == 0 && maximumBorder != total )
        {
            minimumBorder++;
            maximumBorder++;
            secondaryCarousel.goToNext( { animated: true } )
        }

        if ( (currentIndex - minimumBorder) == 0 && minimumBorder != 1 )
        {
            minimumBorder--;
            maximumBorder--;
            secondaryCarousel.goToPrev( { animated: true } )
        }

        let elements = document.querySelector( '#service-gallery-items .sc-carousel__pages-container' ).children;

        for ( var elementIndex=0; elementIndex < elements.length; elementIndex++ ) {
            elements[elementIndex].classList.remove( 'active' );
        }

        elements[index].classList.add( 'active' );
    }

    const gallery = ( index ) => () => {
        mainCarousel.goTo( index.index, { animated: false } );

        let currentIndex = (index.index + 1);

        if ( (currentIndex - maximumBorder) == 0 && maximumBorder != total )
        {
            minimumBorder++;
            maximumBorder++;
            secondaryCarousel.goToNext( { animated: true } )
        }

        if ( (currentIndex - minimumBorder) == 0 && minimumBorder != 1 )
        {
            minimumBorder--;
            maximumBorder--;
            secondaryCarousel.goToPrev( { animated: true } )
        }
    }
</script>
<div class="service-gallery {$cart.info.isOpen}">
    <div class="service-gallery-container">
        <svelte:component
            bind:this={mainCarousel}
            on:pageChange={ event => onChange( event.detail )}
            this={carouselComponent}
            dots = {false}
            arrows = {false}
            swiping = {false}
            >
            {#each serviceImages as image}
                <img src="{image.imagePath}" alt="">
            {/each}
        </svelte:component>
    </div>
    <div class="service-gallery-controler">
        <Back/>
        {#if serviceImages.length > 0}
            <div class="service-gallery-controler-carousel-control">
                <button class="left" on:click={goToPrevPage}>
                    <ArrowLeftIcon data="bright"/>
                </button>
                <div class="counter service-gallery-counter">
                    {counter} / {total}
                </div>
                <button class="right" on:click={goToNextPage}>
                    <span class="control right-control">
                        <ArrowRightIcon data="bright"/>
                    </span>
                </button>
            </div>
        {/if}
    </div>
    <div id="service-gallery-items" class="service-gallery-items">
        <svelte:component
            bind:this={secondaryCarousel}
            this={ComponentsecondaryCarousel}
            dots = {false}
            arrows = {false}
            particlesToShow = {slidesToShow}
            infinite = {false}
            swiping = {false}
            >
            {#each serviceImages as image, index}
                {#if index == 0}
                    <button class="active" on:click={gallery({index})}>
                        <img src="{image.imagePath}" alt="">
                    </button>
                {:else}
                    <button class="" on:click={gallery({index})}>
                        <img src="{image.imagePath}" alt="">
                    </button>
                {/if}
            {/each}
        </svelte:component>
    </div>
</div>

<style type="text/scss">
    .service-gallery
    {
        overflow: hidden;
        height: calc( var( --viewport-height ) );
        width: 100%;
        @media( min-width: 65em )
        {
            height: 100%
        }
    }

    .service-gallery.true
    {
        height: calc( var( --viewport-height ) - 4rem );
        @media( min-width: 65em )
        {
            height: 100%
        }
    }

    .service-gallery-container
    {
        height: 80%;
        @media( min-width: 65em )
        {
            height: 70%;
        }
    }

    .service-gallery-container img
    {
        object-fit: cover;
        object-position: 50% 50%;
    }

    .service-gallery-items
    {
        height: calc( 20% - 4rem );
        @media( min-width: 65em )
        {
            height: calc( 30% - 4rem );
        }
    }

    .service-gallery-items .active img
    {
        opacity: 1;
    }
    .service-gallery-items button
    {
        padding: 0.063rem;

        background-color: var( --black-color );
    }

    .service-gallery-items button:first-child
    {
        padding-left: 0;
    }

    .service-gallery-items button:last-child
    {
        padding-right: 0;
    }

    .service-gallery-items img
    {
        height: 100%;
        width: 100%;

        object-fit: cover;
        object-position: 50% 50%;
        opacity: 0.5;
    }

    .service-gallery-controler
    {
        position: absolute;
        top: 4rem;

        margin: 0;
        height: 4rem;
        width: 100%;
        padding: 1rem;

        display: flex;
        justify-content: space-between;

        background-color: black;
        @media( min-width: 65em )
        {
            position: relative;
            top: 0;

            margin-right: 1.5rem;
        }
    }

    .service-gallery-controler button
    {
        background: unset;
    }

    .service-gallery-controler-carousel-control
    {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
</style>
