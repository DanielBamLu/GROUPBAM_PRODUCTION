import { serviceTable, orderServiceTable, orderServiceOptionVariantTable } from '$lib/database';

export async function POST( { request, locals } ) {

  const body = await request.json();

  let serviceData = await serviceTable.selectRow(
    {
        where : [ [ 'id' ], '=', body.serviceId ]
    }
  );

  let orderServiceData = await orderServiceTable.selectRows(
    {
        where : [ [ 'orderId' ], '=', body.orderId ]
    }
  );

  let optionsVariantData;
  for ( let item of orderServiceData )
  {
    let serviceOptionVariant = await orderServiceOptionVariantTable.selectRows(
      {
          where : [ [ 'orderServiceId' ], '=', item.id ]
      }
      );
      optionsVariantData = serviceOptionVariant;
  }

  return new Response( JSON.stringify( { serviceData, optionsVariantData } ), { status: 200 } )
}
