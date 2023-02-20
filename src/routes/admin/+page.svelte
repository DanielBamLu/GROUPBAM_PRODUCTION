<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { Button } from 'attractions';
</script>

<svelte:head>
    <title>Admin</title>
</svelte:head>
<div class="admin">
    <div class="admin-title">
        {getTranslatedTextByCode( 'AdminButton' )}
    </div>
    <div class="admin-container">
        <div>
            <Button filled ><a href="/admin/service">{getTranslatedTextByCode( 'ServiceButton' )}</a></Button>
        </div>
        <div>
            <Button filled ><a href="/admin/company">{getTranslatedTextByCode( 'CompanyButton' )}</a></Button>
        </div>
        <div>
            <Button filled ><a href="/admin/industry">{getTranslatedTextByCode( 'IndustryButton' )}</a></Button>
        </div>
        <div>
            <Button filled ><a href="/admin/category">{getTranslatedTextByCode( 'CategoryButton' )}</a></Button>
        </div>
        <div>
            <Button filled ><a href="/admin/text">{getTranslatedTextByCode( 'TextButton' )}</a></Button>
        </div>
        <div>
            <Button filled ><a href="/admin/settings">{getTranslatedTextByCode( 'SettingsButton' )}</a></Button>
        </div>
    </div>
</div>

<style>
    .admin
    {
        padding: 2rem;

        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .admin-container
    {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .admin a
    {
        color: var( --white-color );
    }
</style>
