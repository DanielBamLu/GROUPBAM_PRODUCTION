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

  const cancelOrder = await api.put(
    orderTable,
    {
        id: body.orderId,
        status: 'cancelled'
    }
  );

  let data = { cancelOrder }

  return new Response( JSON.stringify( { data } ), { status: 200 } )
}
