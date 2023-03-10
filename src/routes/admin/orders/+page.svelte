<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import OrderCard from '$lib/components/admin/OrderCard.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<svelte:head>
    <title>{getTranslatedTextByCode( 'OrdersPageTitle' )}</title>
</svelte:head>

<div class="admin-list">
    <div class="admin-list-title admin-title">
        {getTranslatedTextByCode( 'OrdersButton' )}
    </div>
    <div class="admin-container">
        <div class="orders-items">
            {#if data.orders.length === 0}
                <div class="orders-empty">
                    {getTranslatedTextByCode( 'OrdersAdminEmptyLabel' )}
                </div>
            {:else}
                {#each data.orders as item}
                    <OrderCard data={item}/>
                {/each}
            {/if}
        </div>
    </div>
</div>

<style type="text/scss">
    .orders-items
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
