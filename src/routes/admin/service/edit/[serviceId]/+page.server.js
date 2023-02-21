// -- IMPORTS

import { languageTable, currencyTable, serviceTable, companyTable, categoryTable, serviceImageTable, servicePackTable, servicePackTypeTable, servicePackIncludeTable, serviceAdvantageTable, serviceProcessTable, serviceOptionTable, serviceOptionVariantTable} from '$lib/database';
import { attachArrayToObject, convertToSlug, getLanguageMap, getCurrencyMap, sliceIntoChunks } from '$lib/admin';
import { redirect } from '@sveltejs/kit';
import { getRandomTuid, getMillisecondTimestamp, getTranslatedTextByCode } from 'senselogic-gist';
import * as api from '$lib/api.js';
import { writeFileSync, unlink } from 'fs';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load(
    { params }
    )
{
    let languageData = await languageTable.selectRows();
    let currencyData = await currencyTable.selectRows();

    let serviceData = await serviceTable.selectRow(
        {
            where : [ [ 'id' ], '=', params.serviceId ]
        }
        );

    let companyData = await companyTable.selectRows();

    let categoryData = await categoryTable.selectRows();

    let serviceImages = await serviceImageTable.selectRows(
        {
            where : [ [ 'serviceId' ], '=', params.serviceId ]
        }
        );

    let servicePack = await servicePackTable.selectRows(
        {
            where : [ [ 'serviceId' ], '=', params.serviceId ]
        }
        );

    let servicePackArray = [];

    for ( let pack of servicePack )
    {
        let packInclude = await servicePackIncludeTable.selectRows(
            {
                columns : [ 'text' ],
                where : [ [ 'packId' ], '=', pack.id ]
            }
            );

        let packIncludeArray = [];
        packIncludeArray.push( packInclude );

        let newPack = {
            info : pack,
            includes : packInclude
            }

        servicePackArray.push( newPack );
    }

    let servicePackType = await servicePackTypeTable.selectRows();

    let serviceAdvantage = await serviceAdvantageTable.selectRows(
        {
            where : [ [ 'serviceId' ], '=', params.serviceId ]
        }
        );

    let serviceProcess = await serviceProcessTable.selectRows(
        {
            where : [ [ 'serviceId' ], '=', params.serviceId ]
        }
        );

    let serviceOption = await serviceOptionTable.selectRows(
        {
            where : [ [ 'serviceId' ], '=', params.serviceId ]
        }
    );

    let serviceOptionArray = [];

    for ( let option of serviceOption )
    {
        let serviceOptionVariant = await serviceOptionVariantTable.selectRows(
            {
                where : [ [ 'optionId' ], '=', option.id ]
            }
        );

        let newOption = {
            option : option,
            optionVariant : serviceOptionVariant,
            };

        serviceOptionArray.push( newOption )
    }

    return {
        languageData : languageData,
        currencyData : currencyData,
        serviceData : serviceData,
        companyData : companyData,
        categoryData : categoryData,
        serviceImages : serviceImages,
        servicePack : servicePackArray,
        servicePackType : servicePackType,
        serviceAdvantage : serviceAdvantage,
        serviceProcess : serviceProcess,
        serviceOption : serviceOption,
        serviceOptionArray : serviceOptionArray
        };
}

