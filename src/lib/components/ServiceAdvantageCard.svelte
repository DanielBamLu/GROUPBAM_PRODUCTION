<script>
    import { getTranslatedText } from 'senselogic-gist';

    export let advantageData;
</script>

<div class="advantage-card">
    <div class="advantage-card-image">
        <img src="{advantageData.imagePath}" alt="">
    </div>
    <div class="advantage-card-title card-title">
        {getTranslatedText( advantageData.name )}
    </div>
    <div class="advantage-card-description card-description">
        {getTranslatedText( advantageData.description )}
    </div>
</div>

<style>
    .advantage-card
    {
        position: relative;

        padding: 2rem 1.5rem;

        display: block;

        background-color: var( --white-color );
    }

    .advantage-card-image
    {
        position: relative;

        overflow: hidden;
        margin-bottom: 1.5rem;
    }

    .advantage-card-image img
    {
        height: 7.5rem;
        width: 7.5rem;
    }

    .advantage-card-title
    {
        margin-bottom: 3rem;
    }
</style>
