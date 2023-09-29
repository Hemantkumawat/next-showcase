import { prisma } from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type ProductSortBy = 'id' | 'name' | 'price';

interface ProductQueryParams {
  skip: number;
  take: number;
  include: {
    category: boolean;
  };
  where?: {
    categoryId: {
      in: number[];
    };
  };
  orderBy: {
    field: ProductSortBy;
    order: 'asc' | 'desc';
  };
}

export async function GET(request: NextRequest) {
  const page_str = request.nextUrl.searchParams.get("page");
  const limit_str = request.nextUrl.searchParams.get("limit");
  const categoryIdsStr = request.nextUrl.searchParams.get("categoryIds"); //comma saperated
  const sortBy = request.nextUrl.searchParams.get("sortBy") ?? 'id';
  const sortOrder = request.nextUrl.searchParams.get("sortOrder") ?? 'asc';

  const page = page_str ? parseInt(page_str, 10) : 1;
  const limit = limit_str ? parseInt(limit_str, 10) : 10;
  const skip = (page - 1) * limit;
  const term = request.nextUrl.searchParams.get("term") ?? ''; // Get the search term

  let queryParams = {
    skip,
    take: limit,
    include: { category: true },
    orderBy: {
      [sortBy]: sortOrder,
    }
  };
  if (categoryIdsStr) {
    queryParams.where = {
      categoryId: {
        in: categoryIdsStr.split(',').map(Number),
      },
    };
  }

  if (term) {
    queryParams.where = {
      AND: [
        queryParams.where || {}, // Preserve existing where conditions if any
        {
          OR: [
            {
              title: {
                contains: term, // Search by title
              },
            },
            {
              description: {
                contains: term, // Search by description
              },
            },
          ],
        },
      ],
    };
  }

  const products = await prisma.product.findMany(queryParams);

  let json_response = {
    status: "success",
    results: products.length,
    products,
  };
  return NextResponse.json(json_response);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const product = await prisma.product.create({
      data: json,
    });

    let json_response = {
      status: "success",
      data: { product },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      let error_response = {
        status: "fail",
        message: "Product with title already exists",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    let error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}