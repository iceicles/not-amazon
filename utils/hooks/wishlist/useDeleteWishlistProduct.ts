import { deleteWishlistProduct } from "@/services/wishlist.service"
import { wishlistPayload } from "@/types/wishlist.type"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useDeleteWishlistProduct = () => {
  return useMutation({
    mutationFn: (productId: string) => deleteWishlistProduct(productId)
  })
}