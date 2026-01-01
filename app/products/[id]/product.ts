import { Product } from "@/app/models/product";
import { supabase } from "@/lib/supabase/client";

export async function getProduct(id: string): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .select(`
        id,
        name,
        price,
        product_type_id,
        product_type:product_types(id, name)`)
    .eq("id", id)
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Product not found");
  }

  console.log(data);

  return data as unknown as Product;
}
