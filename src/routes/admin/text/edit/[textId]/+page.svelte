<script>
    import { TextField, FormField } from 'attractions';
    import { enhance } from '$app/forms';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { afterNavigate } from '$app/navigation';
    import { completeLanguageMap } from '$lib/admin'
    import ListErrors from '$lib/components/ListErrors.svelte';
    import ListSuccess from '$lib/components/ListSuccess.svelte';

    export let data;

    let errors;
    let success;

    let refresh = {}

    afterNavigate( ( { from } ) => {
        if ( from )
        {
            
            if ( from.route.id === '/admin/text/add' )
            {
                success = getTranslatedTextByCode( 'SuccessfullyAddedLabel' )
                refresh = {}
            }
        }
    })

    let textInfo = data.textData;

    let code = textInfo.code;
    let slug = textInfo.slug;
    let text = completeLanguageMap( textInfo.text, data.languageData )
</script>

<svelte:head>
    <title>{slug}</title>
</svelte:head>
<div class="admin-page">
    {#key refresh}
        <ListErrors errors={errors} />
        <ListSuccess success={success} />
    {/key}
    <form 
        method="POST" 
        action="?/edit"
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
                            bind:value={text}
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
