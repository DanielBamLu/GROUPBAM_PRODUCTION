<script>
    import { cart } from '$lib/cart';
    import { slide } from 'svelte/transition';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { page } from '$app/stores';
    import { languageCode, setLanguageCode } from 'senselogic-gist';
    import { clickOutside } from '$lib/clickOutside.js';
    import { Modal } from 'attractions';
    import { enhance } from '$app/forms';
    import { auth } from '$lib/auth';
    import Cart from '$lib/components/Cart.svelte';
    import Saved from '$lib/components/Saved.svelte';
    import AuthModal from '$lib/components/AuthModal.svelte';
    import CartIcon from '$lib/components/icon/Cart.svelte';
    import SavedIcon from '$lib/components/icon/Saved.svelte';
    import ChevronIcon from '$lib/components/icon/Chevron.svelte';

    export let languageArray;
    export let data;
    export let refresh = () => {}

    let language = languageCode;
    let currentLanguage = language;

    const setLanguage = ( language ) => {
        setLanguageCode( language );
        localStorage.setItem( 'language', language );
        refresh();
        }

    let isOpen = false;
    const toggle = () => isOpen = !isOpen;

    let modalCartOpen = false;
    function closeModalCart() {
        if ( modalCartOpen )
        {
            modalCartOpen = false;
        }
    }

    let modalSavedOpen = false;
    function closeModalSaved() {
        if ( modalSavedOpen )
        {
            modalSavedOpen = false;
        }
    }

    $auth = '';

    function handleModalAuth( type ) {
        $auth = type;
    }
</script>

<div class="header">
    <div class="header-logo">
        <a href="/">
            <img src="/image/group_bam_logo.svg" alt="">
        </a>
    </div>
    <div class="header-menu">
        <ul>
            <li><a class="header-menu-button" href="/" class:is-active={$page.url.pathname === '/'}>{getTranslatedTextByCode( 'HomeButton' )}</a></li>
            <li><a class="header-menu-button" href="/services" class:is-active={$page.url.pathname.indexOf( '/services' ) != -1}>{getTranslatedTextByCode( 'ShopServicesButton' )}</a></li>
            <li><a class="header-menu-button" href="/whatwedo" class:is-active={$page.url.pathname === '/whatwedo'} style="cursor: not-allowed;">{getTranslatedTextByCode( 'WhatWeDoButton' )}</a></li>
            <li><a class="header-menu-button" href="/contactus" class:is-active={$page.url.pathname === '/contactus'}>{getTranslatedTextByCode( 'ContactUsButton' )}</a></li>
        </ul>
    </div>
    <div class="header-actions">
        <div class="header-actions-container">
            <div class="header-cart">
                <button on:click={() => modalCartOpen = true} title="{getTranslatedTextByCode( 'CartTitle' )}">
                    <CartIcon data="dark"/>
                    <!-- {#if $cart} -->
                        {#if $cart.services.length > 0}
                            <div class="header-cart-counter">
                                {$cart.services.length}
                            </div>
                        {/if}
                    <!-- {/if} -->
                </button>
                {#if modalCartOpen}
                    <Modal bind:open={modalCartOpen}>
                        <div class="modal-cart" use:clickOutside on:click_outside={closeModalCart}>
                            <Cart closeModalCart={closeModalCart}/>
                        </div>
                    </Modal>
                {/if}
            </div>
            {#if $page.data.user}
                <div class="header-saved">
                    <button on:click={() => modalSavedOpen = true} title="{getTranslatedTextByCode( 'SavedTitle' )}">
                        <SavedIcon data="dark"/>
                    </button>
                    {#if modalSavedOpen}
                        <Modal bind:open={modalSavedOpen}>
                            <div class="modal-saved" use:clickOutside on:click_outside={closeModalSaved}>
                                <Saved data={data.serviceSaved} closeModalSaved={closeModalSaved}/>
                            </div>
                        </Modal>
                    {/if}
                </div>
            {/if}
            <div class="header-language">
                <button class="header-language-button header-language-label" on:click={toggle} aria-expanded={isOpen}>
                    {#each languageArray as language}
                        {#if language.code == currentLanguage}
                            <div class="header-language-button-code">{language.code}</div>
                        {/if}
                    {/each}
                    <div class="header-language-button-arrow">
                        <ChevronIcon data="dark"/>
                    </div>
                </button>
                <div class="header-language-code header-language-label">
                    {#each languageArray as language}
                        {#if isOpen}
                            {#if language.code != currentLanguage}
                                <div on:click="{setLanguage( language.code )}" transition:slide={{ duration: 300 }}>{language.code}</div>
                            {/if}
                        {/if}
                    {/each}
                </div>
            </div>
            {#if $page.data.user}
                {#if $page.data.user.role === 'admin'}
                    <a href="/admin" class="header-button white" title="{getTranslatedTextByCode( 'AdminButton' )}">
                        <div class="header-button-label-dark">{getTranslatedTextByCode( 'AdminButton' )}</div>
                    </a>
                {:else}
                    <a href="/customer" class="header-button white" title="{getTranslatedTextByCode( 'DashboardButton' )}">
                        <div class="header-button-label-dark">{getTranslatedTextByCode( 'DashboardButton' )}</div>
                    </a>
                {/if}
                <form use:enhance method="POST" action="/customer/account?/logout" class="header-sign-up header-button">
                    <button class="header-button-label-white">{getTranslatedTextByCode( 'LogOutButton' )}</button>
                </form>
            {:else}
                <button class="header-button white header-button-label-dark" on:click={() => handleModalAuth( 'login' )}>{getTranslatedTextByCode( 'SignInButton' )}</button>
                {#if $auth == 'login'}
                    <AuthModal handleModalAuth={handleModalAuth( 'login' )}/>
                {/if}
                <button class="header-sign-up header-button header-button-label-white" on:click={() => handleModalAuth( 'register' )}>{getTranslatedTextByCode( 'SignUpButton' )}</button>
                {#if $auth == 'register'}
                    <AuthModal handleModalAuth={handleModalAuth( 'register' )}/>
                {/if}
            {/if}
        </div>
    </div>
</div>
