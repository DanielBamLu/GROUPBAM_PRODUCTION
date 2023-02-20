<script>
    import { getTranslatedText } from 'senselogic-gist';

    export let data;

    let industryArray = data.industryArray;
</script>

<div class="drawer-service-industry">
    <ul class="drawer-service-industry-container">
        {#each industryArray as industry}
            <li>
                <a href="/industry/{industry.slug}" title={getTranslatedText( industry.name )}>
                    <img src="{industry.iconPath}" alt="">
                    <div class="drawer-label">{getTranslatedText( industry.name )}</div>
                </a>
            </li>
        {/each}
    </ul>
</div>

<style>
    .drawer-service-industry::after
    {
        margin-top: 1.5rem;
        height: 0.063rem;
        width: 100%;

        display: block;

        content: "";
        background-color: var( --line-color );
    }

    .drawer-service-industry ul
    {
        margin-bottom: 0;
        padding-left: 0;
    }

    .drawer-service-industry-container li
    {
        margin-top: 2.25rem;
    }

    .drawer-service-industry-container a
    {
        display: flex;
        align-items: center;
    }

    .drawer-service-industry-container li img
    {
        margin-left: 0.25rem;
        width: 1.5rem;
    }

    .drawer-service-industry-container li div
    {
        margin-left: 0.875rem;

        white-space: nowrap;
    }
</style>
