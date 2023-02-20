<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';

    export let testimonialData;
</script>

<div class="home-testimonial-card">
    <div class="home-testimonial-card-image">
        <img src="{testimonialData.imagePath}" alt="">
    </div>
    <div class="home-testimonial-card-name testimonial-card-name">
        {testimonialData.author}
    </div>
    <div class="home-testimonial-card-role-company testimonial-card-company">
        {testimonialData.role} {getTranslatedTextByCode( 'AtPrepositionText' )} {testimonialData.company}
    </div>
    <div class="home-testimonial-card-description testimonial-card-description">
        {testimonialData.text}
    </div>
</div>

<style type="text/scss">
    .home-testimonial-card
    {
        margin: 0 5rem 0 5rem;
        height: 100%;
        border: 0.063rem solid var( --line-color );
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;

        text-align: left;
        @media( min-width: 65em )
        {
            margin: 0 3rem 0 3rem;
        }
    }

    .home-testimonial-card-image img
    {
        width: 100%;
    }

    .home-testimonial-card-image
    {
        margin-bottom: 3em;
    }

    .home-testimonial-card-name
    {
        margin-bottom: 0.25em;
    }

    .home-testimonial-card-role-company
    {
        margin-bottom: 1.5em;
    }
</style>
