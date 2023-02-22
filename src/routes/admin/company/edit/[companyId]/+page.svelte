<script>
    import { TextField, FileDropzone, FormField } from 'attractions';
    import { enhance } from '$app/forms';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { afterNavigate } from '$app/navigation';
    import { completeLanguageMap } from '$lib/admin';
    import ColorPicker from 'svelte-awesome-color-picker';
    import Image from '$lib/components/admin/Image.svelte';
    import ListErrors from '$lib/components/ListErrors.svelte';
    import ListSuccess from '$lib/components/ListSuccess.svelte';
    
    export let data;

    let errors;
    let success;

    let refresh = {}

    afterNavigate( ( { from } ) => {
        if ( from )
        {
            
            if ( from.route.id === '/admin/company/add' )
            {
                success = getTranslatedTextByCode( 'SuccessfullyAddedLabel' )
                refresh = {}
            }
        }
    })

    let companyInfo = data.companyData;

    let name = companyInfo.name;
    let summary = completeLanguageMap( companyInfo.summary, data.languageData );
    let description = completeLanguageMap( companyInfo.description, data.languageData );
    let domain = completeLanguageMap( companyInfo.domain, data.languageData );
    let color = companyInfo.color;

    let hex = color;

    let iconPath = companyInfo.iconPath;
    let iconGrayPath = companyInfo.iconGrayPath;
    let imagePath = companyInfo.imagePath;

    let refreshIcon = {};
    let refreshIconGray = {};
    let refreshImage = {};


    let icon = new Array;
    let iconGray = new Array;
    let image = new Array;

    if ( companyInfo.iconPath )
    {
        icon.push( {name : companyInfo.iconPath} )
    }

    if ( companyInfo.iconGrayPath )
    {
        iconGray.push( {name : companyInfo.iconGrayPath} )
    }

    if ( companyInfo.imagePath )
    {
        image.push( {name : companyInfo.imagePath} )
    }

    let newIconArray = new Array;
    let newIconGrayArray = new Array;
    let newImageArray = new Array;

    function getBase64( image, type ) {

        if ( image.length>0 )
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
    <title>{ name }</title>
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
                name="{getTranslatedTextByCode( 'CompanyNameLabel' )}"
            >
                <TextField
                    name="name"
                    placeholder="{name}"
                    bind:value={name}
                    required
                />
            </FormField>
        </div>
        <div class="admin-section">
            <FormField
                name="{getTranslatedTextByCode( 'CompanySummaryLabel' )}"
            >
                <div class="text-input">
                    {#each Object.entries( summary ) as [ lang, text ]}
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
                    {#each Object.entries( description ) as [ lang, text ]}
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
                    {#each Object.entries( domain ) as [ lang, text ]}
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
                <input hidden name="iconGrayPath" value={iconGrayPath}/>
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
                <input hidden name="imagePath" value={imagePath}/>
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
