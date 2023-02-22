<script>
    import { TextField, FileDropzone, FormField } from 'attractions';
    import { getTranslatedText } from 'senselogic-gist';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { enhance } from '$app/forms';
    import { afterNavigate } from '$app/navigation';
    import { completeLanguageMap } from '$lib/admin';
    import Image from '$lib/components/admin/Image.svelte';
    import ListErrors from '$lib/components/ListErrors.svelte';
    import ListSuccess from '$lib/components/ListSuccess.svelte';
    
    export let data;

    let errors;
    let success;

    let industryInfo = data.industryData;

    let name = completeLanguageMap( industryInfo.name, data.languageData );

    let iconPath = industryInfo.iconPath;

    let refreshIcon = {};

    let refresh = {}

    afterNavigate( ( { from } ) => {
        if ( from )
        {
            
            if ( from.route.id === '/admin/industry/add' )
            {
                success = getTranslatedTextByCode( 'SuccessfullyAddedLabel' )
                refresh = {}
            }
        }
    })

    let icon = new Array;

    if ( industryInfo.iconPath )
    {
        icon.push( {name : industryInfo.iconPath} )
    }

    let newIconArray = new Array;

    function getBase64( image ) {

        if ( image.length>0 )
        {
            newIconArray = new Array;

            for ( let indexImage=0; indexImage<image.length; indexImage++ )
            {
                let file = image[ indexImage ].name.split( '.' );

                let newImage = {
                    name : file[ 0 ],
                    extension : file[ 1 ],
                    dataFile : ''
                }

                const reader = new FileReader();

                reader.readAsDataURL( image[ indexImage ] );

                reader.onload = e => {
                    const imageData = e.target.result.split( ',' );
                    newImage.dataFile = imageData[ 1 ];

                    newIconArray.push( newImage );
                    refreshIcon = {}
                };
            }
        }
    };
</script>

<svelte:head>
    <title>{getTranslatedText( name )}</title>
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
                name="{getTranslatedTextByCode( 'IndustryNameLabel' )}"
            >
                <div class="text-input">
                    {#each Object.entries( name ) as [ lang, text ]}
                        {lang}
                        <TextField
                            name="name"
                            bind:value={text}
                        />
                    {/each}
                </div>
            </FormField>
        </div>
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'IndustryIconLabel' )}"
            >
                <FileDropzone
                    accept="image/*"
                    max={1}
                    bind:files={icon}
                    fileComponent={Image}
                    on:change={() => getBase64( icon )}
                    required
                />
                <input hidden name="iconPath" value={iconPath}/>
                {#key refreshIcon}
                    {#each newIconArray as item}
                        <input hidden name="icon-file-name" value="{item.name}"/>
                        <input hidden name="icon-file-extension" value="{item.extension}"/>
                        <input hidden name="icon-file-data" value="{item.dataFile}"/>
                    {/each}
                {/key}
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
