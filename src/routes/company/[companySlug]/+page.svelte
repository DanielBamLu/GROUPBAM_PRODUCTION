<script>
    import CompanyService from '$lib/components/CompanyService.svelte';

    export let data;
</script>

<svelte:head>
    <title>{data.company.name}</title>
</svelte:head>
<div class="company">
    <CompanyService data={data}/>
</div>

<style>
    .company
    {
      padding-left: 3rem;
      padding-right: 3rem;
    }
</style>
