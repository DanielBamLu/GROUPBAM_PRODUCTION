<script>
    import { slide } from 'svelte/transition';
    import { languageCode, setLanguageCode, getTranslatedTextByCode } from 'senselogic-gist';
    import { currencyCode, setCurrencyCode } from '$lib/currency';
    import { page } from '$app/stores';
    import ChevronIcon from '$lib/components/icon/Chevron.svelte';

    export let languageArray;
    export let currencyArray;

    let date = new Date().getFullYear();

    let language = languageCode;
    let currentLanguage = language;

    export let refresh = () => {}

    const setLanguage = ( language ) => {
        setLanguageCode( language );
        localStorage.setItem( 'language', language );
        refresh();
    }

    let currency = currencyCode;
    let currentCurrency = currency;

    const setCurrency = ( currency ) => {
        setCurrencyCode( currency );
        localStorage.setItem( 'currency', currency );
        refresh();
        }

    let isOpen = false;
    const toggle = () => isOpen = !isOpen;

    let isOpenCurrency = false;
    const toggleCurrency = () => isOpenCurrency = !isOpenCurrency;
</script>

<div class="footer">
    <div class="footer-top">
        <div class="footer-menu-top">
            <ul>
                <li><a class="footer-menu-top-button" href="/" class:is-active={$page.url.pathname === '/'}>{getTranslatedTextByCode( 'HomeButton' )}</a></li>
                <li><a class="footer-menu-top-button" href="/services" class:is-active={$page.url.pathname.indexOf( '/services' ) != -1}>{getTranslatedTextByCode( 'ShopServicesButton' )}</a></li>
                <li><a class="footer-menu-top-button" href="/whatwedo" class:is-active={$page.url.pathname === '/whatwedo'} style="cursor: not-allowed;">{getTranslatedTextByCode( 'WhatWeDoButton' )}</a></li>
                <li><a class="footer-menu-top-button" href="/contactus" class:is-active={$page.url.pathname === '/contactus'} style="cursor: not-allowed;">{getTranslatedTextByCode( 'ContactUsButton' )}</a></li>
            </ul>
        </div>
        <div class="footer-message">
            <div class="footer-message-label">
                {getTranslatedTextByCode( 'FooterMessageLabel' )}
            </div>
            <a class="footer-message-link" href="mailto:contact@groupbam.com">
                {getTranslatedTextByCode( 'FooterMessageButton' )}
                <ChevronIcon data="blue footer"/>
            </a>
        </div>
        <div class="footer-menu-bottom">
            <ul>
                <li><a class="footer-menu-bottom-button" href="https://www.linkedin.com">{getTranslatedTextByCode( 'LinkedinButton' )}</a></li>
                <li><a class="footer-menu-bottom-button" href="https://www.behance.com">{getTranslatedTextByCode( 'BehanceButton' )}</a></li>
                <li><a class="footer-menu-bottom-button" href="https://www.facebook.com">{getTranslatedTextByCode( 'FacebookButton' )}</a></li>
                <li><a class="footer-menu-bottom-button" href="https://www.instagram.com">{getTranslatedTextByCode( 'InstagramButton' )}</a></li>
            </ul>
        </div>
    </div>
    <div class="footer-bottom">
        <div class="footer-copyright footer-label-copyright">
            @ {date} {getTranslatedTextByCode( 'GroupBamCopyrightTitle' )}
        </div>
        <div class="footer-links">
            <a class="footer-button" href="/">{getTranslatedTextByCode( 'PrivacyPolicyButton' )}</a>
            <a class="footer-button" href="/">{getTranslatedTextByCode( 'TermsButton' )}</a>
            <a class="footer-button" href="/">{getTranslatedTextByCode( 'CookiePolicyButton' )}</a>
        </div>
        <div class="footer-language">
            <button class="footer-language-button footer-language-label" on:click={toggle} aria-expanded={isOpen}>
                {#each languageArray as language}
                    {#if language.code == currentLanguage}
                        <div class="footer-language-button-code">{language.code}</div>
                    {/if}
                {/each}
                <div class="footer-language-button-arrow">
                    <ChevronIcon data="gray"/>
                </div>
            </button>
            <div class="footer-language-code footer-language-label">
                {#each languageArray as language}
                    {#if isOpen}
                        {#if language.code != currentLanguage}
                            <div on:click="{setLanguage( language.code )}" transition:slide={{ duration: 300 }}>{language.code}</div>
                        {/if}
                    {/if}
                {/each}
            </div>
        </div>
        <div class="footer-currency">
            <button class="footer-currency-button" on:click={toggleCurrency} aria-expanded={isOpenCurrency}>
                {#each currencyArray as currency}
                    {#if currency.code == currentCurrency}
                        <div class="footer-currency-button-flag footer-currency-label">{currency.code}</div>
                    {/if}
                {/each}
                <div class="footer-currency-button-arrow">
                    <ChevronIcon data="gray"/>
                </div>
            </button>
            <div class="footer-currency-symbols">
                {#each currencyArray as currency}
                    {#if isOpenCurrency}
                        {#if currency.code != currentCurrency}
                            <div class="footer-currency-label" on:click="{setCurrency(currency.code)}" transition:slide={{ duration: 300 }}>{currency.code}</div>
                        {/if}
                    {/if}
                {/each}
            </div>
        </div>
    </div>
</div>

<style type="text/scss">
    .footer
    {
        width: 100%;
        padding: 2rem 3rem;
        padding-bottom: 0.5rem;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        background: var( --background-light-color );
    }

    .footer .footer-menu-top ul
    {
        padding-left: unset;

        display: flex;
        gap: 1rem;
    }

    .footer .footer-menu-top .footer-menu-top-button.is-active
    {
        border-bottom: 0.75rem solid var( --blue-color );
    }

    .footer .footer-menu-bottom ul
    {
        border-top: 0.063rem solid var( --line-color );
        border-bottom: 0.063rem solid var( --line-color );
        padding: 1rem 0;
        padding-left: unset;

        display: flex;
        gap: 1rem;
        justify-content: space-between;
        @media( min-width: 65em )
        {
            gap: 2rem;
        }
    }

    .footer-message
    {
        padding: 3rem 0;
    }

    .footer-bottom
    {
        width: 100%;
        padding-top: 0.5rem;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
    }

    .footer-links
    {
        display: none;
        @media( min-width: 65em )
        {
            margin-left: auto;

            display: flex;
            gap: 1.5rem;
        }
    }

    .footer-language
    {
        position: relative;

        margin-left: auto;

        font-size: 0;
    }

    .footer-language-button
    {
        display: flex;
        justify-content: space-between;
        align-items: center;

        background-color: unset;
    }

    .footer-language-button .footer-language-button-code
    {
        background-size: cover;
    }

    .footer-language-button .footer-language-button-arrow
    {
        margin-left: 0.625rem;
    }

    .footer-language-button .footer-language-button-arrow
    {
        transition: transform 0.2s ease-in;
    }

    .footer-language-button[aria-expanded=true] .footer-language-button-arrow
    {
        transform: rotate(-0.25turn);
    }

    .footer-language-code
    {
        position: absolute;
        top: -6.5rem;

        background-color: var( --background-color );
    }

    .footer-language-code div
    {
        padding: 0.5rem;

        margin-bottom: 0.625rem;

        background-size: cover;

        cursor: pointer;
    }

    .footer-currency
    {
        position: relative;

        margin-left: 2rem;

        font-size: 0;
    }

    .footer-currency-button
    {
        height: 1.5rem;

        display: flex;
        justify-content: space-between;
        align-items: center;

        background-color: unset;
    }

    .footer-currency-button .footer-currency-button-arrow
    {
        margin-left: 0.625rem;
    }

    .footer-currency-button .footer-currency-button-arrow
    {
        transition: transform 0.2s ease-in;
    }

    .footer-currency-button[aria-expanded=true] .footer-currency-button-arrow
    {
        transform: rotate(-0.25turn);
    }

    .footer-currency-symbols
    {
        position: absolute;
        top: -1.5rem;

        background-color: var( --background-color );
    }

    .footer-currency-symbols div
    {
        background-size: cover;

        cursor: pointer;
    }
</style>
