<script>
    import ServiceReviewAverage from '$lib/components/ServiceReviewAverage.svelte';
    import ServiceReviewCard from '$lib/components/ServiceReviewCard.svelte';
    import { getTranslatedTextByCode } from 'senselogic-gist';

    export let serviceReviewData;

    let currentItems = 2;
</script>

<div class="service-review-block">
    <div class="service-review-block-title block-title">
        {getTranslatedTextByCode( 'ReviewBlockTitle' )}
    </div>
    <div class="service-review-block-container">
        <div class="service-review-block-container-average">
            <ServiceReviewAverage reviewData={serviceReviewData}/>
        </div>
        <div class="service-review-block-container-items">
            {#each serviceReviewData.slice(0, currentItems) as serviceReview}
                <ServiceReviewCard reviewData={serviceReview}/>
            {/each}
            {#if currentItems < serviceReviewData.length}
                <button class="service-review-block-container-items-load-more inverted-button" on:click={() => currentItems = currentItems + 2}>
                    {getTranslatedTextByCode( 'LoadMoreReviewsButton' )}
                </button>
            {/if}
        </div>

    </div>
</div>

<style type="text/scss">
    .service-review-block-title
    {
        margin-bottom: 3rem;
    }

    .service-review-block-container
    {
        display: flex;
        flex-wrap: wrap;
    }

    .service-review-block-container-average
    {
        margin-bottom: 3rem;
        width: 100%;
        @media( min-width: 90em )
        {
            flex-basis: 30%;
        }
    }

    .service-review-block-container-items
    {
        width: 100%;
        @media( min-width: 90em )
        {
            padding-left: 3rem;

            flex: 1;
        }
    }

    .service-review-block-container-items-load-more
    {
        margin-top: 3rem;
    }
</style>
