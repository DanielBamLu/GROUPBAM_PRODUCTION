<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { onMount } from "svelte";
    import CompanyCard from '$lib/components/CompanyCard.svelte';
    import ArrowLeftIcon from '$lib/components/icon/ArrowLeft.svelte';
    import ArrowRightIcon from '$lib/components/icon/ArrowRight.svelte';

    export let data;

    let carouselComponent;
    let carousel;

    let companySlug;
    companySlug = data.companyArray[ 0 ].slug;

    let companyColor;
    companyColor = data.companyArray[ 0 ].color;

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

    const goToStartPage = ( index ) => () => {
        carousel.goTo( index.index, { animated: false } );

        for ( let indexCompany = 0; indexCompany < data.companyArray.length; indexCompany++ ) {

            if ( index.index == indexCompany )
            {
                companySlug = data.companyArray[ indexCompany ].slug;
                companyColor = data.companyArray[ indexCompany ].color;
            }
        }
    }

    function onChange( index ) {
        let elements = document.getElementById( 'home-company-companies' ).children;

        for ( var elementIndex=0; elementIndex < elements.length; elementIndex++ ) {

            elements[elementIndex].classList.remove( 'active' );

            if ( index== elementIndex )
            {
                companySlug = data.companyArray[ elementIndex ].slug;
                companyColor = data.companyArray[ elementIndex ].color;
            }
        }

        elements[ index ].classList.add( 'active' );
    }
</script>

<div class="home-company">
    <div class="home-company-first">
        <div class="home-company-about" style="background-color:{companyColor};">
            <div class="home-company-about-container">
                <div class="home-company-about-label about-title">
                    {getTranslatedTextByCode( 'HomepageTitle' )}
                </div>
                <a class="home-company-about-button about-button-label" href="/about-us">
                    {getTranslatedTextByCode( 'AboutUsButton' )}
                </a>
            </div>
        </div>
        <div id="home-company-companies" class="home-company-companies">
            {#each data.companyArray as company, index}
                {#if index == 0}
                    <button class="home-company-companies-inner active" on:click={goToStartPage( {index} )}>
                        <img src="{company.iconPath}" alt="{company.name}">
                        <img src="{company.iconGrayPath}" alt="{company.name}">
                    </button>
                {:else}
                    <button class="home-company-companies-inner" on:click={goToStartPage( {index} )}>
                        <img src="{company.iconPath}" alt="{company.name}">
                        <img src="{company.iconGrayPath}" alt="{company.name}">
                    </button>
                {/if}

            {/each}
        </div>
    </div>
    <div class="home-company-second">
        <div class="home-company-carousel">
            <svelte:component
                bind:this={carousel}
                on:pageChange={ event => onChange( event.detail )}
                this={carouselComponent}
                dots = {false}
                arrows = {false}
                autoplay = {false}
                autoplayDuration = {5000}
                >
                {#each data.companyArray as company}
                    <CompanyCard companyData={company}>
                    </CompanyCard>
                {/each}
            </svelte:component>
        </div>
        <div class="home-company-controler">
            <a class="home-company-controler-link company-link" href="/company/{companySlug}" style="background-color:{companyColor};">
                {getTranslatedTextByCode( 'ViewServicesButton' )}
            </a>
            <div class="home-company-controler-carousel-control">
                <button class="left" on:click={goToPrevPage}>
                    <ArrowLeftIcon data="bright"/>
                </button>
                <button class="right" on:click={goToNextPage}>
                    <span class="control right-control">
                        <ArrowRightIcon data="bright"/>
                    </span>
                </button>
            </div>
        </div>
    </div>
</div>

<style type="text/scss">
    .home-company
    {
        display: flex;
        flex-direction: column-reverse;
        flex-wrap: wrap;
        @media( min-width: 65em )
        {
            height: calc( var( --viewport-height ) - 4rem );
            min-height: 30rem;
            max-height: 50rem;

            flex-direction: unset;
        }
    }

    .home-company-first
    {
        height: -webkit-fill-available;
        width: 100%;
        @media( min-width: 65em )
        {
            display: flex;
            flex: 1;
            flex-direction: column;
        }
    }

    .home-company-about
    {
        display: none;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;

        background-color: var( --black-color );
        @media( min-width: 65em )
        {
            height: -webkit-fill-available;

            display: flex;
        }
    }

    .home-company-about-container
    {
        margin: auto;
        width: 40rem;
        padding: 2rem;

        display: flex;
        flex-direction: column;
        gap: 3rem;
    }

    .home-company-about-button
    {
        width: fit-content;
        padding: 1.375rem 3rem;

        display: block;

        background-color: var( --black-color );
    }

    .home-company-companies
    {
        display: flex;
    }

    .home-company-companies-inner
    {
        height: 5rem;

        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;

        background-color: unset;
        @media( min-width: 65em )
        {
            height: 6rem;
        }
    }

    .home-company-companies-inner img
    {
        height: 1.5rem;
    }

    .home-company-companies-inner img:first-child
    {
        display: none;
    }
    .home-company-companies-inner img:last-child
    {
        display: block;
    }

    .home-company-companies-inner.active
    {
        background-color: var( --company-background-color );
    }

    .home-company-companies-inner.active img:first-child
    {
        display: block;
    }
    .home-company-companies-inner.active img:last-child
    {
        display: none;
    }

    .home-company-second
    {
        position: relative;

        height: -webkit-fill-available;
        width: 100%;

        display: flex;
        flex-direction: column;
        @media( min-width: 65em )
        {
            width: 40%;
        }
    }

    .home-company-carousel
    {
        height: calc( 100% - 6rem);
        width: 100%;
    }

    .home-company-controler
    {
        position: relative;

        display: none;
        @media( min-width: 65em )
        {
            height: 6rem;

            display: flex;
        }
    }

    .home-company-controler-link
    {
        display: flex;
        flex-grow: 1;
        justify-content: center;
        align-items: center;

        background-color: var( --blue-color );
    }

    .home-company-controler-carousel-control
    {
        font-size: 0;
    }

    .home-company-controler-carousel-control button
    {
        height: 100%;
        width: 6rem;

        background-color: var( --black-color );
        @media( min-width: 120em )
        {
            width: 8rem;
        }
    }
</style>
