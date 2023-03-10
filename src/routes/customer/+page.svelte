<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import Cart from '$lib/components/Cart.svelte';
    import Saved from '$lib/components/Saved.svelte';
    import Orders from '$lib/components/Orders.svelte';

    export let data;
</script>

<svelte:head>
  <title>{getTranslatedTextByCode( 'DashboardTitle' )}</title>
</svelte:head>

<div class="customer">
  <div class="customer-cart-saved">
    <Cart/>
    <Saved data={data.serviceSaved}/>
  </div>
  <div class="customer-orders">
    <Orders data={data.orders}/>
  </div>
</div>

<style>
</style>
