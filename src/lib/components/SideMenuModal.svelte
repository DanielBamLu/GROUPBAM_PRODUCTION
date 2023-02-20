<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import CloseIcon from '$lib/components/icon/Close.svelte';
    import ServiceCard from '$lib/components/ServiceCard.svelte';

    export let closeModalSideMenu = () => {}

    export let data;
</script>

<div class="side-menu modal">
    <div class="modal-close">
        <button class="modal-close-button" on:click={closeModalSideMenu}>
            <CloseIcon/>
        </button>
    </div>
    <div class="modal-container">
        <div class="modal-menu-top">
            <ul>
                <li><a class="modal-menu-top-button" href="/">{getTranslatedTextByCode( 'HomeButton' )}</a></li>
                <li><a class="modal-menu-top-button" href="/services">{getTranslatedTextByCode( 'ShopServicesButton' )}</a></li>
                <li><a class="modal-menu-top-button" href="/whatwedo">{getTranslatedTextByCode( 'WhatWeDoButton' )}</a></li>
                <li><a class="modal-menu-top-button" href="/contactus">{getTranslatedTextByCode( 'ContactUsButton' )}</a></li>
            </ul>
        </div>
        <div class="modal-recent-services">
            <div class="modal-recent-services-label">
                {getTranslatedTextByCode( 'RecentlyViewedButton' )}
            </div>
            <div class="modal-recent-services-container parent-service-card">
                {#each data.serviceRecentlyViewd as item}
                    <ServiceCard serviceData={item}>
                    </ServiceCard>
                {/each}
            </div>
        </div>
        <div class="modal-menu-bottom">
            <ul>
                <li><a class="modal-menu-bottom-button" href="https://www.linkedin.com">{getTranslatedTextByCode( 'LinkedinButton' )}</a></li>
                <li><a class="modal-menu-bottom-button" href="https://www.behance.com">{getTranslatedTextByCode( 'BehanceButton' )}</a></li>
                <li><a class="modal-menu-bottom-button" href="https://www.facebook.com">{getTranslatedTextByCode( 'FacebookButton' )}</a></li>
                <li><a class="modal-menu-bottom-button" href="https://www.instagram.com">{getTranslatedTextByCode( 'InstagramButton' )}</a></li>
            </ul>
        </div>
    </div>
</div>

<style type="text/scss">
    .side-menu
    {
        z-index: 1001;
        position: fixed;

        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;
    }

    .side-menu .modal-close
    {
        justify-content: flex-start;
    }

    .side-menu .modal-close .modal-close-button
    {
        position: absolute;
        right: 0;

        height: 4rem;
        width: 4rem;

        background-color: var( --blue-color );
        @media( min-width: 65em )
        {
            position: relative;
        }
    }

    .side-menu .modal-container
    {
        overflow-y: scroll;

        flex: 1;

        background-color: var( --black-color );
    }

    .side-menu .modal-container .modal-recent-services
    {
        border-top: 0.063rem solid var( --line-color );
        border-bottom: 0.063rem solid var( --line-color );
        padding: 2rem 0;
    }

    .side-menu .modal-container .modal-recent-services .modal-recent-services-container
    {
        padding-top: 2rem;
    }

    .side-menu .modal-container .modal-menu-top ul,
    .side-menu .modal-container .modal-menu-bottom ul
    {
        padding-left: unset;

        display: flex;
        gap: 1rem;
        justify-content: space-between;
        @media( min-width: 65em )
        {
            gap: 2rem;
        }
    }

    .side-menu .modal-container .modal-menu-top ul
    {
        padding-bottom: 1rem;
    }
    .side-menu .modal-container .modal-menu-bottom ul
    {
        padding-top: 1rem;
    }
</style>
