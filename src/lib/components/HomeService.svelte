<script>
    import ServiceCard from '$lib/components/ServiceCard.svelte';
    import { getTranslatedTextByCode } from 'senselogic-gist';

    export let data;
</script>

<div class="home-service">
    <div class="home-service-title">
        {getTranslatedTextByCode( 'ShopServicesButton' )}
    </div>
    <div class="home-service-container parent-service-card">
        {#each data.service as item}
            <ServiceCard serviceData={item}>
            </ServiceCard>
        {/each}
    </div>
</div>

<style type="text/scss">
    .home-service
    {
        padding: 2rem;
        @media( min-width: 65em )
        {
            padding: 4rem;
        }
    }

    .home-service-title
    {
        margin-bottom: 3rem;
    }
</style>
