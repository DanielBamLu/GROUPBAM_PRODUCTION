<script>
    import ServicePackCard from '$lib/components/ServicePackCard.svelte';
    import { getTranslatedTextByCode } from 'senselogic-gist';

    export let servicePackData;
    export let servicePackTypeData;
</script>

<div class="service-pack-block">
    <div class="service-pack-block-title block-title">
        {getTranslatedTextByCode( 'PackBlockTitle' )}
    </div>
    <div class="service-pack-block-items">
        {#each servicePackData as pack}
            <ServicePackCard packData={pack} servicePackTypeData={servicePackTypeData}>
            </ServicePackCard>
        {/each}
    </div>
</div>

<style type="text/scss">
    .service-pack-block-title
    {
        margin-bottom: 3rem;
    }

    .service-pack-block-items
    {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
        @media( min-width: 65em )
        {
            grid-template-columns: 1fr 1fr;
        }

        @media( min-width: 90em )
        {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
</style>
