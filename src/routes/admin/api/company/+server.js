import { json } from '@sveltejs/kit';
import { companyTable } from '$lib/database';
import { convertToSlug } from '$lib/admin';

export const PUT = async( {request} ) => {
    const res = await request.json();

    const id = await res.id;
    const name = await res.name;
    let slug = convertToSlug( name, 'string' );
    const summary = await res.summary;
    const description = await res.description;
    const domain = await res.domain;
    const color = await res.color;

    const service = await companyTable.updateRow(
        {
            id: id,
            name : name,
            slug : slug,
            summary : summary,
            description : description,
            domain : domain,
            color : color
        }
    );

    return json( service );
}

export const POST = async( {request} ) => {
}

export const DELETE = async( {request} ) => {
}
