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
import { useCreateWishlistProduct } from '@/utils/hooks/useCreateWishlistProduct';
import { useQueryClient } from '@tanstack/react-query';

interface ProductDetails {
  productId: string;
}

export const ProductDetailsPage: FC<ProductDetails> = ({ productId }) => {
  const [cartAmount, setCartAmount] = useState<number>(1);

  const { data, isLoading } = useGetProductById(productId);

  const wishlistPayload = {
    name: 'guest', // this should be either an auth or guest user (with uniqueID)
    productId: productId,
  };

  const { isSuccess, mutate } = useCreateWishlistProduct();

  if (isSuccess) {
    console.log('Wishlist product successfully created');
  }

  const onWishlistBtnClick = () => {
    // check if wishlist-guid (generated from backend) exists in local storage
    // then call wishlist api endpoint
    mutate(wishlistPayload);

    //TODO: create item in local storage for updating amount on the header
    // localStorage.setItem('wishlist', JSON.stringify({ amount: 0 }));
  };

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
                  <Heart />
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
