import { json } from '@sveltejs/kit';
import { serviceTable } from '$lib/database';
import { convertToSlug } from '$lib/admin';

export const PUT = async( {request} ) => {
    const res = await request.json();

    const id = await res.id;
    const title = await res.title;
    let slug = convertToSlug( title, 'string' );
    const description = await res.description;
    const imageData = await res.imageData;
    const unitTime = await res.unitTime;
    const unitPrice = await res.unitPrice;
    const companyId = await res.companyId;
    const categoryId = await res.categoryId;

    const service = await serviceTable.updateRow(
        {
            id: id,
            title : title,
            slug : slug,
            description : description,
            unitTime : unitTime,
            unitPrice : unitPrice,
            companyId : companyId,
            categoryId : categoryId
        }
    );

    return json( service );
}

export const POST = async( {request} ) => {
}

export const DELETE = async( {request} ) => {
}
