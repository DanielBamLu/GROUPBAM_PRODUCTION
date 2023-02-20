<script>
    import { page } from '$app/stores';
    import { getTranslatedTextByCode } from 'senselogic-gist';
</script>

<svelte:head>
    <title>{$page.status}</title>
</svelte:head>

<div>
    {#if $page.status === 404}
        <h1>{getTranslatedTextByCode( 'NotFoundLabel' )}</h1>
    {:else}
        <h1>{getTranslatedTextByCode( 'SomethingWentWrongLabel' )}</h1>
    {/if}
</div>

<style>
    h1 {
        margin: 4em 0;

        text-align: center;
    }

    @media (min-width: 480px) {
        h1 {
            font-size: 4em;
        }
    }
</style>
