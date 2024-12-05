'use client';
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
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCreateWishlistProduct } from '@/utils/hooks/useCreateWishlistProduct';
import { useQueryClient } from '@tanstack/react-query';

interface ProductDetails {
  productId: string;
}

export const ProductDetailsPage: FC<ProductDetails> = ({ productId }) => {
  const queryClient = useQueryClient();
  console.log('query client cache - ', queryClient.getQueryCache().getAll());
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
    return mutate(wishlistPayload);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No products with {productId} found</div>;
  }

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
              <CardFooter className='flex gap-3'>
                <Button>
                  <h2>Add to Cart</h2>
                  <ShoppingCart />
                </Button>
                <Button onClick={onWishlistBtnClick}>
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
