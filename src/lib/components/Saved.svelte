<script>
    import { invalidateAll } from '$app/navigation';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    import SavedCard from '$lib/components/SavedCard.svelte';

    export let data;
    export let closeModalSaved = () => {}

    if ( browser )
    {
        invalidateAll();
    }

    const gotoSaved = () => {
        closeModalSaved();
        goto( '/customer/saved' )
    }
</script>

<div class="saved">
    <div class="saved-heading">
        {#if data.length === 0}
            <div class="saved-empty">
                {getTranslatedTextByCode( 'SavedEmptyLabel' )}
            </div>
        {/if}
    </div>
    {#if data.length > 0}
        <div class="saved-items">
            {#each data as item}
                <SavedCard data={item}>
                </SavedCard>
            {/each}
        </div>
        <div class="saved-actions">
            <button class="saved-view-saved" on:click={gotoSaved}>
                {getTranslatedTextByCode( 'ViewAllButton' )}
            </button>
        </div>
    {/if}
</div>

<style type="text/scss">
    .saved
    {
        padding: 2rem;

        background-color: var( --white-color );

        text-align: center;
        @media( min-width: 65em )
        {
            min-width: 50rem;
            padding: 4rem;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: stretch;
        }
    }

    .saved-items
    {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;

        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .saved-view-saved
    {
        width: 100%;
        padding: 1.25rem;

        display: flex;
        justify-content: center;

        background-color: var( --background-color );
    }
</style>
