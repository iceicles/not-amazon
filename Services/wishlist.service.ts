import { ProductItems } from '@/types/product.type';
import { wishlistPayload } from '@/types/wishlist.type';

export const createWishlistProduct = async (payload: wishlistPayload) => {
  try {
    const res = await fetch(`http://localhost:4000/api/v1/products/wishlist`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload,
      }),
    });
    if (!res.ok) {
      throw new Error(`Error creating wishlist`);
    }
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.log(err.message);
  }
};

export const deleteWishlistProduct = async (productId: string) => {
  try {
    const res = await fetch(
      `http://localhost:4000/api/v1/products/wishlist/${productId}`,
      {
        method: 'DELETE',
      }
    );
    if (!res.ok) {
      throw new Error(`Error deleting wishlist`);
    }
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.log(err.message)
  }
};

export const fetchWishlistProducts = async (wishlistGuid: string) => {
  try {
    const queryParams = new URLSearchParams({ wishlistGuid });
    const res = await fetch(
      `http://localhost:4000/api/v1/products/wishlist?${queryParams}`
    );
    if (!res.ok) {
      throw new Error(`Error fetching wishlist`);
    }
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.log(err.message)
  }
};
