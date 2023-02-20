<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import ServiceCard from '$lib/components/ServiceCard.svelte';
    import CategoryFilter from '$lib/components/CategoryFilter.svelte';

    export let data;
</script>

<svelte:head>
    <title>{getTranslatedTextByCode( 'ShopServicesButton' )}</title>
</svelte:head>
<div class="services-filter">
    <CategoryFilter data={data.categoryArray}/>
</div>
<div class="services-items parent-service-card">
    {#each data.service as item}
        <ServiceCard serviceData={item}>
        </ServiceCard>
    {/each}
</div>

<style type="text/scss">
    .services-items{
        margin-top: 3rem;
    }
</style>
