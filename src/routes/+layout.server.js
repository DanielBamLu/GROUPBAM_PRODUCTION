// -- IMPORTS
import { serviceTable, industryTable, companyTable, categoryTable, serviceImageTable, textTable, languageTable, currencyTable, userTable, userSaveServiceTable, orderTable } from '$lib/database';

// -- FUNCTIONS
/** @type {import('./$types').LayoutServerLoad} */
export async function load( { locals } )
{
    let industryArray = await industryTable.selectRows();
    let companyArray = await companyTable.selectRows();
    let categoryArray = await categoryTable.selectRows();
    let textArray = await textTable.selectRows();
    let languageArray = await languageTable.selectRows();
    let currencyArray = await currencyTable.selectRows();

    let serviceSaved = [];
    let savedArray;
    let orders;

    if ( locals.user )
    {
        savedArray = await userSaveServiceTable.selectRows(
            {
                where : [ [ 'userId' ], '=', locals.user.id ]
            }
            );

        for ( let item of savedArray )
        {
            let service = await serviceTable.selectRow(
                {
                    where : [ [ 'id' ], '=', item.serviceId ]
                }
                );

            let category = await categoryTable.selectRow(
                {
                    where : [ [ 'id' ], '=', service.categoryId ]
                }
                );

            let newItem = {
                info : service,
                category : category
            }

            serviceSaved.push( newItem );
        }

        orders = await orderTable.selectRows(
            {
                where : [ [ 'userId' ], '=', locals.user.id ]
            }
            );
    }

    let user;
    let userCart;

    if ( locals.user )
    {
        user = await userTable.selectRow(
            {
                where : [ [ 'id' ], '=', locals.user.id ]
            }
            );

        userCart = user.cartInfo;
    }

    let serviceRecentlyViewd = [];
    let serviceRecentlyViewdIds = [ '-aT1x7qYiFqoM5xeU918-A', '-ffWfCw1840ieTwjx5H8tg', '1pXgzVszh8VuLN2MjrrkMQ' ];

    for ( let item of serviceRecentlyViewdIds )
    {
        let service = await serviceTable.selectRow(
            {
                where : [ [ 'id' ], '=', item ]
            }
            );

        let company = await companyTable.selectRow(
            {
                where : [ [ 'id' ], '=', service.companyId ]
            }
            );

        let serviceImages = await serviceImageTable.selectRows(
            {
                where : [ [ 'serviceId' ], '=', service.id ]
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

        let newItem = {
            info : service,
            isSaved: isSaved,
            company : company,
            images : serviceImages
        }

        serviceRecentlyViewd.push( newItem );
    }

    return {
        industryArray : industryArray,
        companyArray : companyArray,
        categoryArray : categoryArray,
        textArray : textArray,
        languageArray : languageArray,
        currencyArray : currencyArray,
        serviceSaved : serviceSaved,
        serviceRecentlyViewd : serviceRecentlyViewd,
        userCart : userCart,
        orders : orders,
        user: locals.user && {
            id: locals.user.id,
            fullName: locals.user.fullName,
            pseudonym: locals.user.pseudonym,
            email: locals.user.email,
            role: locals.user.role
        }
        };
}
