import { createWishlistProduct } from "@/Services/wishlist.service"
import { wishlistPayload } from "@/Types/wishlist.type"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useCreateWishlistProduct = () => {
  return useMutation({
    mutationFn: (payload: wishlistPayload) => createWishlistProduct(payload)
  })
}