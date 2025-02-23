import { createWishlistProduct, fetchWishlistProducts } from "@/Services/wishlist.service"
import { wishlistPayload } from "@/types/wishlist.type"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useGetWishlistProduct = (wishlistGuid: string) => {
  return useQuery({
    queryKey: ['wishlist', wishlistGuid],
    queryFn: () => fetchWishlistProducts(wishlistGuid)
  })
}