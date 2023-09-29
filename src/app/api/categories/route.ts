import { prisma } from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const page_str = request.nextUrl.searchParams.get("page");
  const limit_str = request.nextUrl.searchParams.get("limit");

  const page = page_str ? parseInt(page_str, 10) : 1;
  const limit = limit_str ? parseInt(limit_str, 10) : 10;
  const skip = (page - 1) * limit;

  const categories = await prisma.category.findMany({
    skip,
    take: limit,
  });

  let json_response = {
    status: "success",
    results: categories.length,
    categories,
  };
  return NextResponse.json(json_response);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const category = await prisma.category.create({
      data: json,
    });

    let json_response = {
      status: "success",
      data: { category },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      let error_response = {
        status: "fail",
        message: "category with title already exists",
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