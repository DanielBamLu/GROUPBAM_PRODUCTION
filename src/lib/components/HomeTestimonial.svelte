<script>
    import TestimonialCard from '$lib/components/HomeTestimonialCard.svelte';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import Carousel from '@beyonk/svelte-carousel'

    export let data;
</script>

<div class="home-testimonial">
    <div class="home-testimonial-title testimonial-section-title">
        {getTranslatedTextByCode( 'TestimonialsBlockTitle' )}
    </div>
    <div class="home-testimonial-container">
        <h2 class="home-testimonial-container-title testimonial-title">
            {getTranslatedTextByCode( 'TestimonialsTitle' )}
        </h2>
        <div class="home-testimonial-container-description testimonial-description">
            {getTranslatedTextByCode( 'TestimonialsText' )}
        </div>
        <div class="home-testimonial-container-view-all inverted-button">
            {getTranslatedTextByCode( 'ViewAllButton' )}
        </div>
        <div class="home-testimonial-container-cards" id="home-testimonial-container-cards">
            <Carousel dots = {false} loop = {false} perPage = {{1600: 3, 1024 : 2}}>
                <span class="control left-control" slot="left-control">
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="57" viewBox="0 0 56 57" fill="none">
                        <rect y="0.5" width="56" height="56" rx="28" fill="#F5F5F5"/>
                        <path d="M29 34.5L23 28.5L29 22.5" stroke="#006BCE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                {#each data.testimonialArray as testimonial}
                    <TestimonialCard testimonialData={testimonial}>
                    </TestimonialCard>
                {/each}
                <span class="control right-control" slot="right-control">
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="57" viewBox="0 0 56 57" fill="none">
                        <rect y="0.5" width="56" height="56" rx="28" fill="#F5F5F5"/>
                        <path d="M27 34.5L33 28.5L27 22.5" stroke="#006BCE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </Carousel>
        </div>
    </div>
</div>

<style type="text/scss">
    .home-testimonial
    {
        margin-bottom: 13rem;
        padding-top: 12.5rem;

        text-align: center;
    }

    .home-testimonial-container-description
    {
        margin-bottom: 1.5rem;
    }

    .home-testimonial-container-view-all
    {
        margin: auto;
        margin-bottom: 2rem;
        width: fit-content;
        border-radius: 2rem;
        padding: 1rem 2rem;

        text-align: center;

        cursor: pointer;
    }

    .right-control{
        margin-right: -4rem;
        @media( min-width: 65em )
        {
            margin-right: -7rem;
        }
    }

    .left-control{
        margin-left: -4rem;
        @media( min-width: 65em )
        {
            margin-left: -7rem;
        }
    }
</style>
