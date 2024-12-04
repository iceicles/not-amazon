import { fetchProductById } from "@/Services/products.service"
import { useQuery } from "@tanstack/react-query"

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ['productId', id],
    queryFn: () => fetchProductById(id)
  })
}