<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { clickOutside } from '$lib/clickOutside.js';
    import { Modal } from 'attractions';
    import FilterModal from '$lib/components/FilterModal.svelte';
    import SortModal from '$lib/components/SortModal.svelte';
    import SortIcon from '$lib/components/icon/Sort.svelte';
    import FilterIcon from '$lib/components/icon/Filter.svelte';

    export let data;
    export let sort = () => {}

    function closeModalFilter() {
        if ( modalFilterOpen )
        {
            modalFilterOpen = false;
        }
    }

    function closeModalSort() {
        if ( modalSortOpen )
        {
            modalSortOpen = false;
        }
    }

    let modalFilterOpen = false;
    let modalSortOpen = false;
</script>

<div class="filter-sort">
    <button class="filter-sort-container filter" on:click={() => modalFilterOpen = true}>
        <div class="filter-sort-icon">
            <FilterIcon/>
        </div>
        <div class="filter-sort-label">
            {getTranslatedTextByCode( 'FilterLabel' )}
        </div>
    </button>
    <button class="filter-sort-container sort" on:click={() => modalSortOpen = true}>
        <div class="filter-sort-icon">
            <SortIcon/>
        </div>
        <div class="filter-sort-label">
            {getTranslatedTextByCode( 'SortLabel' )}
        </div>
    </button>
</div>

{#if modalFilterOpen}
    <Modal bind:open={modalFilterOpen}>
        <div class="modal-filter" use:clickOutside on:click_outside={closeModalFilter}>
            <FilterModal closeModalFilter={closeModalFilter} data={data}/>
        </div>
    </Modal>
{/if}

{#if modalSortOpen}
    <Modal bind:open={modalSortOpen}>
        <div class="modal-sort" use:clickOutside on:click_outside={closeModalSort}>
            <SortModal closeModalSort={closeModalSort} sort={sort}/>
        </div>
    </Modal>
{/if}

<style type="text/scss">
    .filter-sort
    {
        z-index: 999;
        position: fixed;
        bottom: 0;
        left: 0;

        height: 3rem;
        width: 100%;

        display: flex;
        justify-content: space-between;
        align-items: center;
        @media( min-width: 65em )
        {
            position: relative;

            flex-basis: 30rem;
        }
    }

    .filter-sort-container
    {
        height: 100%;

        display: flex;
        flex: 1;
        gap: 1rem;
        justify-content: center;
        align-items: center;

        background-color: var( --black-color );
    }

    .filter
    {
        background-color: var( --blue-color );
    }

    .modal-filter,
    .modal-sort
    {
        z-index: 1001;
        position: fixed;

        height: 100%;
        width: 100%;
        @media( min-width: 65em )
        {
            position: relative;

            height: unset;
            width: unset;
        }
    }
</style>
