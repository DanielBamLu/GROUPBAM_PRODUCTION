export function multiply(
    object,
    quantity
    )
{
    let multiply = {};

    Object.keys( object ).forEach( key => {
        multiply[ key ] = ( object[ key ] * quantity ).toFixed( 2 );
    })

    return multiply;
}

export function sum(
    object1,
    object2
    )
{
    let sum = {};

    Object.keys( object1 ).forEach( key => {

        if ( object2.hasOwnProperty( key ) )
        {
            sum[ key ] = ( parseFloat( object1[ key ] ) + parseFloat( object2[ key ] ) ).toFixed( 2 );
        }
    })

    return sum;
}

export function subtract(
    object1,
    object2
    )
{
    let subtract = {};

    Object.keys( object1 ).forEach( key => {

        if ( object2.hasOwnProperty( key ) )
        {
            subtract[ key ] = ( parseFloat( object1[ key ] ) - parseFloat( object2[ key ] ) ).toFixed( 2 )
        }
    })

    return subtract;
}

export function createNewObject(
    object
    )
{
    let newObject = {};
    Object.keys( object ).forEach( key => {
        newObject[ key ] = object[ key ];
    })

    return newObject;
}
