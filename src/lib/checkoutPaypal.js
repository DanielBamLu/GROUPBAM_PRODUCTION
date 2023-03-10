import { goto } from '$app/navigation';
export function paymentSuccessful( details, isOrderPlaced, orderId, orderData )
    {
        async function postOrder() {
            const res = await fetch( '/checkout', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        details: details,
                        isOrderPlaced: isOrderPlaced,
                        orderId: orderId,
                        orderData: orderData
                    }
                )
            } );

            const item = await res.json();

            if ( item.message == 'Order added' )
            {
                localStorage.setItem( 'cart', '' );
                goto( '/customer/orders/' + item.orderId )
            }
        }

        postOrder();
    }
