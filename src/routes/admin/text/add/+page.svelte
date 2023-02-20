<script>
    export let data;
    import { TextField, FormField } from 'attractions';
    import { getLanguageMap } from '$lib/admin'
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { enhance } from '$app/forms';

    let language = getLanguageMap( data.languageData );
</script>

<svelte:head>
    <title>{getTranslatedTextByCode( 'NewPageTitle' )}</title>
</svelte:head>
<div class="admin-page">
    <form use:enhance method="POST">
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'TextSlugLabel' )}"
            >
                <TextField
                    name="slug"
                    required
                />
            </FormField>
        </div>
        <FormField
            name="{getTranslatedTextByCode( 'TextCodeLabel' )}"
        >
            <TextField
                name="code"
                required
            />
        </FormField>
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'TextTextLabel' )}"
            >
                <div class="text-input">
                    {#each Object.entries( language ) as [ lang, text ]}
                        {lang}
                        <TextField
                            name="text"
                            placeholder="{text}"
                            bind:value={text}
                            required
                        />
                    {/each}
                </div>
            </FormField>
        </div>
        <div class="admin-button">
            <button>{getTranslatedTextByCode( 'PublishPageButton' )}</button>
        </div>
    </form>
</div>
