<script>
    import { getTranslatedText } from 'senselogic-gist';
    import IndustryService from '$lib/components/IndustryService.svelte';

    export let data;
</script>

<svelte:head>
    <title>{getTranslatedText( data.industry.name )}</title>
</svelte:head>
<div class="industry">
    <IndustryService data={data}/>
</div>

<style>
    .industry
    {
      padding-left: 3rem;
      padding-right: 3rem;
    }
</style>
