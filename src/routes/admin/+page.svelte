<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
</script>

<svelte:head>
    <title>Admin</title>
</svelte:head>
<div class="admin">
    <div class="admin-title">
        {getTranslatedTextByCode( 'AdminButton' )}
    </div>
    <div class="admin-container">
        <div class="admin-button"><a href="/admin/service">{getTranslatedTextByCode( 'ServiceButton' )}</a></div>
        <div class="admin-button"><a href="/admin/company">{getTranslatedTextByCode( 'CompanyButton' )}</a></div>
        <div class="admin-button"><a href="/admin/industry">{getTranslatedTextByCode( 'IndustryButton' )}</a></div>
        <div class="admin-button"><a href="/admin/category">{getTranslatedTextByCode( 'CategoryButton' )}</a></div>
        <div class="admin-button"><a href="/admin/text">{getTranslatedTextByCode( 'TextButton' )}</a></div>
        <div class="admin-button"><a href="/admin/settings">{getTranslatedTextByCode( 'SettingsButton' )}</a></div>
        <div class="admin-button"><a href="/admin/orders">{getTranslatedTextByCode( 'OrdersButton' )}</a></div>
        <div class="admin-button"><a href="/admin/contactus">{getTranslatedTextByCode( 'ContactUsButton' )}</a></div>
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
</style>
