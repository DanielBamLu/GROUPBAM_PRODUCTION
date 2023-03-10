export function completeLanguageMap(
    uncompleteMap,
    languageMap
)
{
    languageMap.sort( ( a, b ) => {
        return a.number - b.number;
    } );

    let newLanguageMap = new Object;

    for ( const indexLanguage in languageMap )
    {
        if ( uncompleteMap[languageMap[ indexLanguage ].code] )
        {
            newLanguageMap[ languageMap[ indexLanguage ].code ] = uncompleteMap[ languageMap[ indexLanguage ].code]
        }
        else
        {
            newLanguageMap[ languageMap[ indexLanguage ].code ] = '';
        }
    }

    return newLanguageMap;
}

export function getLanguageMap(
    languageMap
)
{
    languageMap.sort( ( a, b ) => {
        return a.number - b.number;
    } );

    let newLanguageMap = new Object;

    for ( const indexLanguage in languageMap )
    {
        newLanguageMap[ languageMap[ indexLanguage ].code ] = '';
    }

    return newLanguageMap;
}

export function completeCurrencyMap(
    uncompleteMap,
    currencyMap
)
{
    currencyMap.sort( ( a, b ) => {
        return a.name - b.name;
    } );

    let newCurrencyMap = new Object;

    for ( const indexCurrency in currencyMap )
    {
        if ( uncompleteMap[ currencyMap[ indexCurrency ].code] )
        {
            newCurrencyMap[ currencyMap[ indexCurrency ].code ] = uncompleteMap[ currencyMap[ indexCurrency ].code ]
        }
        else
        {
            newCurrencyMap[ currencyMap[ indexCurrency ].code ] = '';
        }
    }

    return newCurrencyMap;
}

export function getCurrencyMap(
    currencyMap
)
{
    currencyMap.sort( ( a, b ) => {
        return a.name - b.name;
    } );

    let newCurrencyMap = new Object;

    for ( const indexCurrency in currencyMap )
    {
        newCurrencyMap[ currencyMap[ indexCurrency ].code ] = '';
    }

    return newCurrencyMap;
}

export function attachElementValuesToObject(
    elements,
    object
)
{
    for ( let elementsIndex = 0; elementsIndex < elements.length; elementsIndex++ )
    {
        let objectIndex = 0;

        for ( let value in object )
        {
            if ( objectIndex == elementsIndex )
            {
                object[ value ] = elements[ elementsIndex ].value;
            }

            objectIndex++;
        }
    }

    return object;
}

export function attachArrayToObject(
    elements,
    object
)
{
    for ( let elementsIndex = 0; elementsIndex < elements.length; elementsIndex++ )
    {
        let objectIndex = 0;

        for ( let value in object )
        {
            if ( objectIndex == elementsIndex )
            {
                object[ value ] = elements[ elementsIndex ];
            }

            objectIndex++;
        }
    }

    return object;
}

export function convertToSlug(
    Text,
    type
)
{
    if ( type == 'string' )
    {
        return Text.toLowerCase()
        .replace( / /g, '-' )
        .replace( /[^\w-]+/g, '' );
    }
    else if ( type == 'map' )
    {
        let text = Object.entries( Text )[ 0 ][ 1 ];
        return text.toLowerCase()
        .replace( / /g, '-' )
        .replace( /[^\w-]+/g, '' );
    }
}

export function sliceIntoChunks(
    array,
    chunkSize
)
{
    const res = [];

    for ( let indexArray = 0; indexArray < array.length; indexArray += chunkSize )
    {
        const chunk = array.slice( indexArray, indexArray + chunkSize );
        res.push( chunk );
    }

    return res;
}
