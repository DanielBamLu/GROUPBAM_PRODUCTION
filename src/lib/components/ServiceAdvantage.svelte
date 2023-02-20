<script>
    import ServiceAdvantageCard from '$lib/components/ServiceAdvantageCard.svelte';
    import { getTranslatedTextByCode } from 'senselogic-gist';

    export let serviceAdvantageData;
</script>

<div class="service-advantage-block">
    <div class="service-advantage-info">
        <div class="service-advantage-block-title block-title">
            {getTranslatedTextByCode( 'AdvantageBlockTitle' )}
        </div>
        <div class="service-advantage-block-description block-description">
            {getTranslatedTextByCode( 'AdvantageBlockDescription' )}
        </div>
    </div>
    <div class="service-advantage-block-items">
        <div class="service-advantage-block-items-container">
            {#each serviceAdvantageData as advantage}
                <ServiceAdvantageCard advantageData={advantage}/>
            {/each}
        </div>
    </div>
</div>

<style type="text/scss">
    .service-advantage-block
    {
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }

    .service-advantage-block-items
    {
        width: 100%;
        @media( min-width: 100em )
        {
            flex-basis: 75%;
        }
    }

    .service-advantage-block-items-container
    {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
        @media( min-width: 65em )
        {
            grid-template-columns: 1fr 1fr;
        }

        @media( min-width: 75em )
        {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
</style>
