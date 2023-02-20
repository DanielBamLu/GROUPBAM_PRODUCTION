<script>
    import { slide } from 'svelte/transition';
    import { getTranslatedText } from 'senselogic-gist';
    import ChevronIcon from '$lib/components/icon/Chevron.svelte';

    export let company;
    export let categoryArray;

    let isOpen = false;
    const toggle = () => isOpen = !isOpen;
</script>

<li class="drawer-service-category">
    <div class="drawer-service-category-button">
        <button on:click={toggle} aria-expanded={isOpen}>
            <div class="drawer-service-category-button-title drawer-label">
                {getTranslatedText( company.domain )}
            </div>
            <div class="drawer-service-category-button-arrow">
                <ChevronIcon data="blue bottom"/>
            </div>
        </button>
    </div>
    <div class="drawer-service-category-container">
        {#each categoryArray as category}
            {#if isOpen}
                <ul transition:slide={{ duration: 300 }}>
                    {#if company.id === category.companyId}
                        <li>
                            <a class="drawer-category-label" href="/services/{category.slug}">
                                {getTranslatedText( category.title )}
                            </a>
                        </li>
                    {/if}
                </ul>
            {/if}
        {/each}
    </div>
</li>

<style>
    .drawer-service-category
    {
        margin-bottom: 1.5rem;
    }

    .drawer-service-category-button button
    {
        width: 100%;

        display: flex;
        justify-content: space-between;

        background-color: unset;
    }

    .drawer-service-category-button .drawer-service-category-button-arrow {
        margin-right: 0.188rem;

        transition: transform 0.2s ease-in;
    }

    .drawer-service-category-button [aria-expanded=true] .drawer-service-category-button-arrow
    {
        transform: rotate(0.25turn);
    }

    .drawer-service-category-container ul
    {
        margin-bottom: 0.5rem;
    }

    .drawer-service-category-container ul:last-child
    {
        margin-bottom: 0;
    }

    .drawer-service-category-container ul li a
    {
        color: var( --black-color );
    }
</style>
