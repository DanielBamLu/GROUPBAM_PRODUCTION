<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import DrawerMenuItem from '$lib/components/admin/DrawerMenuItem.svelte';

    let menu = [
        {
            'type' : 'accordion',
            'name' : 'Services',
            'items' : [
                {
                'link' : '/admin/service',
                'name' : getTranslatedTextByCode( 'ListPageTitle' )
                },
                {
                'link' : '/admin/service/add',
                'name' : getTranslatedTextByCode( 'NewPageTitle' )
                },
            ]
        },
        {
            'type' : 'accordion',
            'name' : 'Companies',
            'items' : [
                {
                'link' : '/admin/company',
                'name' : getTranslatedTextByCode( 'ListPageTitle' )
                },
                {
                'link' : '/admin/company/add',
                'name' : getTranslatedTextByCode( 'NewPageTitle' )
                },
            ]
        },
        {
            'type' : 'accordion',
            'name' : 'Industries',
            'items' : [
                {
                'link' : '/admin/industry',
                'name' : getTranslatedTextByCode( 'ListPageTitle' )
                },
                {
                'link' : '/admin/industry/add',
                'name' : getTranslatedTextByCode( 'NewPageTitle' )
                },
            ]
        },
        {
            'type' : 'accordion',
            'name' : 'Categories',
            'items' : [
                {
                'link' : '/admin/category',
                'name' : getTranslatedTextByCode( 'ListPageTitle' )
                },
                {
                'link' : '/admin/category/add',
                'name' : getTranslatedTextByCode( 'NewPageTitle' )
                },
            ]
        },
        {
            'type' : 'accordion',
            'name' : 'Text',
            'items' : [
                {
                'link' : '/admin/text',
                'name' : getTranslatedTextByCode( 'ListPageTitle' )
                },
                {
                'link' : '/admin/text/add',
                'name' : getTranslatedTextByCode( 'NewPageTitle' )
                },
            ]
        },
        {
            'type' : 'link',
            'name' : 'Settings',
            'items' : [
                {
                'link' : '/admin/settings',
                'name' : 'Settings'
                }
            ]
        }
    ];
</script>

<div class="drawer-menu">
    {#each menu as item}
        <DrawerMenuItem data={item}/>
    {/each}
</div>

<style>
    .drawer-menu
    {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
