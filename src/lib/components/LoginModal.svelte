<script>
    import { TextField } from 'attractions';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { enhance } from '$app/forms';
    import { auth } from '$lib/auth';
    import CloseIcon from '$lib/components/icon/Close.svelte';
    import ListErrors from '$lib/components/ListErrors.svelte';

    let errors;

    export let handleModalAuth = () => {}

    function openRegister() {
        $auth = 'register';
    }

    let refresh = {}
</script>

<div class="login modal">
    <div class="modal-close">
        <button class="modal-close-button" on:click={handleModalAuth}>
            <CloseIcon/>
        </button>
    </div>
    <div class="modal-container">
        {#key refresh}
            <ListErrors errors={errors} />
        {/key}
        <div class="modal-welcome">
            {getTranslatedTextByCode( 'WelcomeMessageLabel' )}
        </div>
        <div class="modal-account">
            <div class="modal-account-label">
                {getTranslatedTextByCode( 'DontHaveAnAccountLabel' )}
            </div>
            <button class="modal-account-link" on:click={openRegister}>{getTranslatedTextByCode( 'SignUpButton' )}</button>
        </div>
        <form
            method="POST"
            action="/login"
            use:enhance={() => {
                return ( { result, update } ) => {

                    if ( result.data )
                    {
                        if ( result.data.errors )
                        {
                            errors = result.data.errors;
                        }
                    }

                    refresh = {}

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
                <img alt="Google" src="/image/google.svg" />
                <div class="modal-google-label">
                    {getTranslatedTextByCode( 'ContinueWithGoogleLabel' )}
                </div>
            </a>
        </div>
    </div>
</div>
