import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import { Categories } from './constant';
import { ProductItems } from '@/Types/product.type';
import { useGetProducts } from '@/utils/hooks/useGetProducts';

export const HomePage: FC<{}> = ({}) => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, refetch } = useGetProducts(page);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No products found</div>;
  }

  return (
    <>
      <div className='flex gap-10'>
        <h1>RainForest</h1>
        <Input className='w-[50vw]' />
      </div>
      <button className='p-4' onClick={() => refetch()}>
        Fetch products
      </button>
      <div>
        <div className='my-0 mx-auto grid grid-cols-[200px_1fr] justify-items-center gap-y-12 gap-x-6'>
          <section>
            <h2>Category</h2>
            <div className='flex flex-col w-fit'>
              {Categories.map((category) => (
                <Button key={category.id} variant='ghost'>
                  {category.name}
                </Button>
              ))}
            </div>
          </section>
          <div className='w-[70%] grid grid-cols-3 gap-x-4'>
            {data?.map((product: ProductItems) => (
              <Card
                key={product._id}
                className='border-none shadow-none border-slate-[0] w-[350px] h-fit'
              >
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription className='line-clamp-3'>
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span>${product.price}</span>
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={175}
                  />
                </CardContent>
                <CardFooter className='flex gap-3'>
                  <Button>
                    <ShoppingCart />
                  </Button>
                  <Button>
                    <Heart />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Button onClick={() => setPage((prev) => prev + 1)}>Next Page</Button>
        <Button onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}>
          Previous Page
        </Button>
      </div>
    </>
  );
};

// border border-slate-200 shadow-sm

{
  /* <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
            />
            <h1>{product.title}</h1>
            <h2>{product.price}</h2> */
}
