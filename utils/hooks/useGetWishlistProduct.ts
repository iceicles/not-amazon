import { createWishlistProduct } from "@/Services/wishlist.service"
import { wishlistPayload } from "@/Types/wishlist.type"
import { useMutation, useQuery } from "@tanstack/react-query"


// export const useGetWishlistProduct = () => {
//   return useQuery({
//     queryKey: ['wishlist'],
//     queryFn: getWishlist
//   })
// }