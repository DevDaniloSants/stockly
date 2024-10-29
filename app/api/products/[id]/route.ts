import { db } from '@/app/_lib/prisma'

export async function GET(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params
    const productId = params.id
    const product = await db.product.findUnique({
        where: {
            id: productId,
        },
    })

    if (!product) {
        return Response.json({ message: 'Product not found' }, { status: 404 })
    }

    return Response.json(product, { status: 200 })
}

export async function DELETE(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params
    const productId = params.id
    const product = await db.product.delete({
        where: {
            id: productId,
        },
    })

    return Response.json(product, { status: 200 })
}
