import { json } from '@sveltejs/kit';
import { serviceTable } from '$lib/database';
// import { writeFileSync } from 'fs';

export const PUT = async( {request} ) => {
    const res = await request.json();

    const id = await res.id;
    const imageData = await res.imageData;

    if ( imageData['dbTable'] == 'service-table' )
    {
        const upload = await serviceTable.updateRow(
            {
                id: id,
                imagePath : imageData['imageFileName'],
            }
        );
    }

    if ( imageData['image'] != null )
    {
        // writeFileSync('static' + imageData['imageFileName'], imageData['image'], 'base64');
    }

    return json();
}

export const POST = async( {request} ) => {
}

export const DELETE = async( {request} ) => {
}
