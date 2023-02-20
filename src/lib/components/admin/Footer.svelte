<script>
    import { slide } from 'svelte/transition';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { languageCode, setLanguageCode } from 'senselogic-gist';
    import ChevronIcon from '$lib/components/icon/Chevron.svelte';

    export let languageArray;

    let date = new Date().getFullYear();

    let language = languageCode;
    let currentLanguage = language;

    export let refresh = () => {}

    const setLanguage = ( language ) => {
        setLanguageCode( language );
        localStorage.setItem( 'language', language );
        refresh();
    }

    let isOpen = false;
    const toggle = () => isOpen = !isOpen;
</script>

<div class="footer">
    <div class="footer-copyright footer-label-copyright">
        @ {date} {getTranslatedTextByCode( 'GroupBamCopyrightTitle' )}
    </div>
    <div class="footer-language">
        <button class="footer-language-button" on:click={toggle} aria-expanded={isOpen}>
            {#each languageArray as language}
                {#if language.code == currentLanguage}
                    <div class="footer-language-button-flag" style="background-image:url({language.iconPath});"></div>
                {/if}
            {/each}
            <div class="footer-language-button-arrow">
                <ChevronIcon data="gray"/>
            </div>
        </button>
        <div class="footer-language-flags">
            {#each languageArray as language}
                {#if isOpen}
                    {#if language.code != currentLanguage}
                        <div on:click="{setLanguage( language.code )}" transition:slide={{ duration: 300 }} style="background-image:url({language.iconPath});"></div>
                    {/if}
                {/if}
            {/each}
        </div>
    </div>
</div>

<style type="text/scss">
    .footer
    {
        position: absolute;

        width: 100%;
        padding: 2rem 3rem;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: flex-start;

        background: var( --background-light-color );
        @media( min-width: 65em )
        {
            flex-direction: row;
        }
    }

    .footer-language
    {
        position: relative;

        margin-top: 1rem;

        font-size: 0;
        @media( min-width: 65em )
        {
            margin-top: 0;
            margin-left: auto;
        }
    }

    .footer-language-button
    {
        display: flex;
        justify-content: space-between;
        align-items: center;

        background-color: unset;
    }

    .footer-language-button .footer-language-button-flag
    {
        height: 1.5rem;
        width: 2.5rem;

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

    .footer-language-flags
    {
        position: absolute;
        top: -4.5rem;
    }

    .footer-language-flags div
    {
        margin-bottom: 0.625rem;
        height: 1.5rem;
        width: 2.5rem;

        background-size: cover;

        cursor: pointer;
    }
</style>