/** @type {import('./$types').Actions} */
export const actions = {
    edit: async ( { params, request } ) => {

        const data = await request.formData();

        const timeStamp = getMillisecondTimestamp();

        let languageData = await languageTable.selectRows();
        let language = getLanguageMap( languageData );

        let currencyData = await currencyTable.selectRows();
        let currency = getCurrencyMap( currencyData );

        // SERVICE INFO
        let serviceData = await serviceTable.selectRow(
            {
                where : [ [ 'id' ], '=', params.serviceId ]
            }
            );

        let serviceId = params.serviceId;

        //Edit Title
        let serviceTitle =  data.get( 'title' );

        if ( serviceTitle )
        {
            const putTitle = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    title: serviceTitle,
                }
            );
        }

        //Edit slug
        let serviceSlug = convertToSlug( serviceTitle, 'string' );

        if ( serviceSlug )
        {
            const putSlug = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    slug: serviceSlug,
                }
            );
        }

        //Edit description
        let serviceDescriptionElements =  data.getAll( 'description' );
        let serviceDescription = attachArrayToObject( serviceDescriptionElements, serviceData.description );

        if ( serviceDescription )
        {
            const putDescription = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    description: serviceDescription,
                }
            );
        }

        //Edit highlight
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
            const putHighlight = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    highlight: serviceHighlight,
                }
            );
        }

        //Edit highlight
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
            const putHasPrice = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    hasPrice: serviceHasPrice,
                }
            );
        }

        //Edit unit time
        let serviceUnitTime =  data.get( 'unit-time' );

        if ( serviceUnitTime )
        {
            const putUnitTime = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    unitTime: serviceUnitTime,
                }
            );
        }

        //Edit unit price
        let serviceUnitPriceElements =  data.getAll( 'unit-price' );
        let serviceUnitPrice = attachArrayToObject( serviceUnitPriceElements, serviceData.unitPrice );

        if ( serviceUnitPrice )
        {
            const putUnitPrice = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    unitPrice: serviceUnitPrice,
                }
            );
        }

        //Edit companyId
        let serviceCompanyId = data.get( 'companyId' );

        if ( serviceCompanyId )
        {
            const putCompanyId = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    companyId: serviceCompanyId,
                }
            );
        }

        //Edit categoryId
        let serviceCategoryId = data.get( 'categoryId' );

        if ( serviceCategoryId )
        {
            const putCategoryId = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    categoryId: serviceCategoryId,
                }
            );
        }

        //Edit additional title
        let serviceAdditionalTitleElements =  data.getAll( 'additional-title' );
        let serviceAdditionalTitle = attachArrayToObject( serviceAdditionalTitleElements, serviceData.additionalTitle );

        if ( serviceAdditionalTitle )
        {
            const putAdditionalTitle = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    additionalTitle: serviceAdditionalTitle,
                }
            );
        }

        //Edit additional description
        let serviceAdditionalDescriptionElements =  data.getAll( 'additional-description' );
        let serviceAdditionalDescription = attachArrayToObject( serviceAdditionalDescriptionElements, serviceData.additionalDescription );

        if ( serviceAdditionalDescription )
        {
            const putAdditionalDescription = await api.put(
                serviceTable,
                {
                    id: serviceId,
                    additionalDescription: serviceAdditionalDescription,
                }
            );
        }

        //Edit ImagePath
        let serviceFileName =  data.get( 'image-file-name' );
        let serviceFileExtension =  data.get( 'image-file-extension' );
        let serviceFileData =  data.get( 'image-file-data' );

        let serviceOldImagePath = data.get( 'imagePath' );
        let serviceImagePath;

        if ( serviceFileData )
        {
            unlink( 'static' + serviceOldImagePath, ( err ) => {
                console.log( serviceOldImagePath + ' was deleted' );
            });

            serviceImagePath = '/image/service/' + serviceFileName + '-' + timeStamp + '.' + serviceFileExtension;

            writeFileSync( 'static' + serviceImagePath, serviceFileData, 'base64' );

            if ( serviceImagePath )
            {
                const putImagePath = await api.put(
                    serviceTable,
                    {
                        id: serviceId,
                        imagePath: serviceImagePath,
                    }
                );
            }
        }

        //GALLERY
        let serviceImages = await serviceImageTable.selectRows(
            {
                where : [ [ 'serviceId' ], '=', params.serviceId ]
            }
            );

        //Delete deleted items on gallery
        let galleryCounter = data.getAll( 'gallery-file-counter' );
        let galleryArray = [];

        for ( let indexGalleryCounter = 0; indexGalleryCounter < galleryCounter.length ;indexGalleryCounter++ )
        {
            let filePath =  data.get( 'gallery-file-path-' + galleryCounter[ indexGalleryCounter ] );

            galleryArray.push( filePath );
        }

        for ( let indexServiceImages = 0; indexServiceImages < serviceImages.length ;indexServiceImages++ )
        {
            const found = galleryArray.find( element => element == serviceImages[ indexServiceImages ].imagePath );

            if ( found === undefined )
            {
                unlink('static' + serviceImages[ indexServiceImages ].imagePath, ( err ) => {
                    console.log( serviceImages[ indexServiceImages ].imagePath + ' was deleted' );
                });

                const deleteServiceImage = await api.del(
                    serviceImageTable,
                    {
                        id: serviceImages[ indexServiceImages ].id
                    }
                );
            }
        }
        //Add new items on gallery
        let newGalleryCounter = data.getAll('new-gallery-file-counter');
        if ( newGalleryCounter )
        {
            for ( let indexNewGalleryCounter= 0; indexNewGalleryCounter< newGalleryCounter.length ;indexNewGalleryCounter++ )
            {
                let serviceImageId = getRandomTuid();

                let fileName =  data.get( 'new-gallery-file-name-' + newGalleryCounter[ indexNewGalleryCounter ] );
                let fileExtension =  data.get( 'new-gallery-file-extension-' + newGalleryCounter[ indexNewGalleryCounter ] );
                let fileData =  data.get( 'new-gallery-file-data-' + newGalleryCounter[ indexNewGalleryCounter ] );
                let fileNumber =  data.get( 'new-gallery-file-number-' + newGalleryCounter[ indexNewGalleryCounter ] );

                let galleryImagePath;

                if ( fileData )
                {
                    galleryImagePath = '/image/service/' + fileName + '-' + timeStamp + '.' + fileExtension;

                    if ( galleryImagePath )
                    {
                        const addServiceImage = await api.post(
                            serviceImageTable,
                            {
                                id: serviceImageId,
                                serviceId: params.serviceId,
                                // number: fileNumber,
                                imagePath: galleryImagePath,
                            }
                        );
                    }

                    writeFileSync( 'static' + galleryImagePath, fileData, 'base64' );
                }
            }
        }

        //PACKS
        let servicePackData = await servicePackTable.selectRows(
            {
                where : [ [ 'serviceId' ], '=', params.serviceId ]
            }
            );

        for ( let indexPack in servicePackData )
        {
            let packId = servicePackData[ indexPack ].id;

            let packNameElements = data.getAll( 'pack-name-' +  indexPack );
            let packName = '';

            if ( packNameElements.length > 0 )
            {
                //Edit pack name
                packName = attachArrayToObject( packNameElements, servicePackData[ indexPack ].name );

                if ( packName )
                {
                    const putPackName = await api.put(
                        servicePackTable,
                        {
                            id: packId,
                            name: packName
                        }
                    )
                }
            }

            let packDescriptionElements = data.getAll( 'pack-description-' +  indexPack );
            let packDescription = '';
            if ( packDescriptionElements.length > 0 )
            {
                //Edit pack description
                packDescription = attachArrayToObject( packDescriptionElements, servicePackData[ indexPack ].description );

                if ( packDescription )
                {
                    const putPackDescription = await api.put(
                        servicePackTable,
                        {
                            id: packId,
                            description: packDescription
                        }
                    );
                }
            }

            let packPriceElements = data.getAll( 'pack-price-' +  indexPack );
            let packPrice = '';
            if ( packPriceElements.length > 0 )
            {
                //Edit pack price
                packPrice = attachArrayToObject( packPriceElements, servicePackData[ indexPack ].price );

                if ( packPrice )
                {
                    const putPackPrice = await api.put(
                        servicePackTable,
                        {
                            id: packId,
                            price: packPrice
                        }
                    );
                }
            }

            //Edit pack quantity
            let packQuantity = data.get( 'pack-quantity-' +  indexPack );

            if ( packQuantity )
            {
                const putPackQuantity = await api.put(
                    servicePackTable,
                    {
                        id: packId,
                        quantity: packQuantity
                    }
                );
            }

            //Edit pack typeId
            let packTypeId = data.get( 'pack-packTypeId-' +  indexPack );

            if ( packTypeId )
            {
                const putPackTypeId = await api.put(
                    servicePackTable,
                    {
                        id: packId,
                        typeId: packTypeId
                    }
                );
            }

            //Edit pack total price
            let newPackTotalPrice = new Array();
            for ( let indexPriceElements = 0; indexPriceElements< packPriceElements.length ;indexPriceElements++ )
            {
                let product = ( packPriceElements[indexPriceElements] * packQuantity );
                newPackTotalPrice.push( product )
            }

            let packTotalPrice = attachArrayToObject( newPackTotalPrice, servicePackData[ indexPack ].totalPrice );

            if ( packTotalPrice )
            {
                const putPackTotalPrice = await api.put(
                    servicePackTable,
                    {
                        id: packId,
                        totalPrice: packTotalPrice
                    }
                );
            }

            //Edit pack color
            let packColor = data.get( 'pack-color-' +  indexPack );

            if ( packColor )
            {
                const putPackColor = await api.put(
                    servicePackTable,
                    {
                        id: packId,
                        color: packColor
                    }
                );
            }

            //Edit pack image path
            let packFileName =  data.get( 'pack-file-name-'+  indexPack );
            let packFileExtension =  data.get( 'pack-file-extension-'+  indexPack );
            let packFileData =  data.get( 'pack-file-data-'+  indexPack );

            let packOldImagePath = data.get( 'packImagePath-'+  indexPack );
            let packImagePath;

            if ( packFileData )
            {
                unlink( 'static' + packOldImagePath, ( err ) => {
                    console.log( packOldImagePath + ' was deleted' );
                });

                packImagePath = '/image/service/' + packFileName + '-' + timeStamp + '.' + packFileExtension;

                writeFileSync( 'static' + packImagePath, packFileData, 'base64' );

                if ( packImagePath )
                {
                    console.log(packImagePath)
                    const putPackImagePath = await api.put(
                        servicePackTable,
                        {
                            id: packId,
                            imagePath: packImagePath
                        }
                    );
                }
            }

            if ( packName == '' || packName == null )
            {
                //Delete Pack
                const deletePack = await api.del(
                    servicePackTable,
                    {
                        id: packId
                    }
                );
            }

            //Pack includes
            let servicePackIncludeData = await servicePackIncludeTable.selectRows(
                {
                    where : [ [ 'packId' ], '=', servicePackData[ indexPack ].id ]
                }
                );

            for ( let indexIncludePack in servicePackIncludeData )
            {
                let includePackId = servicePackIncludeData[ indexIncludePack ].id;

                //Edit pack includes text
                let includePackTextElements = data.getAll( 'pack-include-' + indexPack + '-' +  indexIncludePack );
                let includePackText = '';

                if ( includePackTextElements.length > 0 )
                {
                    includePackText = attachArrayToObject( includePackTextElements, servicePackIncludeData[ indexIncludePack ].text );

                    if ( includePackText )
                    {
                        const putIncludeText = await api.put(
                            servicePackIncludeTable,
                            {
                                id: includePackId,
                                text: includePackText,
                            }
                        );
                    }
                }

                if ( includePackText == '' || includePackText == null )
                {
                    //Delete pack includes
                    const deletePackInclude = await api.del(
                        servicePackIncludeTable,
                        {
                            id: includePackId
                        }
                    );
                }
            }
            //New pack includes
            let includeNewElements = data.getAll( 'pack-include-' + servicePackData[ indexPack ].id );

            includeNewElements = sliceIntoChunks( includeNewElements, 3 );

            if ( includeNewElements != '' )
            {
                for (let indexIncludeNewElements = 0; indexIncludeNewElements < includeNewElements.length; indexIncludeNewElements++)
                {
                    //Add new pack
                    let includePackId = getRandomTuid();

                    if ( includePackId )
                    {
                        const addPackInclude = await api.post(
                            servicePackIncludeTable,
                            {
                                id: includePackId,
                                packId: servicePackData[ indexPack ].id,
                            }
                        );
                    }

                    //Add new pack text
                    let includePackText = attachArrayToObject( includeNewElements[ indexIncludeNewElements ], language );

                    if ( includePackText )
                    {
                        const addPackIncludeText = await api.put(
                            servicePackIncludeTable,
                            {
                                id: includePackId,
                                text: includePackText,
                            }
                        );
                    }
                }
            }
        }

        //New pack
        let packCounter = data.getAll( 'new-pack-counter' );

        for ( let indexPackCounter = 0; indexPackCounter< packCounter.length ;indexPackCounter++ )
        {
            //Add new pack
            let packId = getRandomTuid();

            if ( packId )
            {
                const postNewPack = await api.post(
                    servicePackTable,
                    {
                        id: packId,
                        serviceId: params.serviceId,
                    }
                );
            }

            //Add new pack name
            let packNameNewElements = data.getAll( 'new-pack-name-' + packCounter[ indexPackCounter ] );
            let packNameNew = attachArrayToObject( packNameNewElements, language );

            if ( packNameNew )
            {
                const putNewPackName = await api.put(
                    servicePackTable,
                    {
                        id: packId,
                        name: packNameNew
                    }
                );
            }

            //Add new pack description
            language = getLanguageMap( languageData );
            let packDescriptionNewElements = data.getAll( 'new-pack-description-' + packCounter[ indexPackCounter ] );
            let packDescriptionNew = attachArrayToObject( packDescriptionNewElements, language );

            if ( packDescriptionNew )
            {
                const putNewPackDescription = await api.put(
                    servicePackTable,
                    {
                        id: packId,
                        description: packDescriptionNew
                    }
                );
            }

            //Add new pack price
            let packPriceNewElements = data.getAll( 'new-pack-price-' + packCounter[ indexPackCounter ] );
            let packPriceNew = attachArrayToObject( packPriceNewElements, currency );

            if ( packPriceNew )
            {
                const putNewPackPrice = await api.put(
                    servicePackTable,
                    {
                        id: packId,
                        price: packPriceNew
                    }
                );
            }

            //Add new pack quantity
            let packQuantityNew = data.get( 'new-pack-quantity-' + packCounter[ indexPackCounter ] );

            if ( packQuantityNew )
            {
                const putNewPackQuantity = await api.put(
                    servicePackTable,
                    {
                        id: packId,
                        quantity: packQuantityNew
                    }
                );
            }

            //Add new pack total price
            let newTotalPrice = new Array();

            for ( let indexPackPriceElements = 0; indexPackPriceElements< packPriceNewElements.length ;indexPackPriceElements++ )
            {
                let product = ( packPriceNewElements[ indexPackPriceElements ] * packQuantityNew );
                newTotalPrice.push( product )
            }

            let packTotalPriceNew = attachArrayToObject( newTotalPrice, currency );

            if ( packTotalPriceNew )
            {
                const putNewPackTotalPrice = await api.put(
                    servicePackTable,
                    {
                        id: packId,
                        totalPrice: packTotalPriceNew
                    }
                );
            }

            //Add new pack typeId
            let packTypeIdNew = data.get( 'new-pack-packTypeId-' + packCounter[ indexPackCounter ] );

            if ( packTypeIdNew )
            {
                const putNewPackTypeId = await api.put(
                    servicePackTable,
                    {
                        id: packId,
                        typeId: packTypeIdNew
                    }
                );
            }

            //Add new pack color
            let packColorNew = data.get( 'new-pack-color-' +  packCounter[ indexPackCounter ] );

            if ( packColorNew )
            {
                const putNewPackColor = await api.put(
                    servicePackTable,
                    {
                        id: packId,
                        color: packColorNew
                    }
                );
            }

            //Add new pack imagePath
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
                    const putNewPackImagePath = await api.put(
                        servicePackTable,
                        {
                            id: packId,
                            imagePath: packImagePath
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
                    let includePackId = getRandomTuid();

                    if ( includePackId )
                    {
                        const addPackInclude = await api.post(
                            servicePackIncludeTable,
                            {
                                id: includePackId,
                                packId: packId,
                            }
                        );
                    }

                    let includePackText = attachArrayToObject( packIncludesNewElements[ indexPackIncludesNewElements ], language );

                    if ( includePackText )
                    {
                        const addPackIncludeText = await api.put(
                            servicePackIncludeTable,
                            {
                                id: includePackId,
                                text: includePackText,
                            }
                        );
                    }
                }
            }
        }

        //ADVANTAGE
        let serviceAdvantage = await serviceAdvantageTable.selectRows(
            {
                where : [ [ 'serviceId' ], '=', params.serviceId ]
            }
            );

        for ( let indexAdvantage in serviceAdvantage)
        {
            let advantageId = serviceAdvantage[ indexAdvantage ].id;

            //Edit advantage name
            let advantageNameElements = data.getAll( 'advantage-name-' +  serviceAdvantage[ indexAdvantage ].id );
            let advantageName = '';

            if ( advantageNameElements.length > 0)
            {
                advantageName = attachArrayToObject( advantageNameElements, serviceAdvantage[ indexAdvantage ].name );

                if ( advantageName )
                {
                    const putAdvantageName = await api.put(
                        serviceAdvantageTable,
                        {
                            id: advantageId,
                            name: advantageName
                        }
                    );
                }
            }

            //Edit advantage description
            let advantageDescriptionElements = data.getAll( 'advantage-description-' +  serviceAdvantage[ indexAdvantage ].id );
            let advantageDescription = '';

            if ( advantageDescriptionElements.length > 0 )
            {
                advantageDescription = attachArrayToObject( advantageDescriptionElements, serviceAdvantage[ indexAdvantage ].description );

                if ( advantageDescription )
                {
                    const putAdvantageDescription = await api.put(
                        serviceAdvantageTable,
                        {
                            id: advantageId,
                            description: advantageDescription
                        }
                    );
                }
            }

            //Edit advantage imagePath
            let advantageFileName =  data.get( 'advantage-file-name-'+  indexAdvantage );
            let advantageFileExtension =  data.get( 'advantage-file-extension-'+  indexAdvantage );
            let advantageFileData =  data.get( 'advantage-file-data-'+  indexAdvantage );

            let advantageOldImagePath = data.get( 'advantageImagePath-'+  indexAdvantage );
            let advantageImagePath;

            if ( advantageFileData )
            {
                unlink( 'static' + advantageOldImagePath, ( err ) => {
                    console.log( advantageOldImagePath + ' was deleted' );
                });

                advantageImagePath = '/image/service/' + advantageFileName + '-' + timeStamp + '.' + advantageFileExtension;

                writeFileSync( 'static' + advantageImagePath, advantageFileData, 'base64' );

                if ( advantageImagePath )
                {
                    const putAdvantageImagePath = await api.put(
                        serviceAdvantageTable,
                        {
                            id: advantageId,
                            imagePath: advantageImagePath
                        }
                    );
                }
            }

            if ( advantageName == '' || advantageName == null )
            {
                //Delete advantage
                const deleteAdvantage = await api.del(
                    serviceAdvantageTable,
                    {
                        id: advantageId
                    }
                );
            }
        }

        //New advantage
        let advantageCounter = data.getAll( 'new-advantage-counter' );

        for ( let indexAdvantageCounter = 0; indexAdvantageCounter< advantageCounter.length ;indexAdvantageCounter++ )
        {
            //Add new advantage
            let advantageId = getRandomTuid();

            if ( advantageId )
            {
                const postNewAdvantage = await api.post(
                    serviceAdvantageTable,
                    {
                        id: advantageId,
                        serviceId: params.serviceId,
                    }
                );
            }

            //Add new advantage name
            let advantageNameNewElements = data.getAll( 'new-advantage-name-' + advantageCounter[ indexAdvantageCounter ] );
            let advantageNameNew = attachArrayToObject( advantageNameNewElements, language );

            if ( advantageNameNew )
            {
                const postNewAdvantageName = await api.put(
                    serviceAdvantageTable,
                    {
                        id: advantageId,
                        name:advantageNameNew
                    }
                );
            }

            //Add new advantage description
            let advantageDescriptionNewElements = data.getAll( 'new-advantage-description-' + advantageCounter[ indexAdvantageCounter ] );
            let advantageDescriptionNew = attachArrayToObject( advantageDescriptionNewElements, language );

            if ( advantageDescriptionNew )
            {
                const postNewAdvantageDescription = await api.put(
                    serviceAdvantageTable,
                    {
                        id: advantageId,
                        name:advantageDescriptionNew
                    }
                );
            }

            //Add new advantage imagePath
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
                    const postNewAdvantageImagePath = await api.put(
                        serviceAdvantageTable,
                        {
                            id: advantageId,
                            imagePath: advantageImagePath
                        }
                    );
                }
            }
        }

        //PROCESS
        let serviceProcess = await serviceProcessTable.selectRows(
            {
                where : [ [ 'serviceId' ], '=', params.serviceId ]
            }
            );

        for ( let indexProcess in serviceProcess)
        {
            let processId = serviceProcess[indexProcess].id;

            //Edit process name
            let processNameElements = data.getAll( 'process-name-' +  serviceProcess[ indexProcess ].id );
            let processName = '';

            if ( processNameElements.length > 0 )
            {
                processName = attachArrayToObject( processNameElements, serviceProcess[ indexProcess ].name );

                if ( processName )
                {
                    const putProcessName = await api.put(
                        serviceProcessTable,
                        {
                            id: processId,
                            name: processName
                        }
                    );
                }
            }

            //Edit process description
            let processDescriptionElements = data.getAll( 'process-description-' +  serviceProcess[ indexProcess ].id );
            let processDescription = '';

            if ( processDescriptionElements.length > 0 )
            {
                processDescription = attachArrayToObject( processDescriptionElements, serviceProcess[ indexProcess ].description );

                if ( processDescription )
                {
                    const putProcessDescription = await api.put(
                        serviceProcessTable,
                        {
                            id: processId,
                            description: processDescription
                        }
                    );
                }
            }

            //Edit process number
            let processNumber = '';
            processNumber = data.get( 'process-number-' +  serviceProcess[ indexProcess ].id );

            if ( processNumber )
            {
                const putProcessNumber = await api.put(
                    serviceProcessTable,
                    {
                        id: processId,
                        number: processNumber
                    }
                );
            }

            if ( processName == '' || processName == null )
            {
                //Delete process
                const deleteProcess = await api.del(
                    serviceProcessTable,
                    {
                        id: processId
                    }
                );
            }
        }

        //New process
        let processCounter = data.getAll( 'new-process-counter' );

        for ( let indexProcessCounter = 0; indexProcessCounter< processCounter.length ;indexProcessCounter++ )
        {
            //Add new process
            let processId = getRandomTuid();

            if ( processId )
            {
                const postNewProcess = await api.post(
                    serviceProcessTable,
                    {
                        id: processId,
                        serviceId: params.serviceId,
                    }
                );
            }

            //Add new process name
            let processNameNewElements = data.getAll( 'new-process-name-' + processCounter[ indexProcessCounter ] );
            let processNameNew = attachArrayToObject( processNameNewElements, language );

            if ( processNameNew )
            {
                const postNewProcessName = await api.put(
                    serviceProcessTable,
                    {
                        id: processId,
                        name: processNameNew
                    }
                );
            }

            //Add new process description
            let processDescriptionNewElements = data.getAll( 'new-process-description-' + processCounter[ indexProcessCounter ] );
            let processDescriptionNew = attachArrayToObject( processDescriptionNewElements, language );

            if ( processDescriptionNew )
            {
                const postNewProcessDescription = await api.put(
                    serviceProcessTable,
                    {
                        id: processId,
                        description: processDescriptionNew
                    }
                );
            }

            //Add new process number
            let processNumberNew = data.get( 'new-process-number-' + processCounter[ indexProcessCounter ] );

            if ( processNumberNew )
            {
                const postNewProcessNumber = await api.put(
                    serviceProcessTable,
                    {
                        id: processId,
                        number: processNumberNew
                    }
                );
            }
        }

        //OPTIONS
        let serviceOption = await serviceOptionTable.selectRows(
            {
                where : [ [ 'serviceId' ], '=', params.serviceId ]
            }
            );

        for ( let indexOption in serviceOption )
        {
            let optionId = serviceOption[ indexOption ].id;

            //Edit option text
            let optionTextElements = data.getAll( 'option-text-' +  indexOption );
            let optionText = '';

            if ( optionTextElements.length > 0 )
            {
                optionText = attachArrayToObject( optionTextElements, serviceOption[ indexOption ].text );

                if ( optionText )
                {
                    const putOptionText = await api.put(
                        serviceOptionTable,
                        {
                            id: optionId,
                            text: optionText
                        }
                    );
                }
            }

            //Edit option description
            let optionDescriptionElements = data.getAll( 'option-description-' + indexOption );
            let optionDescription = '';

            if ( optionDescriptionElements.length > 0 )
            {
                optionDescription = attachArrayToObject( optionDescriptionElements, serviceOption[ indexOption ].description );

                if ( optionDescription )
                {
                    const putOptionDescription = await api.put(
                        serviceOptionTable,
                        {
                            id: optionId,
                            description: optionDescription
                        }
                    );
                }
            }

            //Edit option type
            let optionType = data.get( 'option-type-' +  indexOption  );

            if ( optionType )
            {
                const putOptionType = await api.put(
                    serviceOptionTable,
                    {
                        id: optionId,
                        type: optionType
                    }
                );
            }

            if ( optionText == '' || optionText == null )
            {
                //Delete option
                const deleteOption = await api.del(
                    serviceOptionTable,
                    {
                        id: optionId
                    }
                );
            }

            let serviceOptionVariantData = await serviceOptionVariantTable.selectRows(
                {
                    where : [ [ 'optionId' ], '=', serviceOption[ indexOption ].id ]
                }
                );

            for ( let indexOptionVariant in serviceOptionVariantData )
            {
                let optionVariantId = serviceOptionVariantData[indexOptionVariant].id;

                //Edit option variant text
                let optionVariantTextElements = data.getAll( 'option-variant-text-' + indexOption + '-' +  indexOptionVariant );
                let optionVariantText = '';

                if ( optionVariantText.length > 0 )
                {
                    optionVariantText = attachArrayToObject( optionVariantTextElements, serviceOptionVariantData[ indexOptionVariant ].text );

                    if ( optionVariantText )
                    {
                        const putOptionVariantText = await api.put(
                            serviceOptionVariantTable,
                            {
                                id: optionVariantId,
                                text: optionVariantText
                            }
                        );
                    }
                }

                //Edit option variant value
                let optionVariantValueElements = data.getAll( 'option-variant-value-' + indexOption + '-' +  indexOptionVariant );
                let optionVariantValue = '';

                if ( optionVariantValueElements.length > 0 )
                {
                    optionVariantValue = attachArrayToObject( optionVariantValueElements, serviceOptionVariantData[ indexOptionVariant ].value );

                    if ( optionVariantValue )
                    {
                        const putOptionVariantValue = await api.put(
                            serviceOptionVariantTable,
                            {
                                id: optionVariantId,
                                value: optionVariantValue
                            }
                        );
                    }
                }

                //Edit option variant price
                let optionVariantPriceElements = data.getAll( 'option-variant-price-' + indexOption + '-' +  indexOptionVariant );
                let optionVariantPrice = '';

                if ( optionVariantPriceElements.length > 0 )
                {
                    optionVariantPrice = attachArrayToObject( optionVariantPriceElements, serviceOptionVariantData[ indexOptionVariant ].price );

                    if ( optionVariantPrice )
                    {
                        const putOptionVariantPrice = await api.put(
                            serviceOptionVariantTable,
                            {
                                id: optionVariantId,
                                price: optionVariantPrice
                            }
                        );
                    }
                }

                if ( optionVariantText == '' || optionVariantText == null )
                {
                    //Delete option variant
                    const deleteOptionVariant = await api.del(
                        serviceOptionVariantTable,
                        {
                            id: optionVariantId
                        }
                    );
                }
            }

            //New option variant
            let optionVariantTextNewElements = data.getAll( 'option-variant-text-' + serviceOption[ indexOption ].id );
            let optionVariantValueNewElements = data.getAll( 'option-variant-value-' + serviceOption[ indexOption ].id );
            let optionVariantPriceNewElements = data.getAll( 'option-variant-price-' + serviceOption[ indexOption ].id );

            optionVariantTextNewElements = sliceIntoChunks( optionVariantTextNewElements, 3 );
            optionVariantValueNewElements = sliceIntoChunks( optionVariantValueNewElements, 3 );
            optionVariantPriceNewElements = sliceIntoChunks( optionVariantPriceNewElements, 3) ;

            if ( optionVariantTextNewElements != '' )
            {
                for (let indexOptionVariantTextNewElements = 0; indexOptionVariantTextNewElements < optionVariantTextNewElements.length; indexOptionVariantTextNewElements++)
                {
                    //Add new option variant
                    let optionVariantNewId = getRandomTuid();

                    if ( optionVariantNewId )
                    {
                        const addNewOptionVariant = await api.post(
                            serviceOptionVariantTable,
                            {
                                id: optionVariantNewId,
                                optionId: serviceOption[ indexOption ].id
                            }
                        );
                    }

                    //Add new option variant text
                    let optionVariantNewText = attachArrayToObject( optionVariantTextNewElements[ indexOptionVariantTextNewElements ], language );

                    if ( optionVariantNewText )
                    {
                        const addNewOptionVariantText = await api.put(
                            serviceOptionVariantTable,
                            {
                                id: optionVariantNewId,
                                text: optionVariantNewText
                            }
                        );
                    }

                    //Add new option variant value
                    language = getLanguageMap( languageData );
                    let optionVariantNewValue = attachArrayToObject( optionVariantValueNewElements[ indexOptionVariantTextNewElements ], language );

                    if ( optionVariantNewValue )
                    {
                        const addNewOptionVariantValue = await api.put(
                            serviceOptionVariantTable,
                            {
                                id: optionVariantNewId,
                                value: optionVariantNewValue
                            }
                        );
                    }

                    //Add new option variant price
                    let optionVariantNewPrice = attachArrayToObject( optionVariantPriceNewElements[ indexOptionVariantTextNewElements ], currency );

                    if ( optionVariantNewPrice )
                    {
                        const addNewOptionVariantPrice = await api.put(
                            serviceOptionVariantTable,
                            {
                                id: optionVariantNewId,
                                price: optionVariantNewPrice
                            }
                        );
                    }
                }
            }
        }

        //New option
        let optionCounter = data.getAll( 'new-option-counter' );

        for ( let indexOptionCounter = 0; indexOptionCounter< optionCounter.length ;indexOptionCounter++ )
        {
            //Add new option
            let optionIdNew = getRandomTuid();

            if ( optionIdNew )
            {
                const addNewOption = await api.post(
                    serviceOptionTable,
                    {
                        id: optionIdNew,
                        serviceId: params.serviceId
                    }
                );
            }

            //Add new option text
            let optionTextNewElements = data.getAll( 'new-option-text-' + optionCounter[ indexOptionCounter ] );
            let optionTextNew = attachArrayToObject( optionTextNewElements, language );

            if ( optionTextNew )
            {
                const addNewOptionText = await api.put(
                    serviceOptionTable,
                    {
                        id: optionIdNew,
                        text: optionTextNew
                    }
                );
            }

            //Add new option description
            language = getLanguageMap( languageData );
            let optionDescriptionNewElements = data.getAll( 'new-option-description-' + optionCounter[ indexOptionCounter ] );
            let optionDescriptionNew = attachArrayToObject( optionDescriptionNewElements, language );

            if ( optionDescriptionNew )
            {
                const addNewOptionDescription = await api.put(
                    serviceOptionTable,
                    {
                        id: optionIdNew,
                        description: optionDescriptionNew,
                    }
                );
            }

            //Add new option type
            let optionTypeNew = data.get( 'new-option-type-' + optionCounter[ indexOptionCounter ] );

            if ( optionTypeNew )
            {
                const addNewOptionType = await api.put(
                    serviceOptionTable,
                    {
                        id: optionIdNew,
                        type: optionTypeNew
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
                    //Add new option variant
                    let optionVariantNewId = getRandomTuid();

                    if ( optionVariantNewId )
                    {
                        const addNewOptionVariant = await api.post(
                            serviceOptionVariantTable,
                            {
                                id: optionVariantNewId,
                                optionId: optionIdNew
                            }
                        );
                    }

                    //Add new option variant text
                    let optionVariantNewText = attachArrayToObject( optionVariantTextNewElements[ indexOptionVariantTextNewElements ], language );

                    if ( optionVariantNewText )
                    {
                        const addNewOptionVariantText = await api.put(
                            serviceOptionVariantTable,
                            {
                                id: optionVariantNewId,
                                text: optionVariantNewText
                            }
                        );
                    }

                    //Add new option variant value
                    language = getLanguageMap( languageData );
                    let optionVariantNewValue = attachArrayToObject( optionVariantValueNewElements[ indexOptionVariantTextNewElements ], language );

                    if ( optionVariantNewValue )
                    {
                        const addNewOptionVariantValue = await api.put(
                            serviceOptionVariantTable,
                            {
                                id: optionVariantNewId,
                                value: optionVariantNewValue
                            }
                        );
                    }

                    //Add new option variant price
                    let optionVariantNewPrice = attachArrayToObject( optionVariantPriceNewElements[ indexOptionVariantTextNewElements ], currency );

                    if ( optionVariantNewPrice )
                    {
                        const addNewOptionVariantPrice = await api.put(
                            serviceOptionVariantTable,
                            {
                                id: optionVariantNewId,
                                price: optionVariantNewPrice
                            }
                        );
                    }
                }
            }
        }

        if( data )
        {
            return {
                success: getTranslatedTextByCode( 'SuccessfullyUpdatedLabel' )
            }
        }
        else
        {
            return {
                errors: getTranslatedTextByCode( 'UnsuccessfullyUpdatedLabel' )
            }
        }
    },

    delete: async ( { params } ) => {
        let serviceId = params.serviceId;

        const deleteService = await api.del(
            serviceTable,
            {
                id: serviceId,
            }
        );

        throw redirect( 303, `/admin/service` );
    }
};
