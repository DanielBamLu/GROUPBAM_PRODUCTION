<script>
    import { TextField, RadioGroup, FormField } from 'attractions';
    import { getTranslatedText, getTranslatedTextByCode } from 'senselogic-gist';
    import { enhance } from '$app/forms';
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
            if ( from.route.id === '/admin/category/add' )
            {
                success = getTranslatedTextByCode( 'SuccessfullyAddedLabel' )
                refresh = {}
            }
        }
    } )

    let categoryInfo = data.categoryData;
    let title = completeLanguageMap( categoryInfo.title, data.languageData );
    let companyId = categoryInfo.companyId;

    let company = data.companyData;

    company = company.map( function ( item ) {
        return {
            value: item.id,
            label: item.name
        };
    } );
</script>

<svelte:head>
    <title>{getTranslatedText( title )}</title>
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
                name="{getTranslatedTextByCode( 'CategoryTitleLabel' )}"
            >
                <div class="text-input">
                    {#each Object.entries( title ) as [ lang, text ]}
                        {lang}
                        <TextField
                            name="title"
                            bind:value={text}
                        />
                    {/each}
                </div>
            </FormField>
        </div>
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'CategoryCompanyLabel' )}"
            >
                <RadioGroup
                    name="companyId"
                    bind:value="{companyId}"
                    items={company}
                    required
                />
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
