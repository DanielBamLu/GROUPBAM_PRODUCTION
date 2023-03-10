// -- IMPORTS
import { getFormatedDateTime } from '$lib/date';
import { getTranslatedTextByCode } from 'senselogic-gist';
import { userTable, orderTable, orderServiceTable, orderServicePackTable, orderServiceOptionVariantTable, beneficiaryTable } from '$lib/database';
import * as api from '$lib/api.js';

// -- FUNCTIONS

/** @type {import('./[orderId]/$types').PageServerLoad} */
export async function load(
    { params }
    )
{
    let order = await orderTable.selectRow(
        {
            where : [ [ 'id' ], '=', params.orderId ]
        }
        );

    let orderServices = await orderServiceTable.selectRows(
        {
            where : [ [ 'orderId' ], '=', order.id ]
        }
        );

    let beneficiary = await beneficiaryTable.selectRow(
        {
            where : [ [ 'slug' ], '=', 'group-bam-sarls' ]
        }
        );

    return {
        order : order,
        orderServices : orderServices,
        beneficiary : beneficiary
        };
}

/** @type {import('./$types').Actions} */
export const actions = {
    editDeliveryDate: async ( { params, request } ) => {

        const data = await request.formData();

        let deleveryDate = data.get( 'delivery-date' );

        if ( deleveryDate )
        {
            let date = getFormatedDateTime( deleveryDate );

            const putDeliveryDate = await api.put(
                orderTable,
                {
                    id: params.orderId,
                    deliveryDateTime: date
                }
            );
        }

        if ( data )
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

};
