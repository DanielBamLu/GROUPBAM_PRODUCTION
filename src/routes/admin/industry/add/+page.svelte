<script>
    export let data;
    import { TextField, FileDropzone, FormField } from 'attractions';
    import { getLanguageMap } from '$lib/admin'
    import { enhance } from '$app/forms';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import Image from '$lib/components/admin/Image.svelte';

    let language = getLanguageMap( data.languageData );

    let refreshIcon = {};

    let icon = new Array;

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
    <title>{getTranslatedTextByCode( 'NewPageTitle' )}</title>
</svelte:head>
<div class="admin-page">
    <form use:enhance method="POST">
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'IndustryNameLabel' )}"
            >
                <div class="text-input">
                    {#each Object.entries( language ) as [ lang, text ]}
                        {lang}
                        <TextField
                            name="name"
                            placeholder="{text}"
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
            <button>{getTranslatedTextByCode( 'PublishPageButton' )}</button>
        </div>
    </form>
</div>
