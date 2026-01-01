import { supabase } from "@/lib/supabase/client";
import { Product } from "../models/product";
import { sleep } from "../common";
import { PagedResult } from "../models/pagedResult";

export async function getProducts(pageIndex: number, pageSize:number): Promise<PagedResult<Product>> {
  const offset = (pageIndex - 1) * pageSize;

  const { data, error, count } = await supabase
    .from<any, PagedResult<Product>>("products")
    .select(`
      id,
      name,
      price,
      product_type_id,
      product_type:product_types(id, name)`,
      { count: "exact" })
    .range(offset, offset + pageSize - 1);

  if(error){
      console.error("Error fetching products: ", error.message);
      return {items: [], total: 0};
  }

  console.log(count);

  return {
    items: data ?? [],
    total: count ?? 0
  };
}
