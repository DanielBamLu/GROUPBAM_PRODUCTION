<script>
    export let data;
    import { TextField, FormField, FileDropzone } from 'attractions';
    import ColorPicker from 'svelte-awesome-color-picker';
    import { getLanguageMap } from '$lib/admin'
    import { enhance } from '$app/forms';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import Image from '$lib/components/admin/Image.svelte';

    let language = getLanguageMap( data.languageData );

    let hex = '#0c0c0c';

    let refreshIcon = {};
    let refreshIconGray = {};
    let refreshImage = {};

    let icon = new Array;
    let iconGray = new Array;
    let image = new Array;

    let newIconArray = new Array;
    let newIconGrayArray = new Array;
    let newImageArray = new Array;

    function getBase64( image, type ) {

        if ( image.length > 0  )
        {
            if ( type == 'icon' )
            {
                newIconArray = new Array;
            }
            else if ( type == 'iconGray' )
            {
                newIconGrayArray = new Array;
            }
            else if ( type == 'image' )
            {
                newImageArray = new Array;
            }

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

                    if ( type == 'icon' )
                    {
                        newIconArray.push( newImage );
                        refreshIcon = {}
                    }
                    else if ( type == 'iconGray' )
                    {
                        newIconGrayArray.push( newImage );
                        refreshIconGray = {}
                    }
                    else if ( type == 'image' )
                    {
                        newImageArray.push( newImage );
                        refreshImage = {}
                    }
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
                name="{getTranslatedTextByCode( 'CompanyNameLabel' )}"
            >
                <TextField
                    name="name"
                    required
                />
            </FormField>
        </div>
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'CompanySummaryLabel' )}"
            >
                <div class="text-input">
                    {#each Object.entries( language ) as [ lang, text ]}
                        {lang}
                        <TextField
                            name="summary"
                            placeholder="{text}"
                            bind:value={text}
                        />
                    {/each}
                </div>
            </FormField>
        </div>
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'CompanyDescriptionLabel' )}"
            >
                <div class="text-input">
                    {#each Object.entries( language ) as [ lang, text ]}
                        {lang}
                        <TextField
                            name="description"
                            placeholder="{text}"
                            bind:value={text}
                        />
                    {/each}
                </div>
            </FormField>
        </div>
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'CompanyDomainLabel' )}"
            >
                <div class="text-input">
                    {#each Object.entries( language ) as [ lang, text ]}
                        {lang}
                        <TextField
                            name="domain"
                            placeholder="{text}"
                            bind:value={text}
                        />
                    {/each}
                </div>
            </FormField>
        </div>
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'CompanyColorLabel' )}"
            >
                <div hidden>
                    <TextField
                        name="color"
                        placeholder="{hex}"
                        bind:value={hex}
                    />
                </div>
                <ColorPicker
                    bind:hex
                />
            </FormField>
        </div>
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'CompanyIconLabel' )}"
            >
                <FileDropzone
                    accept="image/*"
                    max={1}
                    bind:files={icon}
                    fileComponent={Image}
                    on:change={() => getBase64( icon, 'icon' )}
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
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'CompanyIconGrayLabel' )}"
            >
                <FileDropzone
                    accept="image/*"
                    max={1}
                    bind:files={iconGray}
                    fileComponent={Image}
                    on:change={() => getBase64( iconGray, 'iconGray' )}
                    required
                />
                {#key refreshIconGray}
                    {#each newIconGrayArray as item}
                        <input hidden name="icon-gray-file-name" value="{item.name}"/>
                        <input hidden name="icon-gray-file-extension" value="{item.extension}"/>
                        <input hidden name="icon-gray-file-data" value="{item.dataFile}"/>
                    {/each}
                {/key}
            </FormField>
        </div>
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'CompanyImageLabel' )}"
            >
                <FileDropzone
                    accept="image/*"
                    max={1}
                    bind:files={image}
                    fileComponent={Image}
                    on:change={() => getBase64( image, 'image' )}
                    required
                />
                {#key refreshImage}
                    {#each newImageArray as item}
                        <input hidden name="image-file-name" value="{item.name}"/>
                        <input hidden name="image-file-extension" value="{item.extension}"/>
                        <input hidden name="image-file-data" value="{item.dataFile}"/>
                    {/each}
                {/key}
            </FormField>
        </div>
        <div class="admin-button">
            <button>{getTranslatedTextByCode( 'PublishPageButton' )}</button>
        </div>
    </form>
</div>
