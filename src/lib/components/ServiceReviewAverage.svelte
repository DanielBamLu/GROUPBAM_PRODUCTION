<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { review } from '$lib/review';
    import StarIcon from '$lib/components/icon/Star.svelte';

    export let reviewData;

    let reviewInfo = review( reviewData );
</script>

<div class="service-review-average-block">
    <div class="service-review-average-block-average">
        <div class="service-review-average-block-average-number average-number">
            {reviewInfo.reviewAverage}
        </div>
        <div class="service-review-average-block-average-based average-based">
            {getTranslatedTextByCode( 'ReviewBasedOnText' )}
            {reviewInfo.reviewCount}
            {getTranslatedTextByCode( 'ReviewBasedOnReviewsText' )}
        </div>
        <div class="service-review-average-block-average-stars">
            {#each {length: reviewInfo.numberStarsEnable} as _, i}
                <StarIcon data="yellow"/>
            {/each}
            {#each {length: reviewInfo.numberStarsDisable} as _, i}
                <StarIcon data="gray"/>
            {/each}
        </div>
    </div>
    <div class="service-review-average-block-items">
        {#each Object.entries(reviewInfo.reviewAverageByRating) as [number, count]}
            <div class="service-review-average-block-item">
                <div class="service-review-average-block-item-number">
                    <div class="service-review-average-block-item-number-icon">
                        <StarIcon data="yellow"/>
                    </div>
                    <div class="service-review-average-block-item-number-number service-review-item">
                        {number}
                    </div>
                </div>
                <div class="service-review-average-block-item-bar">
                    <div class="service-review-average-block-item-bar-progress" style="width:{count}%"></div>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .service-review-average-block-average
    {
        padding: 2rem 1.5rem;

        display: flex;
        align-items: center;

        background-color: var( --black-color );
    }

    .service-review-average-block-average-based
    {
        margin-left: 1rem;
        width: 8rem;
    }

    .service-review-average-block-average-stars
    {
        margin-left: auto;

        display: flex;
        gap: 0.5rem;
    }

    .service-review-average-block-items
    {
        padding: 3.125rem 2.625rem;

        background-color: var( --white-color );
    }

    .service-review-average-block-item
    {
        margin-bottom: 1.5rem;

        display: flex;
        align-items: center;
    }

    .service-review-average-block-item-number
    {
        display: flex;
        align-items: center;
    }

    .service-review-average-block-item-number-icon
    {
        display: flex;
    }

    .service-review-average-block-item-number-number
    {
        margin-left: 1rem;
    }

    .service-review-average-block-item-bar
    {
        margin-left: 2.5rem;
        height: 0.25rem;
        width: 100%;

        background-color: var( --background-color );
    }

    .service-review-average-block-item-bar-progress
    {
        height: 0.25rem;

        background-color: var( --black-color );
    }
</style>
