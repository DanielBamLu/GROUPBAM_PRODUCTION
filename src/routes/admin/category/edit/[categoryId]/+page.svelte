<script>
    export let data;
    import { TextField, RadioGroup, FormField } from 'attractions';
    import { getTranslatedText, getTranslatedTextByCode } from 'senselogic-gist';
    import { enhance } from '$app/forms';

    let categoryInfo = data.categoryData;
    let title = categoryInfo.title;
    let companyId = categoryInfo.companyId;

    let company = data.companyData;
    company = company.map( function ( item ) {
        return {
            value: item.id,
            label: item.name
        };
    });
</script>

<svelte:head>
    <title>{getTranslatedText( title )}</title>
</svelte:head>
<div class="admin-page">
    <form use:enhance method="POST" action="?/edit">
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'CategoryDomainLabel' )}"
            >
                <div class="text-input">
                    {#each Object.entries( title ) as [ lang, text ]}
                        {lang}
                        <TextField
                            name="title"
                            placeholder="{text}"
                            bind:value={text}
                            required
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
