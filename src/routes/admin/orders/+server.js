import { orderTable } from '$lib/database';
import * as api from '$lib/api.js';

export async function POST( { request } ) {

  const body = await request.json();

  let orderData = await orderTable.selectRow(
    {
        where : [ [ 'id' ], '=', body.orderId ]
    }
  );

  let data = { orderData }

  return new Response( JSON.stringify( { data } ), { status: 200 } )
}

export async function PUT( { request } ) {

  const body = await request.json();

  let data;

  if ( body.type == 'cancel-order' )
  {
      const cancelOrder = await api.put(
        orderTable,
        {
            id: body.orderId,
            status: 'cancelled'
        }
      );

      data = { cancelOrder }
  }
  else if ( body.type == 'paid-order' )
  {
    const paidOrder = await api.put(
      orderTable,
      {
          id: body.orderId,
          status: 'process'
      }
    );

    data = { paidOrder }
  }

  return new Response( JSON.stringify( { data } ), { status: 200 } )
}
