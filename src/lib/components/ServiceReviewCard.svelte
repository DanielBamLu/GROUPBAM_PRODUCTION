<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import StarIcon from '$lib/components/icon/Star.svelte';

    export let reviewData;

    let numberStarsEnable = 0;
    let numberStarsDisable = 0;

    numberStarsEnable = reviewData.review.rating;
    numberStarsDisable = 5 - numberStarsEnable;

    const showMore = () =>
        {
            const element = event.target;
            const parent = element.closest('.service-review-card-text' );

            if ( parent.firstChild.classList.contains( 'ellipsisDots' ) )
            {
                parent.firstChild.classList.remove( 'ellipsisDots' );
            }

            if ( element.classList.contains( 'visible' ) )
            {
                element.classList.remove( 'visible' );
            }

        };
</script>

<div class="service-review-card">
    <div class="service-review-card-title review-title">
        {reviewData.review.title}
    </div>
    <div class="service-review-card-rating-date">
        <div class="service-review-card-rating">
            <div class="service-review-card-rating-number review-rating">
                {reviewData.review.rating}
            </div>
            <div class="service-review-card-rating-stars">
                {#each {length: numberStarsEnable} as _, i}
                    <StarIcon data="yellow"/>
                {/each}
                {#each {length: numberStarsDisable} as _, i}
                    <StarIcon data="gray"/>
                {/each}
            </div>
            <div class="service-review-card-rating-number-divisor">
                /
            </div>
            <div class="service-review-card-date review-date">
                {reviewData.review.dateTime}
            </div>
        </div>
    </div>
    <div class="service-review-card-user review-user">
        {reviewData.userName}
    </div>
    <div class="service-review-card-text review-text">
        <div class="service-review-card-text-container ellipsisDots">
            {reviewData.review.text}
        </div>
        <button class="service-review-card-show-more review-show-more visible" on:click={showMore}>
            {getTranslatedTextByCode( 'ShowMoreButton' )}
        </button>
    </div>
</div>

<style>
    .service-review-card:first-child
    {
        border-top: 0.063rem solid var( --line-color );
        border-bottom: 0.063rem solid var( --line-color );
    }

    .service-review-card
    {
        border-bottom: 0.063rem solid var( --line-color );
        padding: 3rem 0 3rem 0;
    }

    .service-review-card-title
    {
        margin-bottom: 0.5rem;
    }

    .service-review-card-rating-date
    {
        margin-bottom: 1.5rem;
    }

    .service-review-card-user
    {
        margin-bottom: 0.5rem;
    }

    .service-review-card-rating
    {
        display: flex;
        align-items: center;
    }

    .service-review-card-rating-number
    {
        margin-right: 0.5rem;
    }

    .service-review-card-rating-stars
    {
        display: flex;
        gap: 0.5rem;
    }

    .service-review-card-rating-number-divisor
    {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }

    .service-review-card-text-container
    {
        margin-bottom: 1.5rem;
    }

    .service-review-card-show-more.visible
    {
        display: block;
    }

    .service-review-card-show-more
    {
        display: none;

        background-color: unset;
    }
</style>
