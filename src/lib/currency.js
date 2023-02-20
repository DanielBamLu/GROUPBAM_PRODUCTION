// -- VARIABLES

export let currencyCode = 'euro';
export let defaultCurrencyCode = 'euro';

// -- FUNCTIONS

export function setCurrencyCode(
    currencyCode_
    )
{
    currencyCode = currencyCode_;
}

// ~~

export function getCurrencyCode(
    )
{
    return currencyCode;
}

// ~~

export function getCurrencySymbol(
    )
{
    let symbol;

    if ( currencyCode == 'euro' )
    {
        symbol = '€';
    }
    else if ( currencyCode == 'dollar' )
    {
        symbol = '$';
    }

    return symbol;
}

// ~~

export function setDefaultCurrencyCode(
    defaultCurrencyCode_
    )
{
    defaultCurrencyCode = defaultCurrencyCode_;
}

// ~~

export function getDefaultCurrencyCode(
    )
{
    return defaultCurrencyCode;
}

export function getPriceCurrency(
    priceByCurrencyCodeMap,
    currencyCode_
    )
{
    if ( currencyCode_ !== undefined
         && priceByCurrencyCodeMap.hasOwnProperty( currencyCode_ ) )
    {
        return priceByCurrencyCodeMap[ currencyCode_ ];
    }
    else if ( priceByCurrencyCodeMap.hasOwnProperty( currencyCode ) )
    {
        return priceByCurrencyCodeMap[ currencyCode ];
    }
    else if ( priceByCurrencyCodeMap.hasOwnProperty( defaultCurrencyCode ) )
    {
        return priceByCurrencyCodeMap[ defaultCurrencyCode ];
    }
    else
    {
        console.warn( 'Missing language code ' + currencyCode_ + ' : ' + JSON.stringify( priceByCurrencyCodeMap ) );

        return '';
    }
}
