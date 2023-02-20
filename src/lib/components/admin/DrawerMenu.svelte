<script>
    import DrawerMenuItem from '$lib/components/admin/DrawerMenuItem.svelte';

    let menu = [
        {
            'type' : 'accordion',
            'name' : 'Services',
            'items' : [
                {
                'link' : '/admin/service',
                'name' : 'List'
                },
                {
                'link' : '/admin/service/add',
                'name' : 'Add new'
                },
            ]
        },
        {
            'type' : 'accordion',
            'name' : 'Companies',
            'items' : [
                {
                'link' : '/admin/company',
                'name' : 'List'
                },
                {
                'link' : '/admin/company/add',
                'name' : 'Add new'
                },
            ]
        },
        {
            'type' : 'accordion',
            'name' : 'Industries',
            'items' : [
                {
                'link' : '/admin/industry',
                'name' : 'List'
                },
                {
                'link' : '/admin/industry/add',
                'name' : 'Add new'
                },
            ]
        },
        {
            'type' : 'accordion',
            'name' : 'Categories',
            'items' : [
                {
                'link' : '/admin/category',
                'name' : 'List'
                },
                {
                'link' : '/admin/category/add',
                'name' : 'Add new'
                },
            ]
        },
        {
            'type' : 'accordion',
            'name' : 'Text',
            'items' : [
                {
                'link' : '/admin/text',
                'name' : 'List'
                },
                {
                'link' : '/admin/text/add',
                'name' : 'Add new'
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
