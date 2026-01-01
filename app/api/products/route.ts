import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/app/products/products";

export async function GET(req: NextRequest) {
  const pageIndex = Number(req.nextUrl.searchParams.get("pageIndex") || 1);
  const pageSize = Number(req.nextUrl.searchParams.get("pageSize") || 4);

  const pagedProducts = await getProducts(pageIndex, pageSize);
  return NextResponse.json(pagedProducts);
}
