<script>
    import ServiceOptionCard from '$lib/components/ServiceOptionCard.svelte';
    import { getTranslatedTextByCode } from 'senselogic-gist';

    export let serviceOptionData;
</script>

<div class="service-option-block" id="service-option-block">
    <div class="service-option-block-title block-title">
        {getTranslatedTextByCode( 'OptionBlockTitle' )}
    </div>
    <div class="service-option-block-items">
        {#each serviceOptionData as option}
            <ServiceOptionCard optionData={option}/>
        {/each}
    </div>
</div>

<style type="text/scss">
    .service-option-block-title
    {
        margin-bottom: 2rem;
    }

    .service-option-block-items
    {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1.5rem 1.5rem;
        @media( min-width: 65em )
        {
            grid-template-columns: repeat(2, 1fr);
        }

        @media( min-width: 90em )
        {
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>
