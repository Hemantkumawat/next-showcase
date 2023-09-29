/* eslint-disable import/no-anonymous-default-export */
// pages/api/products.ts
import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";



export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const product = await prisma.product.findUnique({ where: { id } ,include:{category:true}});

    if (!product) {
        let error_response = {
            status: "fail",
            message: "No product with the Provided ID Found",
        };
        return new NextResponse(JSON.stringify(error_response), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    let json_response = {
        status: "success",
        data: {
            product,
        },
    };
    return NextResponse.json(json_response);
}

