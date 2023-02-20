<script>
    import ServiceProcesCard from '$lib/components/ServiceProcessCard.svelte';
    import { getTranslatedTextByCode } from 'senselogic-gist';

    export let serviceProcessData;

    serviceProcessData.sort( ( a, b ) => {
        return a.number - b.number;
    });
</script>

<div class="service-process-block">
    <div class="service-process-block-info">
        <div class="service-process-block-title block-title">
            {getTranslatedTextByCode( 'ProcessBlockTitle' )}
        </div>
        <div class="service-process-block-description block-description">
            {getTranslatedTextByCode( 'ProcessBlockDescription' )}
        </div>
    </div>
    <div class="service-process-block-items">
        {#each serviceProcessData as process}
            <ServiceProcesCard processData={process}>
            </ServiceProcesCard>
        {/each}
    </div>
</div>

<style type="text/scss">
    .service-process-block-info
    {
        margin-bottom: 3rem;
    }

    .service-process-block-items
    {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        @media( min-width: 65em )
        {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
</style>
