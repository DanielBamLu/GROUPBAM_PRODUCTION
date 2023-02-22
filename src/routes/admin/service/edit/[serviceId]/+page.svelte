<script>
    import { TextField, RadioGroup, FileDropzone, Switch, FormField, Button, Tabs } from 'attractions';
    import { getLanguageMap, getCurrencyMap, completeLanguageMap, completeCurrencyMap } from '$lib/admin'
    import { getTranslatedText, getTranslatedTextByCode } from 'senselogic-gist';
    import { enhance } from '$app/forms';
    import { afterNavigate } from '$app/navigation';
    import Image from '$lib/components/admin/Image.svelte';
    import ListErrors from '$lib/components/ListErrors.svelte';
    import ListSuccess from '$lib/components/ListSuccess.svelte';
    
    export let data;

    let errors;
    let success;

    let selectedTab = 'Main info';

    let refreshImage = {};
    let refreshImagePack = {};
    let refreshImageAdvantage = {};
    let refreshGallery = {};
    let refreshPack = {};
    let refreshPackInclude = {};
    let refreshAdvantage = {};
    let refreshProcess = {};
    let refreshOption = {};
    let refreshOptionVariant = {};

    let refresh = {}

    afterNavigate( ( { from } ) => {
        if ( from )
        {
            
            if ( from.route.id === '/admin/service/add' )
            {
                success = getTranslatedTextByCode( 'SuccessfullyAddedLabel' )
                refresh = {}
            }
        }
    })

    let language = getLanguageMap( data.languageData );
    let currency = getCurrencyMap( data.currencyData );

    let serviceInfo = data.serviceData;

    let servicePack = data.servicePack;

    let packImage = new Array;

    for ( let packIndex= 0; packIndex< servicePack.length ;packIndex++ )
    {
        if ( servicePack[packIndex].info.imagePath )
        {
            packImage.push( [ {name : servicePack[packIndex].info.imagePath} ] )
        }
        else
        {
            packImage.push( [] );
        }
    }

    let servicePackType = data.servicePackType;

    let serviceAdvantage = data.serviceAdvantage;

    let advantageImage = new Array;

    for ( let advantageIndex= 0; advantageIndex< serviceAdvantage.length ;advantageIndex++ )
    {
        if ( serviceAdvantage[advantageIndex].imagePath )
        {
            advantageImage.push( [ {name : serviceAdvantage[advantageIndex].imagePath} ] )
        }
        else
        {
            advantageImage.push( [] );
        }
    }

    let serviceProcess = data.serviceProcess;

    let serviceOption = data.serviceOptionArray;

    let company = data.companyData;
    let category = data.categoryData;
    let gallery = data.serviceImages;

    let featureImage = new Array;

    let galleryArray = new Array;

    for ( let galleryIndex = 0; galleryIndex < gallery.length; galleryIndex++ )
    {
        if ( gallery[ galleryIndex ].imagePath )
        {
            galleryArray.push({
            name : gallery[ galleryIndex ].imagePath,
            number: galleryIndex + 1
            })
        }
    }

    let title = '';
    let description = '';
    let highlight = '';
    let hasPrice = '';
    let imagePath = '';
    let unitTime = '';
    let unitPrice = '';
    let companyId = '';
    let categoryId = '';
    let additionalTitle = '';
    let additionalDescription = '';

    if ( serviceInfo )
    {
        title = serviceInfo.title;
        description = completeLanguageMap( serviceInfo.description, data.languageData );
        highlight = serviceInfo.highlight;
        hasPrice = serviceInfo.hasPrice;
        imagePath = serviceInfo.imagePath;
        unitTime = serviceInfo.unitTime;
        unitPrice = completeCurrencyMap( serviceInfo.unitPrice, data.currencyData );
        companyId = serviceInfo.companyId;
        categoryId = serviceInfo.categoryId;
        additionalTitle = completeLanguageMap( serviceInfo.additionalTitle, data.languageData );
        additionalDescription = completeLanguageMap( serviceInfo.additionalDescription, data.languageData );
    }

    if ( imagePath )
    {
        featureImage.push( {name : imagePath} )
    }

    if ( !highlight )
    {
        highlight = false;
    }
    else
    {
        highlight = true;
    }

    if ( !hasPrice )
    {
        hasPrice = false;
    }
    else
    {
        hasPrice = true;
    }

    let newImageArray = new Array;
    let newImagePackArray = new Array;
    let newImageAdvantageArray = new Array;
    let newGalleryArray = new Array;

    function getBase64( image, postId, index ,type ) {

        if ( image.length>0 )
        {
            if ( type == 'feature-image' )
            {
                newImageArray = new Array;
            }
            else if ( type == 'gallery' )
            {
                newGalleryArray = new Array;
            }

            for ( let indexImage=0; indexImage<image.length; indexImage++ )
            {
                let file = image[ indexImage ].name.split( '.' );

                let newImage = new Object();

                if ( type == 'feature-image' )
                {
                    newImage = {
                        name : file[ 0 ],
                        extension : file[ 1 ],
                        dataFile : ''
                    }

                    const reader = new FileReader();

                    reader.readAsDataURL( image[ indexImage ] );

                    reader.onload = e => {
                        const imageData = e.target.result.split( ',' );
                        newImage.dataFile = imageData[ 1 ];
                        newImageArray.push( newImage );
                        refreshImage = {}
                    };
                }
                else if ( type == 'pack-image' )
                {
                    newImage = {
                        index : index,
                        packId : postId,
                        name : file[ 0 ],
                        extension : file[ 1 ],
                        dataFile : ''
                    }

                    const reader = new FileReader();

                    reader.readAsDataURL( image[ indexImage ] );

                    reader.onload = e => {
                        const imageData = e.target.result.split( ',' );
                        newImage.dataFile = imageData[ 1 ];
                        newImagePackArray.push( newImage );
                        refreshImagePack = {}
                    };
                }
                else if ( type == 'advantage-image' )
                {
                    newImage = {
                        index : index,
                        advantageId : postId,
                        name : file[ 0 ],
                        extension : file[ 1 ],
                        dataFile : ''
                    }

                    const reader = new FileReader();

                    reader.readAsDataURL( image[ indexImage ] );

                    reader.onload = e => {
                        const imageData = e.target.result.split( ',' );
                        newImage.dataFile = imageData[ 1 ];
                        newImageAdvantageArray.push( newImage );
                        refreshImageAdvantage = {}
                    };
                }
                else if ( type == 'gallery' )
                {
                    newImage = {
                        name : file[ 0 ],
                        extension : file[ 1 ],
                        dataFile : '',
                        number: indexImage + 1
                    }

                    if ( image[ indexImage ] instanceof File )
                    {
                        const reader = new FileReader();

                        reader.readAsDataURL( image[ indexImage ] );

                        reader.onload = e => {
                            const imageData = e.target.result.split( ',' );
                            newImage.dataFile = imageData[ 1 ];
                            newGalleryArray.push( newImage );
                            refreshGallery = {}
                        };
                    }
                }
            }
        }
    };

    servicePackType = servicePackType.map( function ( item ) {
        return {
            value: item.id,
            label: getTranslatedText( item.name )
        };
    });

    company = company.map( function ( item ) {
        return {
            value: item.id,
            label: item.name
        };
    });

    category = category.map( function ( item ) {
        return {
            value: item.id,
            label: getTranslatedText( item.title )
        };
    });

    let newPacks = new Array();
    let indexPack = 0;
    const addPack = () => () => {
        indexPack++

        let info = {
            index: indexPack,
            name: language,
            description: language,
            price: currency,
            quantity: '',
            typeId: '',
            color: '',
            image: [],
            }

        let newPack = {
            'info' : info,
            'includes' : new Array()
        }

        newPacks.push( newPack );
        refreshPack = {}
    }

    const deletePack = ( info, isNew ) => () => {
        if ( isNew )
        {
            for ( let indexPack = 0; indexPack< newPacks.length ;indexPack++ )
            {
                var index = newPacks.indexOf( info.pack );

                if ( index !== -1 ) {
                    newPacks.splice( index, 1 );
                }

                refreshPack = {}
            }
        }
        else
        {
            for ( let indexPack = 0; indexPack< servicePack.length ;indexPack++ )
            {
                var index = servicePack.indexOf( info.pack );

                if ( index !== -1 ) {
                    servicePack.splice( index, 1 );
                }
                refreshPack = {}
            }
        }
    }

    let newIncludes = new Array();
    const addInclude = ( info, isNew ) => () => {

        if ( isNew )
        {
            let newInclude = {
                info : '',
                includes : new Array()
                }

            let include = {'text' : language};

            newInclude.info = info.pack.info;
            newInclude.includes.push( include );
            newIncludes.push( newInclude );

            refreshPackInclude = {}
        }
        else
        {
            for ( let indexPack = 0; indexPack< servicePack.length ;indexPack++ )
            {
                if ( servicePack[indexPack].info.id == info.pack.info.id )
                {
                    let newInclude = {
                        index: indexPack,
                        info : '',
                        includes : new Array()
                        }

                    let include = {'text' : language};

                    newInclude.info = info.pack.info;
                    newInclude.includes.push( include );
                    newIncludes.push( newInclude );

                    refreshPackInclude = {}
                }
            }
        }
    }

    const deleteInclude = ( info, isNew ) => () => {

        if ( isNew )
        {
            for ( let indexInclude = 0; indexInclude< newIncludes.length ;indexInclude++ )
            {
                var index = newIncludes.indexOf( info.include );

                if ( index !== -1 ) {
                    newIncludes.splice( index, 1 );
                }

                refreshPackInclude = {}
            }
        }
        else
        {
            for ( let indexPack = 0; indexPack< servicePack.length ;indexPack++ )
            {
                var index = servicePack[indexPack].includes.indexOf( info.include );

                if ( index !== -1 ) {
                    servicePack[indexPack].includes.splice( index, 1 );
                }

                refreshPackInclude = {}
            }
        }
    }

    let newAdvantages = new Array();
    let indexAdvantage = 0;
    const addAdvantage = () => () => {
        indexAdvantage++
        let newAdvantage = {
            index: indexAdvantage,
            name: language,
            description: language,
            image: []
            }

        newAdvantages.push( newAdvantage );

        refreshAdvantage = {}
    }

    const deleteAdvantage = ( info, isNew ) => () => {

        if ( isNew )
        {
            for ( let indexAvantage = 0; indexAvantage< newAdvantages.length ;indexAvantage++ )
            {
                var index = newAdvantages.indexOf( info.advantage );

                if ( index !== -1 ) {
                    newAdvantages.splice( index, 1 );
                }

                refreshAdvantage = {}
            }
        }
        else
        {
            for ( let indexAdvantage = 0; indexAdvantage< serviceAdvantage.length ;indexAdvantage++ )
            {
                var index = serviceAdvantage.indexOf( info.advantage );

                if ( index !== -1 ) {
                    serviceAdvantage.splice( index, 1 );
                }
                refreshAdvantage = {}
            }
        }
    }

    let newProcesses = new Array();
    let indexProcess = 0;
    const addProcess = ( info ) => () => {
        indexProcess++
        let newProcess = {
            index: indexProcess,
            name: language,
            description: language,
            number: '',
            }

        newProcesses.push( newProcess );

        refreshProcess = {}
    }

    const deleteProcess = ( info, isNew ) => () => {

        if ( isNew )
        {
            for ( let indexProcess = 0; indexProcess< newProcesses.length ;indexProcess++ )
            {
                var index = newProcesses.indexOf( info.process );

                if ( index !== -1 ) {
                    newProcesses.splice( index, 1 );
                }

                refreshProcess = {}
            }
        }
        else
        {
            for ( let indexProcess = 0; indexProcess< serviceProcess.length ;indexProcess++ )
            {
                var index = serviceProcess.indexOf( info.process );

                if ( index !== -1 ) {
                    serviceProcess.splice( index, 1 );
                }
                refreshProcess = {}
            }
        }
    }

    let newOptions = new Array();
    let indexOption = 0;
    const addOption = () => () => {
        indexOption++

        let option = {
            index: indexOption,
            text: language,
            description: language,
            type: '',
            }

        let newOption = {
            'option' : option,
            'optionVariant' : new Array()
        }
        newOptions.push( newOption );

        refreshOption = {}
    }

    const deleteOption = ( info, isNew ) => () => {

        if ( isNew )
        {
            for ( let indexOption = 0; indexOption< newOptions.length ;indexOption++ )
            {
                var index = newOptions.indexOf( info.option );

                if ( index !== -1 ) {
                    newOptions.splice( index, 1 );
                }

                refreshOption = {}
            }
        }
        else
        {
            for ( let indexOption = 0; indexOption< serviceOption.length ;indexOption++ )
            {
                var index = serviceOption.indexOf( info.option );

                if ( index !== -1 ) {
                    serviceOption.splice( index, 1 );
                }
                refreshOption = {}
            }
        }
    }

    let newOptionVariants = new Array();
    const addOptionVariant = ( info, isNew ) => () => {

        if ( isNew )
        {
            let newOptionVariant = {
                option : '',
                optionVariant : new Array()
                }

            let variant = {
                'text': language,
                'value': language,
                'price': currency
                }

            newOptionVariant.option = info.option.option;
            newOptionVariant.optionVariant.push( variant );
            newOptionVariants.push( newOptionVariant );

            refreshOptionVariant = {}
        }
        else
        {
            for ( let indexOption = 0; indexOption< serviceOption.length ;indexOption++ )
            {
                if ( serviceOption[indexOption].option.id == info.option.option.id )
                {
                    let newOptionVariant = {
                        index: indexOption,
                        option : '',
                        optionVariant : new Array()
                        }

                    let variant = {
                        'text': language,
                        'value': language,
                        'price': currency
                        }

                    newOptionVariant.option = info.option.option;
                    newOptionVariant.optionVariant.push( variant );
                    newOptionVariants.push( newOptionVariant );

                    refreshOptionVariant = {}
                }
            }
        }
    }

    const deleteOptionVariant = ( info, isNew ) => () => {
        if ( isNew )
        {
            for ( let indexOption = 0; indexOption< newOptionVariants.length ;indexOption++ )
            {
                for ( let indexOptionVariant = 0; indexOptionVariant< newOptionVariants[indexOption].optionVariant.length ;indexOptionVariant++ )
                {
                    var index = newOptionVariants[indexOption].optionVariant.indexOf( info );

                    if ( index !== -1 ) {

                        newOptionVariants[indexOption].optionVariant.splice( index, 1 );
                    }
                    refreshOptionVariant = {}
                }
            }
        }
        else
        {
            for ( let indexOption = 0; indexOption< serviceOption.length ;indexOption++ )
            {
                for ( let indexOptionVariant = 0; indexOptionVariant< serviceOption[indexOption].optionVariant.length ;indexOptionVariant++ )
                {
                    var index = serviceOption[indexOption].optionVariant.indexOf( info );

                    if ( index !== -1 ) {

                        serviceOption[indexOption].optionVariant.splice( index, 1 );
                    }
                    refreshOptionVariant = {}
                }
            }
        }
    }
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>
<div class="admin-page">
    <Tabs
        name="menu"
        items={[ 'Main info', 'Pack', 'Advantage', 'Process', 'Option' ]}
        bind:value={selectedTab}
    />
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
        <div class="admin-tab {selectedTab === 'Main info' ? 'selected' : ''}">
            <div class="admin-title-section">
                {getTranslatedTextByCode( 'ServiceMainInfoLabel' )}
            </div>
            <div class="admin-section">
                <FormField
                    name="{getTranslatedTextByCode( 'ServiceTitleLabel' )}"
                >
                    <TextField
                        name="title"
                        value={title}
                        required
                    />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                    name="{getTranslatedTextByCode( 'ServiceDescriptionLabel' )}"
                >
                    <div class="text-input">
                        {#each Object.entries( description ) as [ lang, text ]}
                            {lang}
                            <TextField
                                name="description"
                                value={text}
                            />
                        {/each}
                    </div>
                </FormField>
            </div>
            <div class="admin-section">
                <div class="admin-section-switch">
                    <FormField
                        name="{getTranslatedTextByCode( 'ServiceHighlightLabel' )}"
                        errors={[ highlight && getTranslatedTextByCode( 'ServiceHighlightWarningLabel' ) ]}
                    >
                        <Switch name="highlight" bind:value={highlight} />
                    </FormField>
                </div>
            </div>
            <div class="admin-section">
                <div class="admin-section-hasprice">
                    <FormField
                        name="{getTranslatedTextByCode( 'ServiceHasPriceLabel' )}"
                        errors={[ hasPrice && getTranslatedTextByCode( 'ServiceHasPriceWarningLabel' ) ]}
                    >
                        <Switch name="hasPrice" bind:value={hasPrice} />
                    </FormField>
                </div>
            </div>
            <div class="admin-section">
                <FormField
                    name="{getTranslatedTextByCode( 'ServiceImageLabel' )}"
                >
                    <FileDropzone
                        accept="image/*"
                        max={1}
                        bind:files={featureImage}
                        fileComponent={Image}
                        on:change={() => getBase64( featureImage, 0, 0, 'feature-image' )}
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
            <div class="admin-section">
                <FormField
                    name="{getTranslatedTextByCode( 'ServiceUnitTimeLabel' )}"
                >
                    <TextField
                        name="unit-time"
                        value={unitTime}
                        required
                    />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                    name="{getTranslatedTextByCode( 'ServiceUnitPriceLabel' )}"
                >
                    <div class="text-input">
                        {#each Object.entries( unitPrice ) as [ currency, value ]}
                            {currency}
                            <TextField
                                type="number"
                                step=".01"
                                name="unit-price"
                                value={value}
                            />
                        {/each}
                    </div>
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                    name="{getTranslatedTextByCode( 'ServiceCompanyLabel' )}"
                    required
                >
                    <RadioGroup
                        name="companyId"
                        value="{companyId}"
                        items={company}
                    />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                    name="{getTranslatedTextByCode( 'ServiceCategoryLabel' )}"
                    required
                >
                    <RadioGroup
                        name="categoryId"
                        value="{categoryId}"
                        items={category}
                    />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                    name="{getTranslatedTextByCode( 'ServiceGalleryLabel' )}"
                >
                    <FileDropzone
                        accept="image/*"
                        max={7}
                        bind:files={galleryArray}
                        fileComponent={Image}
                        on:change={() => getBase64( galleryArray, 0, 0, 'gallery' )}
                    />
                    {#key refreshGallery}
                        {#each galleryArray as item, index}
                            <div class="gallery">
                                <input hidden name="gallery-file-counter" value="{index}"/>
                                <input hidden name="gallery-file-path-{index}" value="{item.name}"/>
                            </div>
                        {/each}
                    {/key}
                    {#key refreshGallery}
                        {#each newGalleryArray as item, index}
                            <input hidden name="new-gallery-file-counter" value="{index}"/>
                            <input hidden name="new-gallery-file-name-{index}" value="{item.name}"/>
                            <input hidden name="new-gallery-file-extension-{index}" value="{item.extension}"/>
                            <input hidden name="new-gallery-file-data-{index}" value="{item.dataFile}"/>
                            <input hidden name="new-gallery-file-number-{index}" value="{item.number}"/>
                        {/each}
                    {/key}
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                    name="{getTranslatedTextByCode( 'ServiceAdditionalDescriptionTitleLabel' )}"
                >
                    <div class="text-input">
                        {#each Object.entries( additionalTitle ) as [ lang, text ]}
                            {lang}
                            <TextField
                                name="additional-title"
                                value={text}
                            />
                        {/each}
                    </div>
                </FormField>
                <FormField
                    name="{getTranslatedTextByCode( 'ServiceAdditionalDescriptionDescriptionLabel' )}"
                >
                    <div class="text-input">
                        {#each Object.entries( additionalDescription ) as [ lang, text ]}
                            {lang}
                            <TextField
                                name="additional-description"
                                value={text}
                            />
                        {/each}
                    </div>
                </FormField>
            </div>
        </div>
        <div class="admin-tab {selectedTab === 'Pack' ? 'selected' : ''}">
            <div class="admin-title-section">
                {getTranslatedTextByCode( 'ServicePackLabel' )}
            </div>
            <div class="admin-section">
                {#key refreshPack}
                    {#each servicePack as pack, index}
                        <div class="admin-section-container">
                            <FormField
                                name="{getTranslatedTextByCode( 'ServicePackNameLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( completeLanguageMap( pack.info.name, data.languageData ) ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="pack-name-{index}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServicePackDescriptionLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( completeLanguageMap( pack.info.description, data.languageData ) ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="pack-description-{index}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServicePackPriceLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( completeCurrencyMap( pack.info.price, data.currencyData ) ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="pack-price-{index}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServicePackQuantityLabel' )}"
                            >
                                <TextField
                                    name="pack-quantity-{index}"
                                    value="{pack.info.quantity}"
                                />
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServicePackTypeLabel' )}"
                            >
                                <RadioGroup
                                    name="pack-packTypeId-{index}"
                                    value="{pack.info.typeId}"
                                    items={servicePackType}
                                />
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServicePackColorLabel' )}"
                            >
                                <TextField
                                    name="pack-color-{index}"
                                    value="{pack.info.color}"
                                />
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServicePackImageLabel' )}"
                            >
                                <FileDropzone
                                    accept="image/*"
                                    max={1}
                                    bind:files={packImage[ index ]}
                                    fileComponent={Image}
                                    on:change={() => getBase64( packImage[ index ], pack.info.id, 0, 'pack-image' )}
                                />
                                <input hidden name="packImagePath-{index}" value={pack.info.imagePath}/>
                                {#key refreshImagePack}
                                    {#each newImagePackArray as item}
                                        {#if item.packId == pack.info.id}
                                        {index}
                                            <input name="pack-file-name-{index}" value="{item.name}"/>
                                            <input name="pack-file-extension-{index}" value="{item.extension}"/>
                                            <input name="pack-file-data-{index}" value="{item.dataFile}"/>
                                        {/if}
                                    {/each}
                                {/key}
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServicePackIncludesLabel' )}"
                            >
                                {#key refreshPackInclude}
                                    {#each pack.includes as include, indexInclude}
                                        <div class="text-input">
                                            {#each Object.entries( completeLanguageMap( include.text, data.languageData ) ) as [ lang, text ]}
                                                {lang}
                                                <TextField
                                                    name="pack-include-{index}-{indexInclude}"
                                                    value={text}
                                                />
                                            {/each}
                                            <div class="admin-button">
                                                <Button filled danger on:click={deleteInclude( ( {include} ), false )}>{getTranslatedTextByCode( 'DeletePackIncludeButton' )}</Button>
                                            </div>
                                        </div>
                                    {/each}
                                {/key}
                                {#key refreshPackInclude}
                                    {#each newIncludes as include }
                                        {#if include.info.id == pack.info.id }
                                            {#each include.includes as item}
                                                <div class="text-input">
                                                    {#each Object.entries( item.text ) as [ lang, text ]}
                                                        {lang}
                                                        <TextField
                                                            name="pack-include-{pack.info.id}"
                                                            value={text}
                                                        />
                                                    {/each}
                                                    <div class="admin-button">
                                                        <Button filled danger on:click={deleteInclude( ( {include} ), true )}>{getTranslatedTextByCode( 'DeletePackIncludeButton' )}</Button>
                                                    </div>
                                                </div>
                                            {/each}
                                        {/if}
                                    {/each}
                                {/key}
                                <div class="admin-button">
                                    <Button filled on:click={addInclude( ( {pack} ), false )}>{getTranslatedTextByCode( 'AddPackIncludeButton' )}</Button>
                                </div>
                            </FormField>
                            <div class="admin-button">
                                <Button filled danger on:click={deletePack( ( {pack} ), false )}>{getTranslatedTextByCode( 'DeletePackButton' )}</Button>
                            </div>
                        </div>
                    {/each}
                    {#each newPacks as pack}
                        <div class="admin-section-container">
                            <div hidden>
                                <TextField
                                    name="new-pack-counter"
                                    value={pack.info.index}
                                />
                            </div>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServicePackNameLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( pack.info.name ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="new-pack-name-{pack.info.index}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServicePackDescriptionLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( pack.info.description ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="new-pack-description-{pack.info.index}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServicePackPriceLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( pack.info.price ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="new-pack-price-{pack.info.index}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServicePackQuantityLabel' )}"
                            >
                                <TextField
                                    name="new-pack-quantity-{pack.info.index}"
                                    value="{pack.info.quantity}"
                                />
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServicePackTypeLabel' )}"
                            >
                                <RadioGroup
                                    name="new-pack-packTypeId-{pack.info.index}"
                                    value="{pack.info.typeId}"
                                    items={servicePackType}
                                />
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServicePackColorLabel' )}"
                            >
                                <TextField
                                    name="new-pack-color-{pack.info.index}"
                                    value="{pack.info.color}"
                                />
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServicePackImageLabel' )}"
                            >
                                <FileDropzone
                                    accept="image/*"
                                    max={1}
                                    bind:files={pack.info.image}
                                    fileComponent={Image}
                                    on:change={() => getBase64( pack.info.image, pack.info.id, pack.info.index, 'pack-image' )}
                                />
                                {#key refreshImagePack}
                                    {#each newImagePackArray as item}
                                        {#if pack.info.index == item.index }
                                            <input name="new-pack-file-name-{pack.info.index}" value="{item.name}"/>
                                            <input name="new-pack-file-extension-{pack.info.index}" value="{item.extension}"/>
                                            <input name="new-pack-file-data-{pack.info.index}" value="{item.dataFile}"/>
                                        {/if}
                                    {/each}
                                {/key}
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServicePackIncludesLabel' )}"
                            >
                                {#key refreshPackInclude}
                                    {#each newIncludes as include }
                                        {#if pack.info.index == include.info.index }
                                            {#each include.includes as item}
                                                <div class="text-input">
                                                    {#each Object.entries( item.text ) as [ lang, text ]}
                                                        {lang}
                                                        <TextField
                                                            name="new-pack-include-{pack.info.index}"
                                                            value={text}
                                                        />
                                                    {/each}
                                                    <div class="admin-button">
                                                        <Button filled danger on:click={deleteInclude( ( {include} ), true )}>{getTranslatedTextByCode( 'DeletePackIncludeButton' )}</Button>
                                                    </div>
                                                </div>
                                            {/each}
                                        {/if}
                                    {/each}
                                {/key}
                                <div class="admin-button">
                                    <Button filled on:click={addInclude( ( {pack} ), true )}>{getTranslatedTextByCode( 'AddPackIncludeButton' )}</Button>
                                </div>
                            </FormField>
                            <div class="admin-button">
                                <Button filled danger on:click={deletePack( ( {pack} ), true )}>{getTranslatedTextByCode( 'DeletePackButton' )}</Button>
                            </div>
                        </div>
                    {/each}
                {/key}
                <div class="admin-button">
                    <Button filled on:click={addPack()}>{getTranslatedTextByCode( 'AddPackButton' )}</Button>
                </div>
            </div>
        </div>
        <div class="admin-tab {selectedTab === 'Advantage' ? 'selected' : ''}">
            <div class="admin-title-section">
                {getTranslatedTextByCode( 'ServiceAdvantageLabel' )}
            </div>
            <div class="admin-section">
                {#key refreshAdvantage}
                    {#each serviceAdvantage as advantage, index}
                        <div class="admin-section-container">
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceAdvantageNameLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( completeLanguageMap( advantage.name, data.languageData ) ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="advantage-name-{advantage.id}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceAdvantageDescriptionLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( completeLanguageMap( advantage.description, data.languageData ) ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="advantage-description-{advantage.id}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceAdvantageImageLabel' )}"
                            >
                                <FileDropzone
                                    accept="image/*"
                                    max={1}
                                    bind:files={advantageImage[ index ]}
                                    fileComponent={Image}
                                    on:change={() => getBase64( advantageImage[ index ], advantage.id, 0, 'advantage-image' )}
                                />
                                <input hidden name="advantageImagePath-{index}" value={advantage.imagePath}/>
                                {#key refreshImageAdvantage}
                                    {#each newImageAdvantageArray as item}
                                        {#if item.advantageId == advantage.id}
                                            <input hidden name="advantage-file-name-{index}" value="{item.name}"/>
                                            <input hidden name="advantage-file-extension-{index}" value="{item.extension}"/>
                                            <input hidden name="advantage-file-data-{index}" value="{item.dataFile}"/>
                                        {/if}
                                    {/each}
                                {/key}
                            </FormField>
                            <div class="admin-button">
                                <Button filled danger on:click={deleteAdvantage( ( {advantage} ), false )}>{getTranslatedTextByCode( 'DeleteAdvantageButton' )}</Button>
                            </div>
                        </div>
                    {/each}
                    {#each newAdvantages as advantage}
                        <div class="admin-section-container">
                            <div hidden>
                                <TextField
                                    name="new-advantage-counter"
                                    value={advantage.index}
                                />
                            </div>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceAdvantageNameLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( advantage.name ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="new-advantage-name-{advantage.index}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceAdvantageDescriptionLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( advantage.description ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="new-advantage-description-{advantage.index}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceAdvantageImageLabel' )}"
                            >
                                <FileDropzone
                                    accept="image/*"
                                    max={1}
                                    bind:files={advantage.imagePath}
                                    fileComponent={Image}
                                    on:change={() => getBase64( advantage.imagePath, advantage.id, advantage.index, 'advantage-image' )}
                                />
                                {#key refreshImageAdvantage}
                                    {#each newImageAdvantageArray as item}
                                        {#if advantage.index == item.index }
                                            <input hidden name="new-advantage-file-name-{advantage.index}" value="{item.name}"/>
                                            <input hidden name="new-advantage-file-extension-{advantage.index}" value="{item.extension}"/>
                                            <input hidden name="new-advantage-file-data-{advantage.index}" value="{item.dataFile}"/>
                                        {/if}
                                    {/each}
                                {/key}
                            </FormField>
                            <div class="admin-button">
                                <Button filled danger on:click={deleteAdvantage( ( {advantage} ), true )}>{getTranslatedTextByCode( 'DeleteAdvantageButton' )}</Button>
                            </div>
                        </div>
                    {/each}
                {/key}
                <div class="admin-button">
                    <Button filled on:click={addAdvantage()}>{getTranslatedTextByCode( 'AddAdvantageButton' )}</Button>
                </div>
            </div>
        </div>
        <div class="admin-tab {selectedTab === 'Process' ? 'selected' : ''}">
            <div class="admin-title-section">
                {getTranslatedTextByCode( 'ServiceProcessLabel' )}
            </div>
            <div class="admin-section">
                {#key refreshProcess}
                    {#each serviceProcess as process}
                        <div class="admin-section-container">
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceProcessNameLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( completeLanguageMap( process.name, data.languageData ) ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="process-name-{process.id}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceProcessDescriptionLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( completeLanguageMap( process.description, data.languageData ) ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="process-description-{process.id}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceProcessNumberLabel' )}"
                            >
                                <TextField
                                    name="process-number-{process.id}"
                                    value={process.number}
                                />
                            </FormField>
                            <div class="admin-button">
                                <Button filled danger on:click={deleteProcess( ( {process} ), false )}>{getTranslatedTextByCode( 'DeleteProcessButton' )}</Button>
                            </div>
                        </div>
                    {/each}
                    {#each newProcesses as process}
                        <div class="admin-section-container">
                            <div hidden>
                                <TextField
                                    name="new-process-counter"
                                    value={process.index}
                                />
                            </div>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceProcessNameLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( process.name ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="new-process-name-{process.index}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceProcessDescriptionLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( process.description ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="new-process-description-{process.index}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceProcessNumberLabel' )}"
                            >
                                <TextField
                                    name="new-process-number-{process.index}"
                                    value={process.number}
                                />
                            </FormField>
                            <div class="admin-button">
                                <Button filled danger on:click={deleteProcess( ( {process} ), true )}>{getTranslatedTextByCode( 'DeleteProcessButton' )}</Button>
                            </div>
                        </div>
                    {/each}
                {/key}
                <div class="admin-button">
                    <Button filled on:click={addProcess()}>{getTranslatedTextByCode( 'AddProcessButton' )}</Button>
                </div>
            </div>
        </div>
        <div class="admin-tab {selectedTab === 'Option' ? 'selected' : ''}">
            <div class="admin-title-section">
                {getTranslatedTextByCode( 'ServiceOptionLabel' )}
            </div>
            <div class="admin-section">
                {#key refreshOption}
                    {#each serviceOption as option, index}
                        <div class="admin-section-container">
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceOptionTextLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( completeLanguageMap( option.option.text, data.languageData ) ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="option-text-{index}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceOptionDescriptionLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( completeLanguageMap( option.option.description, data.languageData ) ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="option-description-{index}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceOptionTypeLabel' )}"
                            >
                                <TextField
                                    name="option-type-{index}"
                                    value={option.option.type}
                                />
                            </FormField>
                            {#each option.optionVariant as variant, indexVariant}
                                <div class="admin-section-container">
                                    <FormField
                                        name="{getTranslatedTextByCode( 'ServiceOptionVariantItemTextLabel' )}"
                                    >
                                        <div class="text-input">
                                            {#each Object.entries( completeLanguageMap( variant.text, data.languageData ) ) as [ lang, text ]}
                                                {lang}
                                                <TextField
                                                    name="option-variant-text-{index}-{indexVariant}"
                                                    value={text}
                                                />
                                            {/each}
                                        </div>
                                    </FormField>
                                    <FormField
                                        name="{getTranslatedTextByCode( 'ServiceOptionVariantItemValueLabel' )}"
                                    >
                                        <div class="text-input">
                                            {#each Object.entries( completeLanguageMap( variant.value, data.languageData ) ) as [ lang, text ]}
                                                {lang}
                                                <TextField
                                                    name="option-variant-value-{index}-{indexVariant}"
                                                    value={text}
                                                />
                                            {/each}
                                        </div>
                                    </FormField>
                                    <FormField
                                        name="{getTranslatedTextByCode( 'ServiceOptionVariantItemPriceLabel' )}"
                                    >
                                        <div class="text-input">
                                            {#each Object.entries( completeCurrencyMap( variant.price, data.currencyData ) ) as [ lang, text ]}
                                                {lang}
                                                <TextField
                                                    name="option-variant-price-{index}-{indexVariant}"
                                                    value={text}
                                                />
                                            {/each}
                                        </div>
                                    </FormField>
                                </div>
                                <div class="admin-button">
                                    <Button filled danger on:click={deleteOptionVariant( ( variant ), false )}>{getTranslatedTextByCode( 'DeleteOptionVariantItemButton' )}</Button>
                                </div>
                            {/each}
                            {#key refreshOptionVariant}
                                {#each newOptionVariants as item}
                                    {#if item.option.id == option.option.id }
                                        {#each item.optionVariant as variant}
                                            <div class="admin-section-container">
                                                <div class="admin-option-variant-section-container">
                                                    <FormField
                                                        name="{getTranslatedTextByCode( 'ServiceOptionVariantItemTextLabel' )}"
                                                    >
                                                        <div class="text-input">
                                                            {#each Object.entries( variant.text ) as [ lang, text ]}
                                                                {lang}
                                                                <TextField
                                                                    name="option-variant-text-{option.option.id}"
                                                                    value={text}
                                                                />
                                                            {/each}
                                                        </div>
                                                    </FormField>
                                                </div>
                                                <div class="admin-option-variant-section-container">
                                                    <FormField
                                                        name="{getTranslatedTextByCode( 'ServiceOptionVariantItemValueLabel' )}"
                                                    >
                                                        <div class="text-input">
                                                            {#each Object.entries( variant.value ) as [ lang, text ]}
                                                                {lang}
                                                                <TextField
                                                                    name="option-variant-value-{option.option.id}"
                                                                    value={text}
                                                                />
                                                            {/each}
                                                        </div>
                                                    </FormField>
                                                </div>
                                                <div class="admin-option-variant-section-container">
                                                    <FormField
                                                        name="{getTranslatedTextByCode( 'ServiceOptionVariantItemPriceLabel' )}"
                                                    >
                                                        <div class="text-input">
                                                            {#each Object.entries( variant.price ) as [ lang, text ]}
                                                                {lang}
                                                                <TextField
                                                                    name="option-variant-price-{option.option.id}"
                                                                    value={text}
                                                                />
                                                            {/each}
                                                        </div>
                                                    </FormField>
                                                </div>
                                            </div>
                                            <div class="admin-button">
                                                <Button filled danger on:click={deleteOptionVariant( ( variant ), true )}>{getTranslatedTextByCode( 'DeleteOptionVariantItemButton' )}</Button>
                                            </div>
                                        {/each}
                                    {/if}
                                {/each}
                            {/key}
                            <div class="admin-button">
                                <Button filled on:click={addOptionVariant( ( {option} ), false)}>{getTranslatedTextByCode( 'AddOptionVariantItemButton' )}</Button>
                            </div>
                            <div class="admin-button">
                                <Button filled danger on:click={deleteOption( ( {option} ), false )}>{getTranslatedTextByCode( 'DeleteOptionButton' )}</Button>
                            </div>
                        </div>
                    {/each}
                    {#each newOptions as option, index}
                        <div class="admin-section-container">
                            <div hidden>
                                <TextField
                                    name="new-option-counter"
                                    value={option.option.index}
                                />
                            </div>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceOptionTextLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( option.option.text ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="new-option-text-{option.option.index}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceOptionDescriptionLabel' )}"
                            >
                                <div class="text-input">
                                    {#each Object.entries( option.option.description ) as [ lang, text ]}
                                        {lang}
                                        <TextField
                                            name="new-option-description-{option.option.index}"
                                            value={text}
                                        />
                                    {/each}
                                </div>
                            </FormField>
                            <FormField
                                name="{getTranslatedTextByCode( 'ServiceOptionTypeLabel' )}"
                            >
                                <TextField
                                    name="new-option-type-{option.option.index}"
                                    value={option.option.type}
                                />
                            </FormField>
                            {#key refreshOptionVariant}
                                {#each newOptionVariants as item}
                                    {#if option.option.index == item.option.index }
                                        {#each item.optionVariant as variant}
                                            <div class="admin-section-container">
                                                <div class="admin-option-variant-section-container">
                                                    <FormField
                                                        name="{getTranslatedTextByCode( 'ServiceOptionVariantItemTextLabel' )}"
                                                    >
                                                        <div class="text-input">
                                                            {#each Object.entries( variant.text ) as [ lang, text ]}
                                                                {lang}
                                                                <TextField
                                                                    name="new-option-variant-text-{option.option.index}"
                                                                    value={text}
                                                                />
                                                            {/each}
                                                        </div>
                                                    </FormField>
                                                </div>
                                                <div class="admin-option-variant-section-container">
                                                    <FormField
                                                        name="{getTranslatedTextByCode( 'ServiceOptionVariantItemValueLabel' )}"
                                                    >
                                                        <div class="text-input">
                                                            {#each Object.entries( variant.value ) as [ lang, text ]}
                                                                {lang}
                                                                <TextField
                                                                    name="new-option-variant-value-{option.option.index}"
                                                                    value={text}
                                                                />
                                                            {/each}
                                                        </div>
                                                    </FormField>
                                                </div>
                                                <div class="admin-option-variant-section-container">
                                                    <FormField
                                                        name="{getTranslatedTextByCode( 'ServiceOptionVariantItemPriceLabel' )}"
                                                    >
                                                        <div class="text-input">
                                                            {#each Object.entries( variant.price ) as [ lang, text ]}
                                                                {lang}
                                                                <TextField
                                                                    name="new-option-variant-price-{option.option.index}"
                                                                    value={text}
                                                                />
                                                            {/each}
                                                        </div>
                                                    </FormField>
                                                </div>
                                            </div>
                                            <Button filled danger on:click={deleteOptionVariant( ( variant ), true )}>{getTranslatedTextByCode( 'DeleteOptionVariantItemButton' )}</Button>
                                        {/each}
                                    {/if}
                                {/each}
                            {/key}
                            <div class="admin-button">
                                <Button filled on:click={addOptionVariant( ( {option} ), true )}>{getTranslatedTextByCode( 'AddOptionVariantItemButton' )}</Button>
                            </div>
                            <div class="admin-button">
                                <Button filled danger on:click={deleteOption( ( {option} ), true )}>{getTranslatedTextByCode( 'DeleteOptionButton' )}</Button>
                            </div>
                        </div>
                    {/each}
                {/key}
                <div class="admin-button">
                    <Button filled on:click={addOption()}>{getTranslatedTextByCode( 'AddOptionButton' )}</Button>
                </div>
            </div>
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
