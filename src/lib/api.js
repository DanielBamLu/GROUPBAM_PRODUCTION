async function send( { method, table, data } ) {

    if ( method == 'POST' )
    {
        const res = await table.insertRow(
            data
            );

        return res ? JSON.parse( JSON.stringify( res ) ) : {};
    }
    else if ( method == 'PUT' )
    {
        const res = await table.updateRow(
            data
            );

        return res ? JSON.parse( JSON.stringify( res ) ) : {};
    }
    else if ( method == 'DELETE' )
    {
        const res = await table.deleteRow(
            data
            );

        return res ? JSON.parse( JSON.stringify( res ) ) : {};
    }
    else if ( method == 'GET' )
    {
        const res = await table.selectRow(
            data
            );

        return res ? JSON.parse( JSON.stringify( res ) ) : {};
    }
}

async function sendUser( { method, table, data } ) {

    if ( method == 'GET' )
    {
        let emailResponse = await table.selectRow(
            {
                where : [ [ 'email' ], '=', data.email ]
            }
        );

        if ( emailResponse != null )
        {
            let passwordResponse = await table.selectRow(
                {
                    where : [ [ 'password' ], '=', data.password ]
                }
            );

            if ( passwordResponse != null )
            {
                const response = await passwordResponse;
                return response ? JSON.parse( JSON.stringify( response ) ) : {};
            }
        }
    }
}

async function sendUserGoogle( { method, table, data } ) {

    if ( method == 'GET' )
    {
        let emailResponse = await table.selectRow(
            {
                where : [ [ 'email' ], '=', data.email ]
            }
        );

        if ( emailResponse != null )
        {
            const response = await emailResponse;
            return response ? JSON.parse( JSON.stringify( response ) ) : {};
        }
    }
}

export function get( path, table, data ) {

    if ( path == 'users/login' )
    {
        return sendUser( { method: 'GET', table, data } );
    }
    else if ( path == 'users/login/google' )
    {
        return sendUserGoogle( { method: 'GET', table, data } );
    }
    else
    {
        return send( { method: 'GET', table, data } );
    }
    }

export function del( table, data ) {

    return send( { method: 'DELETE', table, data } );
    }

export function post( table, data ) {

    return send( { method: 'POST', table, data } );
    }

export function put( table, data ) {

    return send( { method: 'PUT', table, data } );
    }
