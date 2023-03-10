import { userTable, orderTable, orderServiceTable, orderServicePackTable, orderServiceOptionVariantTable } from '$lib/database';
import { getRandomTuid, getUuidFromTuid, getMillisecondTimestamp } from 'senselogic-gist';
import { getFormatedDateTime } from '$lib/date';
import { writeFileSync } from 'fs';
import * as api from '$lib/api.js';

export async function POST( { request, locals } ) {

  const body = await request.json();

  if ( body.isOrderPlaced == 'false' )
  {
    let orderId = getRandomTuid();

    let user = await userTable.selectRow(
      {
          where : [ [ 'id' ], '=', locals.user.id ]
      }
    );

    let userCartInfo = JSON.parse( atob( user.cartInfo ) );

    const deleteCartInfoUser = await api.put(
      userTable,
      {
        id: locals.user.id ,
        cartInfo: ''
      }
    );

    const addOrder = await api.post(
      orderTable,
      {
        id: orderId,
        referenceNumber: getUuidFromTuid( orderId ),
        totalPrice: userCartInfo.info.totalPriceCart,
        productionTime: userCartInfo.info.productionTime,
        description: body.orderData.description,
        contactFirstName: body.orderData.contactFirstName,
        contactLastName: body.orderData.contactLastName,
        contactEmail: body.orderData.contactEmail,
        billingFirstName: body.details.payer.given_name,
        billingLastName: body.details.payer.surname,
        billingFirstAddressLine: body.details.purchase_units[ 0 ].shipping.address.address_line_1,
        billingSecondAddressLine: body.details.purchase_units[ 0 ].shipping.address.address_line_2,
        billingCity: body.details.purchase_units[ 0 ].shipping.address.admin_area_1,
        billingCityCode: body.details.purchase_units[ 0 ].shipping.address.postal_code,
        billingProvince: body.details.purchase_units[ 0 ].shipping.address.admin_area_2,
        billingCountrySlug: body.details.purchase_units[ 0 ].shipping.address.country_code,
        status: 'process',
        orderDateTime: getFormatedDateTime(),
        deliveryDateTime: '',
        userId: locals.user.id,
        urgency: userCartInfo.info.urgency,
      }
    );
 
    const timeStamp = getMillisecondTimestamp();    
    let documentArray = [];
    if ( body.orderData.filesArray.length > 0 )
    {
        for ( let indexDocumentFile= 0; indexDocumentFile< body.orderData.filesArray.length ;indexDocumentFile++ )
        {
            let documentFileName = body.orderData.filesArray[ indexDocumentFile ].name;
            let documentFileExtension = body.orderData.filesArray[ indexDocumentFile ].extension;
            let documentFileData = body.orderData.filesArray[ indexDocumentFile ].dataFile;

            let galleryImagePath;

            if ( documentFileData )
            {
                galleryImagePath = '/document/orders/' + documentFileName + '-' + timeStamp + '.' + documentFileExtension;

                documentArray.push( galleryImagePath )

                writeFileSync( 'static' + galleryImagePath, documentFileData, 'base64' );
            }
        }

        if ( documentArray.length > 0 )
        {
            const editDocumentArray = await api.put(
                orderTable,
                {
                    id: orderId,
                    documentArray: documentArray,
                }
            );
        }
    }

    for ( const indexCartService in userCartInfo.services )
    {
      let orderServiceId = getRandomTuid();

      const addOrderService = await api.post(
        orderServiceTable,
        {
          id: orderServiceId,
          orderId: orderId,
          serviceId: userCartInfo.services[ indexCartService ].serviceId,
          quantity: userCartInfo.services[ indexCartService ].quantity,
          status: 'pending'
        }
      );

      if ( userCartInfo.services[ indexCartService ].options )
      {
        for ( const element of userCartInfo.services[ indexCartService ].options ) {

          const addOrderServiceOptionVariant = await api.post(
            orderServiceOptionVariantTable,
            {
                orderServiceId: orderServiceId,
                value: element.value
            }
          );
        }
      }
    }

    return new Response( JSON.stringify( { message: 'Order added', orderId: orderId } ), { status: 200 } )
  }
  else
  {
    const putOrder = await api.put(
      orderTable,
      {
        id: body.orderId,
        status: 'process',
      }
    );

    return new Response( JSON.stringify( { message: 'Order updated', orderId: body.orderId } ), { status: 200 } )
  }
}
