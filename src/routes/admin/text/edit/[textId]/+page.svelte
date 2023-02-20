<script>
    export let data;
    import { TextField, FormField } from 'attractions';
    import { enhance } from '$app/forms';
    import { getTranslatedTextByCode } from 'senselogic-gist';

    let textInfo = data.textData;

    let code = textInfo.code;
    let slug = textInfo.slug;
    let text = textInfo.text;
</script>

<svelte:head>
    <title>{slug}</title>
</svelte:head>
<div class="admin-page">
    <form use:enhance method="POST" action="?/edit">
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'TextSlugLabel' )}"
            >
                <TextField
                    name="slug"
                    value={slug}
                    required
                />
            </FormField>
        </div>
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'TextCodeLabel' )}"
            >
                <TextField
                    name="code"
                    value={code}
                    required
                />
            </FormField>
        </div>
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'TextTextLabel' )}"
            >
                <div class="text-input">
                    {#each Object.entries( text ) as [ lang, text ]}
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
            <button>{getTranslatedTextByCode( 'SavePageButton' )}</button>
        </div>
    </form>
    <form use:enhance method="POST" action="?/delete">
        <div class="admin-button">
            <button class="danger">
                {getTranslatedTextByCode( 'DeletePageButton' )}
            </button>
        </div>
    </form>
</div>
