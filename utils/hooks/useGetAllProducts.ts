import { fetchAllProducts } from "@/services/products.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (page: number) => {
  return useQuery({
    queryKey: ['products', page],
    queryFn: () => fetchAllProducts(page),
  });
};