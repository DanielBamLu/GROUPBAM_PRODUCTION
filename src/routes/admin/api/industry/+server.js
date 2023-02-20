import { json } from '@sveltejs/kit';
import { industryTable } from '$lib/database';
import { convertToSlug } from '$lib/admin';

export const PUT = async( {request} ) => {
    const res = await request.json();

    const id = await res.id;
    const name = await res.name;
    let slug = convertToSlug( name, 'map' );

    const industry = await industryTable.updateRow(
        {
            id: id,
            name : name,
            slug : slug,
        }
    );

    return json( industry );
}

export const POST = async( {request} ) => {
}

export const DELETE = async( {request} ) => {
}
