import { getProductsService } from "@/Services/getProducts.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (page: number) => {
  return useQuery({
    queryKey: ['products', page],
    queryFn: () => getProductsService(page),
  });
};