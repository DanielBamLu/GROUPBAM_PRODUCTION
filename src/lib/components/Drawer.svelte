<script>
    import DrawerServiceIndustry from '$lib/components/DrawerServiceIndustry.svelte';
    import DrawerServiceCompanyDomain from '$lib/components/DrawerServiceCompanyDomain.svelte';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { drawer } from '$lib/drawer';

    export let data;
</script>

<div class="drawer {$drawer}">
    <div class="drawer-container">
        <div class="drawer-container-industry">
            <div class="drawer-container-industry-title drawer-section-title">
                {getTranslatedTextByCode( 'FilterByIndustryTitle' )}
            </div>
            <DrawerServiceIndustry data={data} />
        </div>
        <div class="drawer-container-company-domain">
            <DrawerServiceCompanyDomain data={data} />
        </div>
    </div>
</div>

<style type="text/scss">
    .drawer
    {
        transform: translatex(-20rem);

        border-right: 0.063px solid var( --line-color );
        padding: 1rem 1rem;
    }

    .drawer.is-open
    {
        transform: translatex(0px);
    }

    .drawer.is-open .drawer-container
    {
        width: calc( 15rem - ( 1.5rem * 2 ) );
        @media( min-width: 50em )
        {
            width: calc( 20rem - ( 1.5rem * 2 ) );
        }
    }

    .drawer-container .drawer-container-company-domain
    {
        height: 0;

        opacity: 0;
    }
    .drawer.is-open .drawer-container .drawer-container-company-domain
    {
        height: auto;

        opacity: 1;

        transition: opacity .3s 0.25s, height 1s 1s;
    }

    .drawer-container .drawer-container-industry-title
    {
        height: 0;

        display: none;

        opacity: 0;
    }

    .drawer.is-open .drawer-container .drawer-container-industry-title
    {
        height: auto;

        display: block;

        opacity: 1;

        transition: opacity .3s 0.25s, height 1s 1s;
    }

    .drawer-container-sing-in::after
    {
        margin-top: 1.5rem;
        height: 0.063rem;
        width: 100%;

        display: block;

        content: "";
        background-color: var( --line-color );
    }
</style>
