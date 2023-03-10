<script>
    import { loadScript } from '@paypal/paypal-js';
    import { paymentSuccessful } from '$lib/checkoutPaypal';

    export let refresh = () => {}
    export let isOrderPlaced;
    export let orderId;
    export let orderData;
    export let totalPrice;//price currently in usd because paypal sandbox just allow usd

    totalPrice = 0.01; //delete after -> value: totalPrice.dollar,

    const CLIENT_ID = 'AeyYJYP_lHUYMU77xegheZ0Et2pf25eKwSK2e4I98cS1CaVjChPzniXPezlk3hVssDn6Kghr3rae08_g';

    loadScript(
        {
            'client-id': CLIENT_ID
        }
    ).then( ( paypal ) => {
        paypal
        .Buttons(
            {
                style: {
                    color: 'gold',
                    shape: 'rect'
                },
                createOrder: function ( data, actions ) {
                    // Set up the transaction
                    return actions.order.create( {
                    purchase_units: [
                        {
                        amount: {
                            currency_code: 'USD',
                            value: totalPrice,
                        },
                        },
                    ],
                    } );
                },
                onApprove: function ( data, actions ) {
                    // Capture order after payment approved
                    return actions.order.capture().then( function ( details ) {

                        paymentSuccessful( details, isOrderPlaced, orderId, orderData );

                        if ( isOrderPlaced )
                        {
                            refresh();
                        }

                        if( orderId )
                        {
                            window.location.href = '/customer/orders/' + orderId;
                        }
                    } );
                },
                onError: function( err ) {
                    alert( 'Something went wrong' );
                },
            }
        )
        .render( '#paypal-button-container' );
    } );
</script>

<div id="paypal-button-container"/>

<style>
    #paypal-button-container {
        width: 100%;
    }
</style>
