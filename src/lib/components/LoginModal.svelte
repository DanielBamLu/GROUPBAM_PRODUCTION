<script>
    import { TextField } from 'attractions';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import ListErrors from '$lib/components/ListErrors.svelte';
    import CloseIcon from '$lib/components/icon/Close.svelte';

    let errors;

    export let closeModalLogin = () => {}

    export let refresh = () => {}

    const gotoRegister = () => {
        closeModalLogin();
        goto( '/register' )
    }
</script>

<div class="login modal">
    <div class="modal-close">
        <button class="modal-close-button" on:click={closeModalLogin}>
            <CloseIcon/>
        </button>
    </div>
    <div class="modal-container">
        <ListErrors errors={errors} />
        <div class="modal-welcome">
            {getTranslatedTextByCode( 'WelcomeMessageLabel' )}
        </div>
        <div class="modal-account">
            <div class="modal-account-label">
                {getTranslatedTextByCode( 'DontHaveAnAccountLabel' )}
            </div>
            <button class="modal-account-link" on:click={gotoRegister}>
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
                    else
                    {
                        closeModalLogin();
                    }

                    update();
                };
            }}
        >
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'LoginEmailLabel' )}
                </div>
                <TextField
                    name="email"
                    type="email"
                    required
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'LoginPasswordLabel' )}
                </div>
                <TextField
                    name="password"
                    type="password"
                    required
                />
            </div>
            <div class="modal-account">
                <div class="modal-account-label">
                    {getTranslatedTextByCode( 'ForgotPasswordLabel' )}
                </div>
                <button class="modal-account-link">
                    {getTranslatedTextByCode( 'RecoverLabel' )}
                </button>
            </div>
            <div class="modal-button">
                <button>{getTranslatedTextByCode( 'LoginSignInButton' )}</button>
            </div>
        </form>
        <div class="modal-separator">
            {getTranslatedTextByCode( 'OrLabel' )}
        </div>
        <div class="modal-google">
            <a href="/auth/login">
                <img alt="Google" src="./image/google.svg" />
                <div class="modal-google-label">
                    {getTranslatedTextByCode( 'ContinueWithGoogleLabel' )}
                </div>
            </a>
        </div>
    </div>
</div>
