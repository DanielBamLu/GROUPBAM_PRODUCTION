// -- IMPORTS

import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// -- FUNCTIONS

let cartArray = {
    services: [],
    info: {}
};

export const cart = writable( cartArray );

export function StoreCart(
    cart,
    user
    )
{
    if ( user )
    {
        if ( browser )
        {
            async function addToCart() {
                await fetch( '/customer/cart', {
                    method: 'PUT',
                    body: JSON.stringify(
                        {
                            userId : user.id,
                            cart : btoa( JSON.stringify( cart ) )
                        }
                    )
                } );
            }

            addToCart();
        }
    }
    else
    {
        const localCart = btoa( JSON.stringify( cart ) );
        localStorage.setItem( 'cart', localCart );
    }
}
