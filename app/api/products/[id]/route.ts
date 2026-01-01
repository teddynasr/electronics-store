import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/app/products/[id]/product";

export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const segments = pathname.split("/");
  const id = segments[segments.length - 1];

  try {
    const product = await getProduct(id);
    return NextResponse.json(product);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 404 });
  }
}
