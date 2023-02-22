<script>
    import '../app.scss';
    import { page, navigating } from '$app/stores';
    import { language, currency, localCart } from '../stores.js';
    import { setLanguageCode, setDefaultLanguageCode, setTextByLanguageCodeMapByCode } from 'senselogic-gist';
    import { setCurrencyCode, setDefaultCurrencyCode } from '$lib/currency';
    import { cart, StoreCart } from '$lib/cart';
    import { onMount, afterUpdate } from 'svelte';
    import { UpdateViewportProperties } from '$lib/vistaViewport.js';
    import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
    import SideMenuModal from '$lib/components/SideMenuModal.svelte';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    // import Drawer from '$lib/components/Drawer.svelte';
    // import { browser } from '$app/environment';
    // import { drawer } from '$lib/drawer';

    export let data;

    let cartInfo;
    let cartUserInfo;

    UpdateViewportProperties();

    onMount(async () => {

        cartInfo = localCart ? JSON.parse( atob( localCart ) ) : null;
        cartUserInfo = data.userCart ? JSON.parse( atob( data.userCart ) ) : null;

        if ( $page.data.user )
        {
            if ( cartUserInfo )
            {
                $cart = cartUserInfo;
            }
            else
            {
                if ( cartInfo )
                {
                    StoreCart( JSON.parse( atob( localCart ) ), $page.data.user );
                    $cart = cartInfo;
                }
            }
        }
        else
        {
            if ( cartInfo )
            {
                $cart = cartInfo;
            }
            else
            {
                $cart = {
                    services: [],
                    info: {}
                };
            }
        }
    });

    setLanguageCode( language );
    setDefaultLanguageCode( 'en' );

    for ( let text of data.textArray )
    {
        setTextByLanguageCodeMapByCode( text.text, text.code );
    }

    setCurrencyCode( currency );
    setDefaultCurrencyCode( 'euro' );

    let refresh = {}
    function restartComponents() {
        refresh = {}
    }

    let isAdmin = $page.url.pathname.indexOf( 'admin' );

    // $drawer = 'is-close';

    // const openDrawer = () =>
    //     {
    //         if ( $drawer == 'is-open' )
    //         {
    //             $drawer = 'is-close'
    //         }
    //         else{
    //             $drawer = 'is-open'
    //         }
    //     };

    // const closeDrawer = () => {
    //         $drawer = 'is-close';
    //     }

    // if ( browser ){

    //     document.addEventListener( 'click', function handleClickOutsideBox( event ) {
    //         const drawer = document.getElementById( 'drawer' );
    //         const buttonDrawer = document.getElementById( 'button-drawer' );

    //         if ( !drawer.contains( event.target ) && !buttonDrawer.contains( event.target ) )
    //         {
    //             closeDrawer();
    //         }
    //     } );
    // }

    afterUpdate( () => {
        isAdmin = $page.url.pathname.indexOf( 'admin' );
    });

    function closeModalSideMenu() {
        if ( modalSideMenuOpen )
        {
            modalSideMenuOpen = false;
        }
    }

    let modalSideMenuOpen = false;
</script>

{#key refresh}
    {#if $navigating}
        <PreloadingIndicator />
    {/if}
    <div class="main">
        {#if isAdmin == 1}
            <main>
                <slot />
            </main>
        {:else}
            <div class="main-header">
                <!-- <button id="button-drawer" class="drawer-hamburger" on:click={openDrawer}>
                    <img src="/image/icon/hamburger.svg" alt="">
                </button> -->
                <button class="side-menu-hamburger" on:click={() => modalSideMenuOpen = true}>
                    <img src="/image/icon/hamburger.svg" alt="">
                </button>
                {#if modalSideMenuOpen}
                    <SideMenuModal closeModalSideMenu={closeModalSideMenu} data={data}/>
                {/if}
                <Header languageArray={data.languageArray} data={data} refresh={restartComponents}/>
            </div>
            <div class="main-container">
                <!-- <div id="drawer" class="main-container-drawer {$drawer}">
                    <Drawer data={data}/>
                </div> -->
                <main class="main-container-slot">
                    <slot />
                </main>
            </div>
            <div class="main-footer">
                <Footer languageArray={data.languageArray} currencyArray={data.currencyArray} refresh={restartComponents}/>
            </div>
        {/if}
    </div>
{/key}
