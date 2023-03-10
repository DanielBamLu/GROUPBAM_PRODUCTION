<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { sortStrings, sortNumbers } from '$lib/sort'
    import ServiceCard from '$lib/components/ServiceCard.svelte';
    import CategoryFilter from '$lib/components/CategoryFilter.svelte';
    import FilterSort from '$lib/components/FilterSort.svelte';

    export let data;

    let refresh = {}

    function sort( order ) {
        if ( order == 'alfabeticAsc' || order == 'alfabeticDesc' )
        {
            data.serviceCategory.sort( function( a, b ) {
                return sortStrings( a.info.slug, b.info.slug, order );
            } )
        }
        else if ( order == 'priceAsc' || order == 'priceDesc' )
        {
            data.serviceCategory.sort( function( a, b ) {
                return sortNumbers( a.info.unitPrice, b.info.unitPrice, order );
            } )
        }

        refresh = {}
    }

    data.serviceCategory.sort( function( a, b ) {
        return sortStrings( a.info.slug, b.info.slug, 'alfabeticAsc' );
    } )
</script>

<svelte:head>
    <title>{getTranslatedTextByCode( 'ShopServicesButton' )}</title>
</svelte:head>

{#key refresh}
    <div class="services-filter">
        <CategoryFilter data={data.categoryArray}/>
        <FilterSort data={data.industryArray} sort={sort}/>
    </div>
    <div class="services-items parent-service-card">
        {#each data.serviceCategory as item}
            <ServiceCard serviceData={item}>
            </ServiceCard>
        {/each}
    </div>
{/key}
