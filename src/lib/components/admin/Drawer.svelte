<script>
    import DrawerMenu from '$lib/components/admin/DrawerMenu.svelte';
    import { drawer } from '$lib/drawer';
</script>

<div class="admin-drawer drawer {$drawer}">
    <div class="drawer-container">
        <DrawerMenu/>
    </div>
</div>

<style type="text/scss">
    .admin-drawer
    {
        transform: translatex(-20rem);

        border-right: 0.063px solid var( --line-color );
        padding: 1rem 1rem;
    }

    .admin-drawer.is-open
    {
        position: fixed;
        transform: translatex(0px);

        height: 100%;
    }

    .drawer-container
    {
        overflow: hidden;
        width: 0;

        transition: width 0.25s ease-in-out;
    }

    .drawer.is-open .drawer-container
    {
        width: calc( 20rem - ( 1.5rem * 2 ) );
        @media( min-width: 50em )
        {
            width: calc( 20rem - ( 1.5rem * 2 ) );
        }
    }
</style>
