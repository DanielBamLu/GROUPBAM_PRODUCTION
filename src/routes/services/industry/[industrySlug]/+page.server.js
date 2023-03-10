// -- IMPORTS

import { serviceTable, serviceIndustryTable, industryTable, companyIndustryTable, companyTable, serviceImageTable, userSaveServiceTable } from '$lib/database';

// -- FUNCTIONS

/** @type {import('./$types').PageServerLoad} */
export async function load( { params, locals } )
{
    let industry = await industryTable.selectRow(
        {
            where : [ [ 'slug' ], '=', params.industrySlug ]
        }
        );

    let industryId = '';

    if ( industry )
    {
        industryId = industry.id;
    }

    let serviceIndustryArray = await serviceIndustryTable.selectRows(
        {
            where : [ [ 'industryId' ], '=', industryId ]
        }
        );

    let serviceArray = [];

    for ( let serviceIndustry of serviceIndustryArray )
    {
        let service = await serviceTable.selectRow(
            {
                where : [ [ 'id' ], '=', serviceIndustry.serviceId ]
            }
            );

        serviceArray.push(service);
    }

    let serviceIndustry = [];

    for ( let item of serviceArray )
    {
        let company = await companyTable.selectRow(
            {
                where : [ [ 'id' ], '=', item.companyId ]
            }
            );

        let serviceImages = await serviceImageTable.selectRows(
            {
                where : [ [ 'serviceId' ], '=', item.id ]
            }
            );

        let saved = await userSaveServiceTable.selectRow(
            {
                where : [ [ 'serviceId' ], '=', item.id ]
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
            info : item,
            isSaved: isSaved,
            company : company,
            images : serviceImages
        }

        serviceIndustry.push( newItem );
    }

    return {
        serviceIndustry : serviceIndustry,
        };
}
