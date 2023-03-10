<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import DrawerServiceCategory from '$lib/components/DrawerServiceCategory.svelte';

    export let data;

    let companyArray = data.companyArray;
    let categoryArray = data.categoryArray;
</script>

<div class="drawer-service-company-domain">
    <div class="drawer-service-company-domain-title drawer-section-title">
        {getTranslatedTextByCode( 'FilterByCategoryTitle' )}
    </div>
    <ul class="drawer-service-company-domain-container">
        {#each companyArray as company}
            <DrawerServiceCategory company = {company} categoryArray = {categoryArray} />
        {/each}
    </ul>
</div>

<style>
    .drawer-service-company-domain
    {
        margin-top: 1.5rem;
    }

    .drawer-service-company-domain::after
    {
        margin-top: 1.5rem;
        height: 0.063rem;
        width: 100%;

        display: block;

        content: "";
        background-color: var( --line-color );
    }

    .drawer-service-company-domain ul
    {
        margin-bottom: 0;
        padding-left: 0;
    }

    .drawer-service-company-domain-container
    {
        margin-top: 1.5rem;
    }
</style>
