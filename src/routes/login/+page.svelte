<script>
    import ListErrors from '$lib/components/ListErrors.svelte';
    import { TextField } from 'attractions';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    let errors;

    export let data;

    const gotoRegister = () => {
        goto( '/register' )
    }
</script>

<svelte:head>
    <title>{getTranslatedTextByCode( 'LoginPageLabel' )}</title>
</svelte:head>

<div class="login auth">
    <div class="auth-container">
        <ListErrors errors={errors} />
        <div class="auth-welcome">
            {getTranslatedTextByCode( 'WelcomeMessageLabel' )}
        </div>
        <div class="auth-account">
            <div class="auth-account-label">
                {getTranslatedTextByCode( 'DontHaveAnAccountLabel' )}
            </div>
            <button class="auth-account-link" on:click={gotoRegister}>
                {getTranslatedTextByCode( 'SignUpButton' )}
            </button>
        </div>
        <form
            method="POST"
            action="/login?/login"
            use:enhance={() => {
                return ( { result, update } ) => {

                    if ( result.data )
                    {
                        if ( result.data.errors )
                        {
                            errors = result.data.errors;
                        }
                    }
                    update();
                };
            }}
        >
            <div class="auth-input">
                <div class="auth-label">
                    {getTranslatedTextByCode( 'LoginEmailLabel' )}
                </div>
                <TextField
                    name="email"
                    type="email"
                    required
                />
            </div>
            <div class="auth-input">
                <div class="auth-label">
                    {getTranslatedTextByCode( 'LoginPasswordLabel' )}
                </div>
                <TextField
                    name="password"
                    type="password"
                    required
                />
            </div>
            <div class="auth-account">
                <div class="auth-account-label">
                    {getTranslatedTextByCode( 'ForgotPasswordLabel' )}
                </div>
                <button class="auth-account-link">
                    {getTranslatedTextByCode( 'RecoverLabel' )}
                </button>
            </div>
            <div class="auth-button">
                <button>{getTranslatedTextByCode( 'LoginSignInButton' )}</button>
            </div>
        </form>
        <div class="auth-separator">
            {getTranslatedTextByCode( 'OrLabel' )}
        </div>
        <div class="auth-google">
            <a href="/auth/login">
                <img alt="Google" src="/image/google.svg" />
                <div class="auth-google-label">
                    {getTranslatedTextByCode( 'ContinueWithGoogleLabel' )}
                </div>
            </a>
        </div>
    </div>
</div>
