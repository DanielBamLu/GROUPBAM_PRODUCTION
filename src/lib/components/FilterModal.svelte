<script>
    import { getTranslatedText, getTranslatedTextByCode } from 'senselogic-gist';
    import CloseIcon from '$lib/components/icon/Close.svelte';
    import { page } from '$app/stores';

    export let data;
    export let closeModalFilter = () => {}
</script>

<div class="filter modal">
    <div class="modal-close">
        <button class="modal-close-button" on:click={closeModalFilter}>
            <CloseIcon/>
        </button>
    </div>
    <div class="modal-container">
        <div class="modal-title">
            {getTranslatedTextByCode( 'FilterByIndustryTitle' )}
        </div>
        <ul>
            {#each data as industry}
                <li>
                    <a class="{$page.params['industrySlug'] === industry.slug ? 'selected' : ''}" href="/services/industry/{industry.slug}" title={getTranslatedText( industry.name )} on:click={closeModalFilter}>
                        <img src="{industry.iconPath}" alt="">
                        <div class="modal-label">{getTranslatedText( industry.name )}</div>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .modal-container a
    {
        padding: 1rem;

        display: flex;
        align-items: center;
    }

    .modal-container a.selected
    {
        background-color: var( --background-light-color );
    }

    .modal-container li img
    {
        margin-left: 0.25rem;
        width: 1.5rem;
    }

    .modal-container li div
    {
        margin-left: 0.875rem;

        white-space: nowrap;
    }
</style>
