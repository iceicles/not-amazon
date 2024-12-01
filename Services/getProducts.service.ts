

import { Product, ProductItems } from "@/Types/product.type";

export const getProductsService = async (page: number): Promise<ProductItems[]> => {
  const res = await fetch(`http://localhost:4000/api/v1/products?page=${page}`);
  if (!res.ok) {
    throw new Error('Error fetching products...')
  }
  const data = await res.json() as Product;
  const { products } = data
  return products;
};