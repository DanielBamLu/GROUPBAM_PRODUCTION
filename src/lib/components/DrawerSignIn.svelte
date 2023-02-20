<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
</script>

<div class="drawer-signin">
    <div class="drawer-signin-icon">
        <img src="/image/icon/sign-in.svg" alt="">
    </div>
    <div class="drawer-signin-label">
        {getTranslatedTextByCode( 'SignInButton' )}
    </div>
</div>

<style>
    .drawer-signin
    {
        display: flex;
        align-items: center;
    }

    .drawer-signin-label
    {
        margin-left: 0.75rem;

        white-space: nowrap;
    }
</style>
