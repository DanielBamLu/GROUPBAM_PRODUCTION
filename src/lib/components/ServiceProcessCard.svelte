<script>
    import { getTranslatedText } from 'senselogic-gist';
    import ArrowIcon from '$lib/components/icon/Arrow.svelte';

    export let processData;
</script>

<div class="process-card">
    <div class="process-card-number card-title">
        <div class="process-card-number-label">
            {processData.number}
        </div>
        <div class="process-card-number-arrow">
            <ArrowIcon data="scaling"/>
        </div>
    </div>
    <div class="process-card-container">
        <div class="process-card-title card-title">
            { getTranslatedText( processData.name) }
        </div>
        <div class="process-card-description card-description">
            { getTranslatedText( processData.description) }
        </div>
    </div>
</div>

<style type="text/scss">
    .process-card
    {
        display: flex;
        flex-direction: row;
        gap: 3rem;
        align-items: flex-start;
        @media( min-width: 65em )
        {
            flex-direction: column;
            gap: 2rem;
            align-items: stretch;
        }
    }

    .process-card:last-child .process-card-number .process-card-number-arrow
    {
        display: none;
    }

    .process-card-number
    {
        display: flex;
        gap: 1rem;
        align-items: center;
        @media( min-width: 65em )
        {
            gap: 2rem;
        }
    }

    .process-card-number-label
    {
        height: 4rem;
        min-width: 4rem;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: var( --black-color );

        color: white;
        @media( min-width: 65em )
        {
            height: 6rem;
            min-width: 6rem;
        }
    }

    .process-card-number-arrow
    {
        position: relative;

        height: 0;
        width: 100%;
        padding: 0;
        padding-bottom: 10%;

        display: none;
        @media( min-width: 65em )
        {
            display: block;
        }
    }

    .process-card-title
    {
        margin-bottom: 1.5rem;
    }
</style>
