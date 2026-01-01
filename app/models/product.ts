import { ProductType } from "./productType"

export interface Product {
  id: string;
  name: string;
  price: number;
  product_type_id: number;
  product_type?: ProductType;
}