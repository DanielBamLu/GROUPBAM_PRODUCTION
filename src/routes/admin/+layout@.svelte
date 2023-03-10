<script>
    import '../../app.scss';
    import { browser } from '$app/environment';
    import { drawer } from '$lib/drawer';
    import { setLanguageCode, setDefaultLanguageCode, setTextByLanguageCodeMapByCode } from 'senselogic-gist';
    import { setCurrencyCode, setDefaultCurrencyCode } from '$lib/currency';
    import Drawer from '$lib/components/admin/Drawer.svelte';
    import Header from '$lib/components/admin/Header.svelte';
    import Footer from '$lib/components/admin/Footer.svelte';

    export let data;

    setLanguageCode( 'en' );
    setDefaultLanguageCode( 'en' );

    for ( let text of data.textArray )
    {
        setTextByLanguageCodeMapByCode( text.text, text.code );
    }

    setCurrencyCode( 'euro' );
    setDefaultCurrencyCode( 'euro' );

    let refresh = {}
    function restartComponents() {
        refresh = {}
    }

    $drawer = 'is-close';

    const openDrawer = () =>
        {
            if ( $drawer == 'is-open' )
            {
                $drawer = 'is-close'
            }
            else{
                $drawer = 'is-open'
            }
        };

    const closeDrawer = () => {
            $drawer = 'is-close';
        }

    if ( browser ){
        document.addEventListener( 'click', function handleClickOutsideBox( event ) {
            const drawer = document.getElementById( 'drawer' );
            const buttonDrawer = document.getElementById( 'button-drawer' );

            if ( !drawer.contains( event.target ) && !buttonDrawer.contains( event.target ) )
            {
                closeDrawer();
            }
        } );
    }
</script>

{#key refresh}
    <div class="main-header">
        <button id="button-drawer" class="drawer-hamburger" on:click={openDrawer}>
            <img src="/image/icon/hamburger.svg" alt="">
        </button>
        <Header languageArray={data.languageArray} refresh={restartComponents}/>
    </div>
    <div class="main-container">
        <div id="drawer" class="main-container-drawer {$drawer}">
            <Drawer data={data}/>
        </div>
        <main class="main-container-slot {$drawer}">
            <slot />
        </main>
    </div>
    <div class="main-footer">
        <Footer languageArray={data.languageArray} currencyArray={data.currencyArray} refresh={restartComponents}/>
    </div>
{/key}

<style>
    .main-container-slot
    {
        display: flex;
        justify-content: center;
    }
</style>