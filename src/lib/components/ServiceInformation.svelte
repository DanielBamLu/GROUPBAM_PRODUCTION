<script>
    import ServiceInformationAccordion from '$lib/components/ServiceInformationAccordion.svelte';
    import { getTranslatedTextByCode } from 'senselogic-gist';

    export let serviceInformationData;
</script>

<div class="service-information-block">
    <div class="service-information-title information-block-title">
            {getTranslatedTextByCode( 'InformationBlockTitle' )}
    </div>
    <div class="service-information-block-inner">
        <div class="service-information-block-inner-title information-block-inner-title">
            {getTranslatedTextByCode( 'InformationTitle' )}
        </div>
        <div class="service-information-block-inner-description information-block-inner-description">
            {getTranslatedTextByCode( 'InformationText' )}
        </div>
        <div class="service-information-block-inner-button">
            <div class="service-information-block-inner-button-help inverted-red-button">
                {getTranslatedTextByCode( 'HelpCenterButton' )}
            </div>
            <div class="service-information-block-inner-button-contact main-red-button">
                {getTranslatedTextByCode( 'ContactButton' )}
            </div>
        </div>
        <div class="service-information-block-inner-accordions">
            {#each serviceInformationData as informatation}
                <ServiceInformationAccordion informatationData={informatation}>
                </ServiceInformationAccordion>
            {/each}
        </div>
    </div>
</div>

<style>
    .service-information-block
    {
        margin-top: 12rem;
        margin-bottom: 12rem;

        text-align: center;
    }

    .service-information-block-inner-title
    {
        margin-bottom: 0.5rem;
    }

    .service-information-block-inner-button
    {
        margin-top: 1.5rem;
        margin-bottom: 3rem;

        display: flex;
        gap: 0.5rem;
        justify-content: center;
    }
</style>
