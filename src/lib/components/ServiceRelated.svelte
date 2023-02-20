<script>
    import ServiceCard from '$lib/components/ServiceCard.svelte';
    import { getTranslatedTextByCode } from 'senselogic-gist';

    export let serviceRelated;
</script>

<div class="service-related-block">
    <div class="service-related-block-title block-title">
        {getTranslatedTextByCode( 'RelatedBlockTitle' )}
    </div>
    <div class="service-related-block-items parent-service-card">
        {#each serviceRelated as service}
            <ServiceCard serviceData={service}>
            </ServiceCard>
        {/each}
    </div>
</div>

<style type="text/scss">
    .service-related-block-title
    {
        margin-bottom: 2rem;
    }
</style>
