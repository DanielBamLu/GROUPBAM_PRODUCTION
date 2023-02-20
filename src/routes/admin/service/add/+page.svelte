<script>
    import { TextField, RadioGroup, FileDropzone, Switch, FormField, Button, Tabs } from 'attractions';
    import { getLanguageMap, getCurrencyMap } from '$lib/admin';
    import { getTranslatedText, getTranslatedTextByCode } from 'senselogic-gist';
    import { enhance } from '$app/forms';
    import Image from '$lib/components/admin/Image.svelte';

    export let data;

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

    let language = getLanguageMap( data.languageData );
    let currency = getCurrencyMap( data.currencyData );
    let highlight = false;
    let hasPrice = false;

    let servicePackType = data.servicePackType;

    servicePackType = servicePackType.map(function ( item ) {
        return {
            value: item.id,
            label: getTranslatedText( item.name )
        };
    });

    let company = data.companyData;
    company = company.map(function ( item ) {
        return {
            value: item.id,
            label: item.name
        };
    });

    let category = data.categoryData;
    category = category.map(function ( item ) {
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
            color: ''
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
    }

    let newAdvantages = new Array();
    let indexAdvantage = 0;
    const addAdvantage = () => () => {
        indexAdvantage++
        let newAdvantage = {
            index: indexAdvantage,
            name: language,
            description: language
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
    }

    let featureImage = new Array;
    let galleryArray = new Array;

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
</script>

<svelte:head>
    <title>{getTranslatedTextByCode( 'NewPageTitle' )}</title>
</svelte:head>
<div class="admin-page">
    <Tabs
        name="menu"
        items={[ 'Main info', 'Pack', 'Advantage', 'Process', 'Option' ]}
        bind:value={selectedTab}
    />
    <form use:enhance method="POST">
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
                        required
                    />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                    name="{getTranslatedTextByCode( 'ServiceDescriptionLabel' )}"
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
                        required
                    />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                    name="{getTranslatedTextByCode( 'ServiceUnitPriceLabel' )}"
                >
                    <div class="text-input">
                        {#each Object.entries( currency ) as [currency, value]}
                            {currency}
                            <TextField
                                type="number"
                                step=".01"
                                name="unit-price"
                                placeholder="{value}"
                                bind:value={value}
                            />
                        {/each}
                    </div>
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                    name="{getTranslatedTextByCode( 'ServiceCompanyLabel' )}"
                >
                    <RadioGroup
                        name="companyId"
                        items={company}
                        required
                    />
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                    name="{getTranslatedTextByCode( 'ServiceCategoryLabel' )}"
                >
                    <RadioGroup
                        name="categoryId"
                        items={category}
                        required
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
                                <input name="gallery-file-counter" value="{index}"/>
                                <input name="gallery-file-path-{index}" value="{item.name}"/>
                            </div>
                        {/each}
                    {/key}
                    {#key refreshGallery}
                        {#each newGalleryArray as item, index}
                            <input name="new-gallery-file-counter" value="{index}"/>
                            <input name="new-gallery-file-name-{index}" value="{item.name}"/>
                            <input name="new-gallery-file-extension-{index}" value="{item.extension}"/>
                            <input name="new-gallery-file-data-{index}" value="{item.dataFile}"/>
                            <input name="new-gallery-file-number-{index}" value="{item.number}"/>
                        {/each}
                    {/key}
                </FormField>
            </div>
            <div class="admin-section">
                <FormField
                    name="{getTranslatedTextByCode( 'ServiceAdditionalDescriptionTitleLabel' )}"
                >
                    <div class="text-input">
                        {#each Object.entries( language ) as [ lang, text ]}
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
                        {#each Object.entries( language ) as [ lang, text ]}
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
                                            required
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
                                    on:change={() => getBase64( pack.info.image, pack.info.id, 0, 'pack-image' )}
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
                            <div class="admin-subtitle-section">
                                {getTranslatedTextByCode( 'ServicePackIncludesLabel' )}
                            </div>
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
                            </FormField>
                            <div class="admin-button">
                                <Button filled danger on:click={addInclude( ( {pack} ), true )}>{getTranslatedTextByCode( 'AddPackIncludeButton' )}</Button>
                            </div>
                            <div class="admin-button">
                                <Button filled on:click={deletePack( ( {pack} ), true )}>{getTranslatedTextByCode( 'DeletePackButton' )}</Button>
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
                                            required
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
                                    on:change={() => getBase64( advantage.imagePath, advantage.id, 0, 'advantage-image' )}
                                />
                                {#key refreshImageAdvantage}
                                    {#each newImageAdvantageArray as item}
                                        {#if advantage.index == item.index }
                                            <input name="new-advantage-file-name-{advantage.index}" value="{item.name}"/>
                                            <input name="new-advantage-file-extension-{advantage.index}" value="{item.extension}"/>
                                            <input name="new-advantage-file-data-{advantage.index}" value="{item.dataFile}"/>
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
                                            required
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
                                            required
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
                                                <FormField
                                                    name="{getTranslatedTextByCode( 'ServiceOptionVariantItemTextLabel' )}"
                                                >
                                                    <div class="text-input">
                                                        {#each Object.entries( variant.text ) as [ lang, text ]}
                                                            {lang}
                                                            <TextField
                                                                name="new-option-variant-text-{option.option.index}"
                                                                value={text}
                                                                required
                                                            />
                                                        {/each}
                                                    </div>
                                                </FormField>
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
                                            <div class="admin-button">
                                                <Button filled danger on:click={deleteOptionVariant( ( variant ), true )}>{getTranslatedTextByCode( 'DeleteOptionVariantItemButton' )}</Button>
                                            </div>
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
            <button>{getTranslatedTextByCode( 'PublishPageButton' )}</button>
        </div>
    </form>
</div>
