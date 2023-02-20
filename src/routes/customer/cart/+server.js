import { userTable } from '$lib/database';
import * as api from '$lib/api.js';

export async function PUT( { request } ) {

  const body = await request.json();

  const putUserCart = await api.put(
    userTable,
      {
          id: body.userId,
          cartInfo : body.cart
      }
  );

  return new Response( JSON.stringify( { message: "Cart updated" } ), { status: 200 } )
}
