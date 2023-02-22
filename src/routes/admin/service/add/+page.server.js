// -- IMPORTS

import { languageTable, currencyTable, serviceImageTable, serviceTable, companyTable, categoryTable, servicePackTypeTable, servicePackTable, servicePackIncludeTable, serviceAdvantageTable, serviceProcessTable, serviceOptionTable, serviceOptionVariantTable } from '$lib/database';
import { getLanguageMap, getCurrencyMap, attachArrayToObject, convertToSlug, sliceIntoChunks } from '$lib/admin'
import { getRandomTuid, getMillisecondTimestamp } from 'senselogic-gist';
import { redirect } from '@sveltejs/kit';
import { writeFileSync } from 'fs';
import * as api from '$lib/api.js';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load()
{
    let currencyData = await currencyTable.selectRows();

    let companyData = await companyTable.selectRows();
    let categoryData = await categoryTable.selectRows();

    let servicePackType = await servicePackTypeTable.selectRows();

    return {
        currencyData : currencyData,
        companyData : companyData,
        categoryData : categoryData,
        servicePackType : servicePackType,
        };
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ( { request } ) => {

        const data = await request.formData();

        const timeStamp = getMillisecondTimestamp();

        let languageData = await languageTable.selectRows();
        let language = getLanguageMap( languageData );

        let currencyData = await currencyTable.selectRows();
        let currency = getCurrencyMap( currencyData );

        // SERVICE INFO
        let serviceId = getRandomTuid();

        //Add service
        const addService = await api.post(
            serviceTable,
            {
                id: serviceId,
            }
        );

        //Add Title
        let serviceTitle =  data.get( 'title' );

        if ( serviceTitle )
        {
            const addTitle = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    title: serviceTitle,
                }
            );
        }

        //Add slug
        let serviceSlug = convertToSlug( serviceTitle, 'string' );

        if ( serviceSlug )
        {
            const addSlug = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    slug: serviceSlug,
                }
            );
        }

        //Add description
        let serviceDescriptionElements =  data.getAll( 'description' );
        let serviceDescription = attachArrayToObject( serviceDescriptionElements, language );

        if ( serviceDescription )
        {
            const addDescription = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    description: serviceDescription,
                }
            );
        }

        //Add highlight
        let serviceHighlight = data.get( 'highlight' );

        if ( serviceHighlight == null )
        {
            serviceHighlight = 0;
        }
        else
        {
            serviceHighlight = 1;
        }

        if ( serviceHighlight )
        {
            const addHighlight = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    highlight: serviceHighlight,
                }
            );
        }

        //Add hasPrice
        let serviceHasPrice = data.get( 'hasPrice' );

        if ( serviceHasPrice == null )
        {
            serviceHasPrice = 0;
        }
        else
        {
            serviceHasPrice = 1;
        }

        if ( serviceHasPrice )
        {
            const addHasPrice = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    hasPrice: serviceHasPrice,
                }
            );
        }

        //Add unit time
        let serviceUnitTime =  data.get( 'unit-time' );

        if ( serviceUnitTime )
        {
            const addUnitTime = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    unitTime: serviceUnitTime,
                }
            );
        }

        //Add unit price
        let serviceUnitPriceElements =  data.getAll( 'unit-price' );
        let serviceUnitPrice = attachArrayToObject( serviceUnitPriceElements, currency );

        if ( serviceUnitPrice )
        {
            const addUnitPrice = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    unitPrice: serviceUnitPrice,
                }
            );
        }

        //Add companyId
        let serviceCompanyId = data.get( 'companyId' );

        if ( serviceCompanyId )
        {
            const addCompanyId = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    companyId: serviceCompanyId,
                }
            );
        }

        //Add categoryId
        let serviceCategoryId = data.get( 'categoryId' );

        if ( serviceCategoryId )
        {
            const addCategoryId = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    categoryId: serviceCategoryId,
                }
            );
        }

        //Add additional title
        language = getLanguageMap( languageData );
        let serviceAdditionalTitleElements =  data.getAll( 'additional-title' );
        let serviceAdditionalTitle = attachArrayToObject( serviceAdditionalTitleElements, language );

        if ( serviceAdditionalTitle )
        {
            const addAdditionalTitle = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    additionalTitle: serviceAdditionalTitle,
                }
            );
        }

        //Add additional description
        language = getLanguageMap( languageData );
        let serviceAdditionalDescriptionElements =  data.getAll( 'additional-description' );
        let serviceAdditionalDescription = attachArrayToObject( serviceAdditionalDescriptionElements, language );

        if ( serviceAdditionalDescription )
        {
            const addAdditionalDescription = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    additionalDescription: serviceAdditionalDescription,
                }
            );
        }

        //Add ImagePath
        let serviceFileName =  data.get( 'image-file-name' );
        let serviceFileExtension =  data.get( 'image-file-extension' );
        let serviceFileData =  data.get( 'image-file-data' );

        let serviceImagePath;

        if ( serviceFileData )
        {
            serviceImagePath = '/image/service/' + serviceFileName + '-' + timeStamp + '.' + serviceFileExtension;

            writeFileSync( 'static' + serviceImagePath, serviceFileData, 'base64' );

            if ( serviceImagePath )
            {
                const addImagePath = await api.put(
                    serviceTable,
                    {
                        id: serviceId,
                        imagePath: serviceImagePath,
                    }
                );
            }
        }

        let newGallery = data.getAll('new-gallery-file-counter');

        if ( newGallery )
        {
            for ( let indexNewGallery= 0; indexNewGallery< newGallery.length ;indexNewGallery++ )
            {
                let id = getRandomTuid();

                let fileName =  data.get( 'new-gallery-file-name-' + newGallery[ indexNewGallery ] );
                let fileExtension =  data.get( 'new-gallery-file-extension-' + newGallery[ indexNewGallery ] );
                let fileData =  data.get( 'new-gallery-file-data-' + newGallery[ indexNewGallery ] );
                let fileNumber =  data.get( 'new-gallery-file-number-' + newGallery[ indexNewGallery ] );

                let galleryImagePath;

                if ( fileData )
                {
                    galleryImagePath = '/image/service/' + fileName + '-' + timeStamp + '.' + fileExtension;

                    if ( galleryImagePath )
                    {
                        const addServiceImage = await api.post(
                            serviceImageTable,
                            {
                                id: id,
                                serviceId: serviceId,
                                // number: fileNumber,
                                imagePath: galleryImagePath,
                            }
                        );
                    }

                    writeFileSync( 'static' + galleryImagePath, fileData, 'base64' );
                }
            }
        }

        //NEW PACK
        let packCounter = data.getAll( 'new-pack-counter' );

        for ( let indexPackCounter = 0; indexPackCounter< packCounter.length ;indexPackCounter++ )
        {
            let packIdNew = getRandomTuid();

            //Add pack
            if ( packIdNew )
            {
                const addPack = await api.post(
                    servicePackTable,
                    {
                        id: packIdNew
                    }
                );
            }

            //Add pack name
            let packNameNewElements = data.getAll( 'new-pack-name-' + packCounter[ indexPackCounter ] );
            let packNameNew = attachArrayToObject( packNameNewElements, language );

            if ( packNameNew )
            {
                const addPackName = await api.put(
                    servicePackTable,
                    {
                        id: packIdNew,
                        name: packNameNew
                    }
                );
            }

            //Add pack description
            language = getLanguageMap( languageData );
            let packDescriptionNewElements = data.getAll( 'new-pack-description-' + packCounter[ indexPackCounter ] );
            let packDescriptionNew = attachArrayToObject( packDescriptionNewElements, language );

            if ( packDescriptionNew )
            {
                const addPackDescription = await api.put(
                    servicePackTable,
                    {
                        id: packIdNew,
                        description: packDescriptionNew
                    }
                );
            }

            //Add pack price
            let packPriceNewElements = data.getAll( 'new-pack-price-' + packCounter[ indexPackCounter ] );
            let packPriceNew = attachArrayToObject( packPriceNewElements, currency );

            if ( packPriceNew )
            {
                const addPackPrice = await api.put(
                    servicePackTable,
                    {
                        id: packIdNew,
                        price: packPriceNew
                    }
                );
            }

            //Add pack quantity
            let packQuantityNew = data.get( 'new-pack-quantity-' + packCounter[ indexPackCounter ] );

            if ( packQuantityNew )
            {
                const addPackQuantity = await api.put(
                    servicePackTable,
                    {
                        id: packIdNew,
                        quantity: packQuantityNew
                    }
                );
            }

            //Add pack total price
            let newTotalPrice = new Array();
            for ( let indexPackPriceElements = 0; indexPackPriceElements< packPriceNewElements.length ;indexPackPriceElements++ )
            {
                let product = ( packPriceNewElements[ indexPackPriceElements ] * packQuantityNew );
                newTotalPrice.push( product )
            }

            let totalPriceNew = attachArrayToObject( newTotalPrice, currency );

            if ( totalPriceNew )
            {
                const addPackTotalPrice = await api.put(
                    servicePackTable,
                    {
                        id: packIdNew,
                        totalPrice: totalPriceNew,
                    }
                );
            }

            //Add pack typeId
            let packTypeIdNew = data.get( 'new-pack-packTypeId-' + packCounter[ indexPackCounter ] );

            if ( packTypeIdNew )
            {
                const addPackTypeId = await api.put(
                    servicePackTable,
                    {
                        id: packIdNew,
                        typeId: packTypeIdNew,
                    }
                );
            }

            //Add pack color
            let packColorNew = data.get( 'new-pack-color-' +  packCounter[ indexPackCounter ] );

            if ( packColorNew )
            {
                const addPackColor = await api.put(
                    servicePackTable,
                    {
                        id: packIdNew,
                        color: packColorNew,
                    }
                );
            }

            //Add pack imagePath
            let fileName =  data.get( 'new-pack-file-name-'+  packCounter[ indexPackCounter ] );
            let fileExtension =  data.get( 'new-pack-file-extension-'+  packCounter[ indexPackCounter ] );
            let fileData =  data.get( 'new-pack-file-data-'+  packCounter[ indexPackCounter ] );

            let packImagePath = '';
            if ( fileName )
            {
                packImagePath = '/image/service/' + fileName + '-' + timeStamp + '.' + fileExtension;
                writeFileSync( 'static' + packImagePath, fileData, 'base64' );

                if ( packImagePath )
                {
                    const addPackImagePath = await api.put(
                        servicePackTable,
                        {
                            id: packIdNew,
                            imagePath: packImagePath,
                        }
                    );
                }
            }

            //Add new Pack includes
            let packIncludesNewElements = data.getAll( 'new-pack-include-' + packCounter[ indexPackCounter ] );
            packIncludesNewElements = sliceIntoChunks( packIncludesNewElements, 3 );

            if ( packIncludesNewElements != '' )
            {
                for (let indexPackIncludesNewElements = 0; indexPackIncludesNewElements < packIncludesNewElements.length; indexPackIncludesNewElements++)
                {
                    let includePackText = attachArrayToObject( packIncludesNewElements[ indexPackIncludesNewElements ], language );

                    if ( includePackText )
                    {
                        const addPackInclude = await api.post(
                            servicePackIncludeTable,
                            {
                                id: getRandomTuid(),
                                packId: packIdNew,
                                text: includePackText,
                            }
                        );
                    }
                }
            }
        }

        //NEW ADVANTAGE
        let advantageCounter = data.getAll( 'new-advantage-counter' );

        for ( let indexAdvantageCounter = 0; indexAdvantageCounter< advantageCounter.length ;indexAdvantageCounter++ )
        {
            //Add advantage
            let advantageId = getRandomTuid();

            if ( serviceId )
            {
                const addAdvantage = await api.post(
                    serviceAdvantageTable,
                    {
                        id: advantageId,
                        serviceId: serviceId,
                    }
                );
            }

            //Add advantage name
            let advantageNameNewElements = data.getAll( 'new-advantage-name-' + advantageCounter[ indexAdvantageCounter ] );
            let advantageNameNew = attachArrayToObject( advantageNameNewElements, language );

            if ( advantageNameNew )
            {
                const addAdvantageName = await api.put(
                    serviceAdvantageTable,
                    {
                        id: advantageId,
                        name: advantageNameNew,
                    }
                );
            }

            //Add advantage description
            let advantageDescriptionNewElements = data.getAll( 'new-advantage-description-' + advantageCounter[ indexAdvantageCounter ] );
            let advantageDescriptionNew = attachArrayToObject( advantageDescriptionNewElements, language );

            if ( advantageDescriptionNew )
            {
                const addAdvantageDescription = await api.put(
                    serviceAdvantageTable,
                    {
                        id: advantageId,
                        description: advantageDescriptionNew,
                    }
                );
            }

            //Add advantage imagePath
            let advantageFileName =  data.get( 'new-advantage-file-name-'+  advantageCounter[ indexAdvantageCounter ] );
            let advantageFileExtension =  data.get( 'new-advantage-file-extension-'+  advantageCounter[ indexAdvantageCounter ] );
            let advantageFileData =  data.get( 'new-advantage-file-data-'+  advantageCounter[ indexAdvantageCounter ] );

            let advantageImagePath = '';
            if ( advantageFileName )
            {
                advantageImagePath = '/image/service/' + advantageFileName + '-' + timeStamp + '.' + advantageFileExtension;
                writeFileSync( 'static' + advantageImagePath, advantageFileData, 'base64' );

                if ( advantageImagePath )
                {
                    const addAdvantageImagePath = await api.put(
                        serviceAdvantageTable,
                        {
                            id: advantageId,
                            imagePath: advantageImagePath
                        }
                    );
                }
            }
        }

        //NEW PROCESS
        let processCounter = data.getAll( 'new-process-counter' );

        for ( let indexProcessCounter = 0; indexProcessCounter< processCounter.length ;indexProcessCounter++ )
        {
            //Add process
            let processId = getRandomTuid();

            if ( serviceId )
            {
                const addProcess = await api.post(
                    serviceProcessTable,
                    {
                        id: processId,
                        serviceId: serviceId,
                    }
                );
            }

            //Add process name
            let processNameNewElements = data.getAll( 'new-process-name-' + processCounter[ indexProcessCounter ] );
            let processNameNew = attachArrayToObject( processNameNewElements, language );

            if ( processNameNew )
            {
                const addProcessName = await api.put(
                    serviceProcessTable,
                    {
                        id: processId,
                        name: processNameNew,
                    }
                );
            }

            //Add process description
            let processDescriptionNewElements = data.getAll( 'new-process-description-' + processCounter[ indexProcessCounter ] );
            let processDescriptionNew = attachArrayToObject( processDescriptionNewElements, language );

            if ( processDescriptionNew )
            {
                const addProcessDescription = await api.put(
                    serviceProcessTable,
                    {
                        id: processId,
                        description: processDescriptionNew,
                    }
                );
            }

            //Add process name
            let processNumberNew = data.get( 'new-process-number-' + processCounter[ indexProcessCounter ] );

            if ( processNumberNew )
            {
                const addProcessNumber = await api.put(
                    serviceProcessTable,
                    {
                        id: processId,
                        number: processNumberNew,
                    }
                );
            }
        }

        //NEW OPTION
        let optionCounter = data.getAll( 'new-option-counter' );

        for ( let indexOptionCounter = 0; indexOptionCounter< optionCounter.length ;indexOptionCounter++ )
        {
            //Add option
            let optionId = getRandomTuid();

            if ( serviceId )
            {
                const addOption = await api.post(
                    serviceOptionTable,
                    {
                        id: optionId,
                        serviceId: serviceId,
                    }
                );
            }

            //Add option text
            let optionTextNewElements = data.getAll( 'new-option-text-' + optionCounter[ indexOptionCounter ] );
            let optionTextNew = attachArrayToObject( optionTextNewElements, language );

            if ( optionTextNew )
            {
                const addOptionText = await api.put(
                    serviceOptionTable,
                    {
                        id: optionId,
                        text: optionTextNew,
                    }
                );
            }

            //Add option description
            language = getLanguageMap( languageData );
            let optionDescriptionNewElements = data.getAll( 'new-option-description-' + optionCounter[ indexOptionCounter ] );
            let optionDescriptionNew = attachArrayToObject( optionDescriptionNewElements, language );

            if ( optionDescriptionNew )
            {
                const addOptionDescription = await api.put(
                    serviceOptionTable,
                    {
                        id: optionId,
                        description: optionDescriptionNew,
                    }
                );
            }

            //Add option type
            let optionTypeNew= data.get( 'new-option-type-' + optionCounter[ indexOptionCounter ] );

            if ( optionTypeNew )
            {
                const addOptionType = await api.put(
                    serviceOptionTable,
                    {
                        id: optionId,
                        type: optionTypeNew,
                    }
                );
            }

            let optionVariantTextNewElements = data.getAll( 'new-option-variant-text-' + optionCounter[ indexOptionCounter ] );
            let optionVariantValueNewElements = data.getAll( 'new-option-variant-value-' + optionCounter[ indexOptionCounter ] );
            let optionVariantPriceNewElements = data.getAll( 'new-option-variant-price-' + optionCounter[ indexOptionCounter ] );

            optionVariantTextNewElements = sliceIntoChunks( optionVariantTextNewElements, 3 );
            optionVariantValueNewElements = sliceIntoChunks( optionVariantValueNewElements, 3 );
            optionVariantPriceNewElements = sliceIntoChunks( optionVariantPriceNewElements, 3 );

            if ( optionVariantTextNewElements != '' )
            {
                for (let indexOptionVariantTextNewElements = 0; indexOptionVariantTextNewElements < optionVariantTextNewElements.length; indexOptionVariantTextNewElements++)
                {
                    //Add option variant
                    let optionVariantId = getRandomTuid();

                    if ( optionId )
                    {
                        const addOptionVariant = await api.post(
                            serviceOptionVariantTable,
                            {
                                id: optionVariantId,
                                optionId: optionId
                            }
                        );
                    }

                    //Add option variant text
                    let optionVariantNewText = attachArrayToObject( optionVariantTextNewElements[ indexOptionVariantTextNewElements ], language );

                    if ( optionVariantNewText )
                    {
                        const addOptionVariantText = await api.put(
                            serviceOptionVariantTable,
                            {
                                id: optionVariantId,
                                text: optionVariantNewText
                            }
                        );
                    }

                    //Add option variant value
                    language = getLanguageMap( languageData );
                    let optionVariantNewValue = attachArrayToObject( optionVariantValueNewElements[ indexOptionVariantTextNewElements ], language );

                    if ( optionVariantNewValue )
                    {
                        const addOptionVariantValue = await api.put(
                            serviceOptionVariantTable,
                            {
                                id: optionVariantId,
                                value: optionVariantNewValue
                            }
                        );
                    }

                    //Add option variant price
                    let optionVariantNewPrice = attachArrayToObject( optionVariantPriceNewElements[ indexOptionVariantTextNewElements ], currency );

                    if ( optionVariantNewPrice )
                    {
                        const addOptionVariantPrice = await api.put(
                            serviceOptionVariantTable,
                            {
                                id: optionVariantId,
                                price: optionVariantNewPrice
                            }
                        );
                    }
                }
            }
        }

        throw redirect( 303, `/admin/service/edit/${serviceId}` );
    }
};
