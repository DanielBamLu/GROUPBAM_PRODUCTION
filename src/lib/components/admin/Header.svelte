<script>
    import { slide } from 'svelte/transition';
    import { page } from '$app/stores';
    import { languageCode, setLanguageCode, getTranslatedTextByCode } from 'senselogic-gist';
    import { enhance } from '$app/forms';
    import ChevronIcon from '$lib/components/icon/Chevron.svelte';

    export let languageArray;

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

<div class="header">
    <div class="header-logo">
        <a href="/">
            <img src="/image/group_bam_logo.svg" alt="">
        </a>
    </div>
    <div class="header-actions">
        <div class="header-actions-container">
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
                {/if}
                <form use:enhance method="POST" action="/admin/settings?/logout" class="header-sign-up header-button">
                    <button class="header-button-label-white">{getTranslatedTextByCode( 'LogOutButton' )}</button>
                </form>
            {:else}
                <a href="/login" class="header-button white" title="{getTranslatedTextByCode( 'SignInButton' )}">
                    <div class="header-button-label-dark">{getTranslatedTextByCode( 'SignInButton' )}</div>
                </a>
                <a href="/register" class="header-sign-up header-button" title="{getTranslatedTextByCode( 'SignUpButton' )}">
                    <div class="header-button-label-white">{getTranslatedTextByCode( 'SignUpButton' )}</div>
                </a>
            {/if}
        </div>
    </div>
</div>
