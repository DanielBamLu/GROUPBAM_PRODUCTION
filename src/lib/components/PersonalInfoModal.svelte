<script>
    import ListErrors from '$lib/components/ListErrors.svelte';
    import ListSuccess from '$lib/components/ListSuccess.svelte';
    import { TextField } from 'attractions';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { enhance } from '$app/forms';
    import CloseIcon from '$lib/components/icon/Close.svelte';

    let errors;
    let success;

    export let data;

    export let closePersonalInfoModal = () => {}

</script>

<div class="login modal">
    <div class="modal-close">
        <button class="modal-close-button" on:click={closePersonalInfoModal}>
            <CloseIcon/>
        </button>
    </div>
    <div class="modal-container">
        <ListErrors errors={errors} />
        <ListSuccess success={success} />
        <form
            method="POST"
            action="/customer/account?/editPersonalInfo"
            use:enhance={() => {
                return ( { result, update } ) => {
                    if ( result.data )
                    {
                        if ( result.data.errors )
                        {
                            errors = result.data.errors;
                        }

                        if ( result.data.success )
                        {
                            success = result.data.success;
                        }
                    }

                    if ( result.type === 'error' ) update();
                };
            }}
        >
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsPseudonymLabel' )}
                </div>
                <TextField
                    name="pseudonym"
                    type="text"
                    placeholder="Pseudonym"
                    value={data.pseudonym}
                    required
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsFirstNameLabel' )}
                </div>
                <TextField
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    value={data.firstName}
                    required
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsLastNameLabel' )}
                </div>
                <TextField
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    value={data.lastName}
                    required
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsEmailLabel' )}
                </div>
                <TextField
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={data.email}
                    required
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsBirthDateLabel' )}
                </div>
                <TextField
                    name="date-time"
                    type="text"
                    placeholder="Date"
                    value={data.dateTime}
                    required
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsCountrySlugLabel' )}
                </div>
                <TextField
                    name="country"
                    type="text"
                    placeholder="Country"
                    value={data.countrySlug}
                    required
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsPhonePrefixLabel' )}
                </div>
                <TextField
                    name="first-phone-prefix"
                    type="text"
                    placeholder="Phone prefix"
                    value={data.firstPhonePrefix}
                    required
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsPhoneNumberLabel' )}
                </div>
                <TextField
                    name="first-phone-number"
                    type="text"
                    placeholder="Phone number"
                    value={data.firstPhoneNumber}
                    required
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsSecondPhonePrefixLabel' )}
                </div>
                <TextField
                    name="second-phone-prefix"
                    type="text"
                    placeholder="Second phone prefix"
                    value={data.secondPhonePrefix}
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsSecondPhoneNumberLabel' )}
                </div>
                <TextField
                    name="second-phone-number"
                    type="text"
                    placeholder="Second phone number"
                    value={data.secondPhoneNumber}
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsSecretQuestionLabel' )}
                </div>
                <TextField
                    name="secret-question"
                    type="text"
                    placeholder="Secret question"
                    value={data.secretQuestion}
                />
            </div>
            <div class="modal-input">
                <div class="modal-label">
                    {getTranslatedTextByCode( 'SettingsSecretAnswerLabel' )}
                </div>
                <TextField
                    name="secret-answer"
                    type="text"
                    placeholder="Secret answer"
                    value={data.secretAnswer}
                />
            </div>
            <div class="modal-actions">
                <div class="modal-button-cancel" on:click={closePersonalInfoModal}>
                    {getTranslatedTextByCode( 'ModalCancelButton' )}
                </div>
                <div class="modal-button">
                    <button>{getTranslatedTextByCode( 'ModalSaveButton' )}</button>
                </div>
            </div>
        </form>
    </div>
</div>
