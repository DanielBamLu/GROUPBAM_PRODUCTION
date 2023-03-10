<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { goto, afterNavigate } from '$app/navigation';
    import { base } from '$app/paths'
    import ArrowBackIcon from '$lib/components/icon/ArrowBack.svelte';

    let previousPage = base;

    afterNavigate( ( {from} ) => {
        previousPage = from?.url.pathname || previousPage
    } )

    const goBack = () => {
        goto( previousPage )
    }
</script>

<button class="back" on:click={goBack}>
    <div class="back-arrow">
        <ArrowBackIcon data="bright"/>
    </div>
    <div class="back-label">
        {getTranslatedTextByCode( 'BackButton' )}
    </div>
</button>

<style>
    .back
    {
        display: flex;
        gap: 1rem;
        align-items: center;

        background: unset;
    }
</style>
