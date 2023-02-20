import { browser } from '$app/environment';

export const language = ( browser && localStorage.getItem( 'language' ) ) || 'en';
export const currency = ( browser && localStorage.getItem( 'currency' ) ) || 'euro';
export const localCart = ( browser && localStorage.getItem( 'cart' ) ) || '';
