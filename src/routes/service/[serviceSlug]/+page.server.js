// -- IMPORTS
import { getTranslatedTextByCode, getRandomTuid } from 'senselogic-gist';
import { error } from '@sveltejs/kit';
import { serviceTable, serviceImageTable, servicePackTable, servicePackTypeTable, servicePackIncludeTable, serviceAdvantageTable, serviceProcessTable, serviceInformationTable, serviceReviewTable, serviceOptionTypeTable, serviceOptionTable, serviceOptionVariantTable, userTable, companyTable, userSaveServiceTable } from '$lib/database';
import * as api from '$lib/api.js';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load( { params, locals } )
{
    let service = await serviceTable.selectRow(
        {
            where : [ [ 'slug' ], '=', params.serviceSlug ]
        }
        );

    let saved = await userSaveServiceTable.selectRow(
        {
            where : [ [ 'serviceId' ], '=', service.id ]
        }
        );

    let isSaved = false;

    if ( saved && locals.user )
    {
        if ( saved.userId === locals.user.id)
        {
            isSaved = true;
        }
    }

    let serviceData = {
        info : service,
        isSaved: isSaved
    }

    let serviceId = '';
    let categoryId = '';

    if ( service )
    {
        serviceId = service.id;
        categoryId = service.categoryId
    }

    let serviceImages = await serviceImageTable.selectRows(
        {
            where : [ [ 'serviceId' ], '=', serviceId ]
        }
        );

    let servicePack = await servicePackTable.selectRows(
        {
            where : [ [ 'serviceId' ], '=', serviceId ]
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
            where : [ [ 'serviceId' ], '=', serviceId ]
        }
        );

    let serviceProcess = await serviceProcessTable.selectRows(
        {
            where : [ [ 'serviceId' ], '=', serviceId ]
        }
        );

    let serviceInformation = await serviceInformationTable.selectRows(
        {
            where : [ [ 'serviceId' ], '=', serviceId ]
        }
        );

    let serviceRelated = await serviceTable.selectRows(
        {
            where : [ [ [ 'categoryId' ], '=', categoryId ], 'and', [ [ 'id' ], '!=', serviceId ] ]
        }
        );

    let serviceRelatedData = [];
    let maxServiceRelated = 3;

    for ( let indexService = 0; indexService < serviceRelated.length; indexService++ )
    {
        if ( indexService < maxServiceRelated )
        {
            let company = await companyTable.selectRow(
                {
                    where : [ [ 'id' ], '=', serviceRelated[ indexService ].companyId ]
                }
                );

            let serviceImages = await serviceImageTable.selectRows(
                {
                    where : [ [ 'serviceId' ], '=', serviceRelated[ indexService ].id ]
                }
                );

            let saved = await userSaveServiceTable.selectRow(
                {
                    where : [ [ 'serviceId' ], '=', serviceRelated[ indexService ].id ]
                }
                );

            let isSaved = false;

            if ( saved && locals.user )
            {
                if ( saved.userId === locals.user.id)
                {
                    isSaved = true;
                }
            }

            let newItem = {
                info : serviceRelated[ indexService ],
                isSaved: isSaved,
                company : company,
                images : serviceImages
            }

            serviceRelatedData.push( newItem );
        }
    }

    let serviceReview = await serviceReviewTable.selectRows(
        {
            where : [ [ 'serviceId' ], '=', serviceId ]
        }
        );

    let serviceReviewArray = [];

    for ( let review of serviceReview )
        {
            let user = await userTable.selectRow(
                {
                    columns : [ 'firstName' ],
                    where : [ [ 'id' ], '=', review.userId ]
                }
                );

                let newReview = {
                    review : review,
                    userName : user.firstName,
                    };

            serviceReviewArray.push( newReview );
        }

    let serviceOption = await serviceOptionTable.selectRows(
        {
            where : [ [ 'serviceId' ], '=', serviceId ]
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

        let serviceOptionType = await serviceOptionTypeTable.selectRow(
            {
                where : [ [ 'id' ], '=', option.typeId ]
            }
        );

        let newOption = {
            option : option,
            optionType : serviceOptionType.type,
            optionVariant : serviceOptionVariant,
            };

        serviceOptionArray.push( newOption )
    }

    return {
        serviceData : serviceData,
        serviceImages : serviceImages,
        servicePack : servicePackArray,
        servicePackType : servicePackType,
        serviceAdvantage : serviceAdvantage,
        serviceProcess : serviceProcess,
        serviceOption : serviceOptionArray,
        serviceRelated : serviceRelated,
        serviceRelatedData : serviceRelatedData,
        serviceInformation : serviceInformation,
        serviceReview : serviceReviewArray
        };
}

/** @type {import('./$types').Actions} */
export const actions = {
    toggleSave: async ( { locals, params, request } ) => {

        if ( !locals.user )
        {
            throw error(
                401,
                {
                    message: getTranslatedTextByCode( 'SomethingWentWrongLabel' )
                }
            );
        }

        const data = await request.formData();
        const saved = data.get( 'saved' ) !== 'on';

        let service = await serviceTable.selectRow(
            {
                where : [ [ 'slug' ], '=', params.serviceSlug ]
            }
            );

        let saveId = getRandomTuid();

        if ( saved )
        {
            const addSave = await api.post(
                userSaveServiceTable,
                {
                    id: saveId,
                    userId: locals.user.id,
                    serviceId: service.id
                }
                );
        }
        else
        {
            let saved = await userSaveServiceTable.selectRow(
                {
                    where : [ [ 'userId' ], '=', locals.user.id ] && [ [ 'serviceId' ], '=', service.id ]
                }
                );

            const deleteSave = await api.del(
                userSaveServiceTable,
                {
                    id: saved.id,
                }
                );
        }
    },
    deleteSave: async ( { locals, params, request } ) => {

        if ( !locals.user )
        {
            throw error(
                401,
                {
                    message: getTranslatedTextByCode( 'SomethingWentWrongLabel' )
                }
            );
        }

        let service = await serviceTable.selectRow(
            {
                where : [ [ 'slug' ], '=', params.serviceSlug ]
            }
            );

        let save = await userSaveServiceTable.selectRow(
            {
                where : [ [ 'userId' ], '=', locals.user.id ] && [ [ 'serviceId' ], '=', service.id ]
            }
            );

        const deleteSave = await api.del(
            userSaveServiceTable,
            {
                id: save.id,
            }
            );
    }
};
