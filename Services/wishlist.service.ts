import { ProductItems } from "@/types/product.type";
import { wishlistPayload } from "@/types/wishlist.type";


export const createWishlistProduct = async(payload: wishlistPayload) => {
  const res = await fetch(`http://localhost:4000/api/v1/products/wishlist`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      payload
    })
  })
  if (!res.ok) {
    throw new Error(`Error creating wishlist with body payload - ${payload}`)
  }

  const data = await res.json();
  // const { product } = data;
  console.log('data for wishlist - ', data)
  return data;
}

export const deleteWishlistProduct = async(productId: string) => {
  const res = await fetch(`http://localhost:4000/api/v1/products/wishlist/${productId}`, {
    method: 'DELETE',
  })

  const data = await res.json()
  return data;
}

export const fetchWishlistProducts = async (wishlistGuid: string) => {
  const queryParams = new URLSearchParams({wishlistGuid})
  const res = await fetch(`http://localhost:4000/api/v1/products/wishlist?${queryParams}`)

  const data = await res.json()
  return data
}