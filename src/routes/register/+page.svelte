<script>
    import ListErrors from '$lib/components/ListErrors.svelte';
    import { TextField, FormField } from 'attractions';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    let errors;

    const gotoLogin = () => {
        goto( '/login' )
    }
</script>

<svelte:head>
    <title>{getTranslatedTextByCode( 'RegisterPageLabel' )}</title>
</svelte:head>

<div class="register auth">
    <div class="auth-container">
        <ListErrors errors={errors} />
        <div class="auth-welcome">
            {getTranslatedTextByCode( 'WelcomeMessageLabel' )}
        </div>
        <div class="auth-account">
            <div class="auth-account-label">
                {getTranslatedTextByCode( 'HaveAnAccountLabel' )}
            </div>
            <button class="auth-account-link" on:click={gotoLogin}>
                {getTranslatedTextByCode( 'SignInButton' )}
            </button>
        </div>
        <form
            method="POST"
            action="/register"
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
                    {getTranslatedTextByCode( 'RegisterPseudonymLabel' )}
                </div>
                <TextField
                    name="pseudonym"
                    type="text"
                    placeholder="Pseudonym"
                    required
                />
            </div>
            <div class="auth-input">
                <div class="auth-label">
                    {getTranslatedTextByCode( 'RegisterFirstNameLabel' )}
                </div>
                <TextField
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    required
                />
            </div>
            <div class="auth-input">
                <div class="auth-label">
                    {getTranslatedTextByCode( 'RegisterLastNameLabel' )}
                </div>
                <TextField
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    required
                />
            </div>
            <div class="auth-input">
                <div class="auth-label">
                    {getTranslatedTextByCode( 'RegisterEmailLabel' )}
                </div>
                <TextField
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                />
            </div>
            <div class="auth-input">
                <div class="auth-label">
                    {getTranslatedTextByCode( 'RegisterPasswordLabel' )}
                </div>
                <TextField
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                />
            </div>
            <div class="auth-button">
                <button>{getTranslatedTextByCode( 'RegisterSignUpButton' )}</button>
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
