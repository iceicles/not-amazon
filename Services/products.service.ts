import { Product, ProductItems } from "@/types/product.type";

export const fetchAllProducts = async (page: number): Promise<ProductItems[]> => {
  try {
    const res = await fetch(`http://localhost:4000/api/v1/products?page=${page}`);
    if (!res.ok) {
      throw new Error('Error fetching products...')
    }
    const data = await res.json() as Product;
    const { products } = data
    return products;
  } catch (err: any) {
    console.log(err.message)
    return []
  }
};

export const fetchProductById = async(id: string) => {
  try {
    const res = await fetch(`http://localhost:4000/api/v1/products/${id}`)
    if (!res.ok) {
      throw new Error(`Error fetching product with id: ${id}`)
    }
    const data = await res.json() as Product;
    const { product } = data;
    return product;
  } catch (err: any) {
    console.log(err.message)
    return []
  }
}