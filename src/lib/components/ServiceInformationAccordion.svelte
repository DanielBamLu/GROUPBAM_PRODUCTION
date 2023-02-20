<script>
    import { slide } from 'svelte/transition';
    import { getTranslatedText } from 'senselogic-gist';
    import ChevronIcon from '$lib/components/icon/Chevron.svelte';

    export let informatationData;

    let isOpen = false;
    const toggle = () => isOpen = !isOpen;
</script>

<div class="information-accordion">
    <div class="information-accordion-button">
        <button on:click={toggle} aria-expanded={isOpen} class="information-accordion-button">
            <div class="information-accordion-button-title infomation-accordion-title">
                {getTranslatedText( informatationData.question)}
            </div>
            <div class="information-accordion-button-arrow">
                <ChevronIcon data="red bottom"/>
            </div>
        </button>
    </div>
    <div class="information-accordion-content">
        {#if isOpen}
            <div class="information-accordion-content-container infomation-accordion-content" transition:slide={{ duration: 300 }}>
                {getTranslatedText( informatationData.answer)}
            </div>
        {/if}
    </div>
</div>

<style>
    .information-accordion
    {
        border-top: 0.063rem solid var( --line-color );
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
    }

    .information-accordion-button button
    {
        width: 100%;

        display: flex;
        justify-content: space-between;

        background-color: unset;
    }

    .information-accordion-button-arrow
    {
        margin-right: 0.188rem;

        transition: transform 0.2s ease-in;
    }

    .information-accordion-button [aria-expanded=true] .information-accordion-button-arrow
    {
        transform: rotate(0.25turn);
    }

    .information-accordion-content-container
    {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;

        text-align: left;
    }
</style>
