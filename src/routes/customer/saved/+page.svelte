<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import CustomerSavedCard from '$lib/components/CustomerSavedCard.svelte';

    export let data;

    let savedIsEmpty = data.serviceSaved.length;
</script>

<svelte:head>
    <title>{getTranslatedTextByCode( 'SavedPageTitle' )}</title>
</svelte:head>
<div class="saved">
    <div class="saved-heading">
        {#if savedIsEmpty === 0}
            <div class="saved-empty">
                {getTranslatedTextByCode( 'SavedEmptyLabel' )}
            </div>
        {/if}
    </div>
    <div class="saved-container">
        <div class="saved-items parent-service-card">
            {#each data.serviceSaved as item}
                <CustomerSavedCard serviceData={item}/>
            {/each}
        </div>
    </div>
</div>

<style type="text/scss">
    .saved
    {
        padding: 2rem;
        @media( min-width: 65em )
        {
            padding: 4rem;
        }
    }

    .saved-items
    {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;

        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        @media( min-width: 65em )
        {
            grid-template-columns: 1fr 1fr;
        }
    }
</style>
