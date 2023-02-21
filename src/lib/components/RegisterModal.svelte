<script>
    import ListErrors from '$lib/components/ListErrors.svelte';
    import { TextField } from 'attractions';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import CloseIcon from '$lib/components/icon/Close.svelte';

    let errors;

    export let closeModalRegister = () => {}

    const gotoLogin = () => {
        closeModalRegister();
        goto( '/register' )
    }
</script>

<svelte:head>
    <title>{getTranslatedTextByCode( 'RegisterPageLabel' )}</title>
</svelte:head>

<div class="register modal">
    <div class="modal-close">
        <button class="modal-close-button" on:click={closeModalRegister}>
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
                {getTranslatedTextByCode( 'HaveAnAccountLabel' )}
            </div>
            <button class="modal-account-link" on:click={gotoLogin}>
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
                    else
                    {
                        closeModalRegister();
                    }

                    update();

                };
            }}
        >
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'RegisterPseudonymLabel' )}
                </div>
                <TextField
                    name="pseudonym"
                    type="text"
                    placeholder="Pseudonym"
                    required
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'RegisterFirstNameLabel' )}
                </div>
                <TextField
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    required
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'RegisterLastNameLabel' )}
                </div>
                <TextField
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    required
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'RegisterEmailLabel' )}
                </div>
                <TextField
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'RegisterPasswordLabel' )}
                </div>
                <TextField
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                />
            </div>
            <div class="modal-button">
                <button>{getTranslatedTextByCode( 'RegisterSignUpButton' )}</button>
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
