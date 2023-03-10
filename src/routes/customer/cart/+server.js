import { userTable, orderServiceTable } from '$lib/database';
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

// export async function POST( { request } ) {

//   const body = await request.json();

//   let orderService = await orderServiceTable.selectRow(
//     {
//         where : [ [ 'id' ], '=', body.orderServiceId ]
//     }
//     );

//   const increaseQuantity = await api.put(
//     orderServiceTable,
//       {
//           id: body.orderServiceId,
//           quantity: orderService.quantity + 1
//       }
//   );

//   return new Response( JSON.stringify( { message: 'Quantity increase' } ), { status: 200 } )
// }
