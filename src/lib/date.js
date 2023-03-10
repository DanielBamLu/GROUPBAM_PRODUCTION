export function getDateTime(
    dateTime
)
{
    let date = new Date();

    if ( dateTime )
    {
        date = new Date( dateTime );
    }

    return date;
}

export function getFormatedDateTime(
    dateTime
)
{
    let date = new Date();

    if ( dateTime )
    {
        date = new Date( dateTime );
    }

    var pad = function( num ) { return ( '00'+ num ).slice( -2 ) };

    date = date.getUTCFullYear()         + '-' +
            pad(date.getUTCMonth() + 1)  + '-' +
            pad(date.getUTCDate())       + ' ' +
            pad(date.getUTCHours())      + ':' +
            pad(date.getUTCMinutes())    + ':' +
            pad(date.getUTCSeconds());

    return date;
}

export function getViewDate(
    dateTime
)
{
    const date = new Date( dateTime );
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString( 'en-US', options );
    const formattedDateWithComma = formattedDate.replace( /(\d+)(\s)(\w+)(\s)(\d+)/, "$1$2$3,$4$5" );
    
    return formattedDateWithComma;
}
