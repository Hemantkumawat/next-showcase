/* eslint-disable import/no-anonymous-default-export */
// pages/api/products.ts
import { prisma } from "../../../../lib/prisma";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";



export async function GET(
    request: Request,
    { params }: { params: { id: number } }
) {
    const id = params.id;
    const product = await prisma.product.findUnique({ where: { id } });

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

