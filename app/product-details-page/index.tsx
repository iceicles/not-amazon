'use client';
import React, { useState, useEffect } from 'react';
import { useGetProductById } from '@/utils/hooks/useGetProductById';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { FC } from 'react';
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCreateWishlistProduct } from '@/utils/hooks/wishlist/useCreateWishlistProduct';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteWishlistProduct } from '@/utils/hooks/wishlist/useDeleteWishlistProduct';
import { useGetWishlistProduct } from '@/utils/hooks/wishlist/useGetWishlistProduct';

interface ProductDetails {
  productId: string;
}

export const ProductDetailsPage: FC<ProductDetails> = ({ productId }) => {
  const [cartAmount, setCartAmount] = useState<number>(1);
  const [wishlistItem, setWishlistItem] = useState<boolean>(false);
  const [products, setProducts] = useState([]);

  let wishlistGuid = '';
  let wishlistCache = '';
  if (typeof window !== 'undefined') {
    wishlistGuid = localStorage.getItem('wishlist-guid') as string;
    wishlistCache = localStorage.getItem('wishlist-cache') as string;
  }
  // useEffect(() => {
  // }, [wishlistCache, wishlistGuid, localStorage]);

  const { data, isLoading } = useGetProductById(productId);

  const wishlistPayload = {
    wishlistGuid, // this should be either an auth or guest user (with uniqueID)
    productId: productId,
  };

  const {
    isSuccess: createMutateSuccess,
    mutate: createMutate,
    data: createMutateData,
  } = useCreateWishlistProduct();
  const { mutate: deleteMutate } = useDeleteWishlistProduct();

  const onWishlistBtnClick = () => {
    // check if wishlist-guid (generated from backend) exists in local storage
    // then call wishlist api endpoint

    // console.log('wishlistbtn data - ', createMutateData);

    // if (!wishlistItem) {
    createMutate(wishlistPayload); // add product to wishlist
    // } else {
    // deleteMutate(wishlistPayload.productId);

    //TODO: create item in local storage for updating amount on the header
    // localStorage.setItem('wishlist', JSON.stringify({ amount: 0 }));
  };

  useEffect(() => {
    const wishlistItems = [
      {
        code: productId,
      },
    ];
    if (createMutateSuccess) {
      // console.log('wishlistData - ', wishlistData);
      localStorage.setItem(
        'wishlist-cache',
        JSON.stringify({ products: wishlistItems })
      );
      localStorage.setItem('wishlist-guid', createMutateData.wishlistGuid);
      // setWishlistItem(localStorage.getItem('wishlist-guid'));
      wishlistGuid = localStorage.getItem('wishlist-guid') as string;
      wishlistCache = localStorage.getItem('wishlist-cache') as string;
      setWishlistItem(true);
      const wishlistCacheObj = JSON.parse(wishlistCache);
      const { products } = wishlistCacheObj;
      console.log('products - ', products);
      setProducts(products);
    }
  }, [createMutateSuccess, createMutateData]);

  // if there is no wishlist cache OR if there is no product code matching the current viewed product --
  // make a call with the wishlist guid in local storage, then get the product associated with the guid if it exists
  // on success, we'll replace and or create wishlist-cache again (or not) in local storage
  // then read from local storage and make the heart red or not

  /* console.log('boolean1 - ', Boolean(wishlistCacheObj));
  console.log(
    'boolean2 - ',
    Boolean(products.find((code: string) => code === productId))
  );
  if (
    Boolean(wishlistCacheObj) ||
    Boolean(products.find((code: string) => code === productId))
  ) {
    console.log('here????');
    const { isSuccess: getWishlistSuccess, data: getWishlistData } =
      useGetWishlistProduct(wishlistGuid);
    if (getWishlistSuccess) {
      console.log('data - ', getWishlistData);
    }
  } */

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No products with {productId} found</div>;
  }

  const onPlusClick = () => {
    setCartAmount((prev) => prev + 1);
  };

  const onMinusClick = () => {
    if (cartAmount > 1) {
      setCartAmount((prev) => prev - 1);
    }
  };

  return (
    <>
      {data?.map((product) => (
        <div
          key={product._id}
          className='flex items-center justify-center min-h-screen'
        >
          <Card className='flex w-fit p-8'>
            <div className='self-center'>
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={200}
              />
            </div>

            <div className='flex flex-col max-w-[500px] justify-between'>
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col'>
                <span>{product.description}</span>
                <span>${product.price}</span>
              </CardContent>
              <CardFooter className='flex flex-col items-start gap-3'>
                <div>
                  <div className='flex mb-4 gap-5'>
                    <button onClick={onMinusClick}>
                      <Minus size={28} strokeWidth={3} />
                    </button>
                    <span className='text-2xl'>{cartAmount}</span>
                    <button onClick={onPlusClick}>
                      <Plus size={28} strokeWidth={3} />
                    </button>
                  </div>
                  <Button>
                    Add to Cart
                    <ShoppingCart />
                  </Button>
                </div>
                <Button onClick={onWishlistBtnClick}>
                  Add to Wishlist
                  <Heart fill={wishlistItem ? 'red' : 'none'} />
                </Button>
              </CardFooter>
            </div>
          </Card>
        </div>
      ))}
    </>
  );
};

// className='border-none shadow-none border-slate-[0] w-[350px] h-fit'
