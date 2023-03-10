export function sortStrings( a, b, sort ) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    if ( sort == 'alfabeticAsc' )
    {
        return ( a < b ) ? -1 : ( a > b ) ? 1 : 0;
    }
    else if ( sort == 'alfabeticDesc' )
    {
        return ( a > b ) ? -1 : ( a < b ) ? 1 : 0;
    }
}

export function sortNumbers( a, b, sort ) {

    if ( sort == 'priceAsc' )
    {
        return a[ localStorage.getItem( 'currency' ) ] - b[ localStorage.getItem( 'currency' ) ];
    }
    else if ( sort == 'priceDesc' )
    {
        return b[ localStorage.getItem( 'currency' ) ] - a[ localStorage.getItem( 'currency' ) ];
    }
}
