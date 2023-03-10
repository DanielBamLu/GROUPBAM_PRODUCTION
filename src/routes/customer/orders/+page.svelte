<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import OrderCard from '$lib/components/OrderCard.svelte';

    export let data;
</script>

<svelte:head>
    <title>{getTranslatedTextByCode( 'OrdersPageTitle' )}</title>
</svelte:head>
<div class="orders">
    <div class="orders-heading">
        {#if data.orders.length === 0}
            <div class="orders-empty">
                {getTranslatedTextByCode( 'OrdersEmptyLabel' )}
            </div>
        {/if}
    </div>
    <div class="orders-container">
        <div class="orders-items">
            {#each data.orders as item}
                <OrderCard data={item}/>
            {/each}
        </div>
    </div>
</div>

<style type="text/scss">
    .orders
    {
        padding: 2rem;
        @media( min-width: 65em )
        {
            padding: 4rem;
        }
    }

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
