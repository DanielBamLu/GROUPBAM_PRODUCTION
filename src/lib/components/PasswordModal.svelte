<script>
    import ListErrors from '$lib/components/ListErrors.svelte';
    import ListSuccess from '$lib/components/ListSuccess.svelte';
    import { TextField } from 'attractions';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { enhance } from '$app/forms';
    import CloseIcon from '$lib/components/icon/Close.svelte';

    let errors;
    let success;

    let refresh = {}

    export let closePasswordModal = () => {}

</script>

<div class="modal">
    <div class="modal-close">
        <button class="modal-close-button" on:click={closePasswordModal}>
            <CloseIcon/>
        </button>
    </div>
    <div class="modal-container">
        {#key refresh}
            <ListErrors errors={errors} />
            <ListSuccess success={success} />
        {/key}
        <form
            method="POST"
            action="/customer/account?/editPassword"
            use:enhance={() => {
                return ( { result, update } ) => {

                    if ( result.data )
                    {
                        if ( result.data.errors )
                        {
                            success = '';
                            errors = result.data.errors;
                        }

                        if ( result.data.success )
                        {
                            errors = '';
                            success = result.data.success;
                        }
                    }

                    refresh = {}

                    if ( result.type === 'error' ) update();
                };
            }}
        >
            {#key refresh}
                <div class="modal-input">
                    <div class="modal-label">
                        {getTranslatedTextByCode( 'SettingsOldPasswordLabel' )}
                    </div>
                    <TextField
                        name="old-password"
                        type="password"
                    />
                </div>
                <div class="modal-input">
                    <div class="modal-label">
                        {getTranslatedTextByCode( 'SettingsNewPasswordLabel' )}
                    </div>
                    <TextField
                        name="new-password"
                        type="password"
                    />
                </div>
                <div class="modal-input">
                    <div class="modal-label">
                        {getTranslatedTextByCode( 'SettingsReTypeNewPasswordLabel' )}
                    </div>
                    <TextField
                        name="new-password-retype"
                        type="password"
                    />
                </div>
                <div class="modal-actions">
                    <div class="modal-button-cancel" on:click={closePasswordModal}>
                        {getTranslatedTextByCode( 'ModalCancelButton' )}
                    </div>
                    <div class="modal-button">
                        <button>{getTranslatedTextByCode( 'ModalSaveButton' )}</button>
                    </div>
                </div>
            {/key}
        </form>
    </div>
</div>
