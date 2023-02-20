<script>
    import { getTranslatedText } from 'senselogic-gist';

    export let data;
</script>

<div class="category-filter">
    {#each data as category}
        <a href="/services/{category.slug}">
            <div class="category-filter-label filter-label">
                {getTranslatedText( category.title )}
            </div>
        </a>
    {/each}
</div>

<style>
    .category-filter
    {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
    }
    .category-filter-label
    {
        height: 4rem;
        width: max-content;
        padding: 0 1.5rem;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: var( --white-color );
    }
</style>
