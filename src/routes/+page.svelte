<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import HomeCompany from '$lib/components/HomeCompany.svelte';
    import HomeService from '$lib/components/HomeService.svelte';
    import HomeCategory from '$lib/components/HomeCategory.svelte';
    import HomeTestimonial from '$lib/components/HomeTestimonial.svelte';

    export let data;
</script>

<svelte:head>
  <title>{getTranslatedTextByCode( 'HomepageHeaderTitle' )}</title>
</svelte:head>
<div class="homepage">
    <HomeCompany data={data}></HomeCompany>
    <HomeService data={data}></HomeService>
    <HomeCategory data={data}></HomeCategory>
    <!-- <HomeTestimonial data={data}></HomeTestimonial> -->
</div>

<style>
</style>
