<script>
    export let data;
    import { TextField, RadioGroup, FormField } from 'attractions';
    import { getLanguageMap } from '$lib/admin'
    import { enhance } from '$app/forms';
    import { getTranslatedTextByCode } from 'senselogic-gist';

    let language = getLanguageMap( data.languageData );

    let company = data.companyData;
    company = company.map(function ( item ) {
        return {
            value: item.id,
            label: item.name
        };
    });
</script>

<svelte:head>
    <title>{getTranslatedTextByCode( 'NewPageTitle' )}</title>
</svelte:head>
<div class="admin-page">
    <form use:enhance method="POST">
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'CategoryTitleLabel ' )}"
            >
                <div class="text-input">
                    {#each Object.entries( language ) as [ lang, text ]}
                        {lang}
                        <TextField
                            name="title"
                            placeholder="{text}"
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
                    items={company}
                    required
                />
            </FormField>
        </div>
        <div class="admin-button">
            <button>{getTranslatedTextByCode( 'PublishPageButton' )}</button>
        </div>
    </form>
</div>
