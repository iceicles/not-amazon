import { ProductItems } from "@/Types/product.type";
import { wishlistPayload } from "@/Types/wishlist.type";


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

  const data = await res.json() as wishlistPayload;
  // const { product } = data;
  console.log('data for wishlist - ', data)
  return data;
}

// export const fetchWishlistProducts = async () => {

//   const res = await fetch('http://localhost:4000/api/v1/products/wishlist')

//   const data = await res.json() as wishlistPayload

//   return data
// }