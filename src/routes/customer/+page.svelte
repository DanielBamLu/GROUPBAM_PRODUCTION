<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import Cart from '$lib/components/Cart.svelte';
    import Saved from '$lib/components/Saved.svelte';

    export let data;
</script>

<svelte:head>
  <title>{getTranslatedTextByCode( 'DashboardTitle' )}</title>
</svelte:head>

<Cart/>
<Saved data={data.serviceSaved}/>
