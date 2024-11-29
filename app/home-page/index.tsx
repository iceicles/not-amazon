import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';

type Product = {
  id: string;
  name: string;
};

export const HomePage: FC<{}> = ({}) => {
  const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch('http://localhost:4000/api/v1/products');
    const data = await res.json();
    console.log(data);
    return data.products;
  };

  const query = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return (
      <div>
        Error:{' '}
        {query.error instanceof Error ? query.error.message : 'Unknown error'}
      </div>
    );
  }

  if (!query.data) {
    return <div>No products found</div>;
  }

  return (
    <>
      <div className='flex gap-10'>
        <h1>RainForest</h1>
        <Input className='w-[50vw]' />
      </div>
      <button className='p-4' onClick={() => query.refetch()}>
        Fetch products
      </button>
      <div>
        {query.data?.map((product: Product) => (
          <h1 key={product.id}>{product.name}</h1>
        ))}
      </div>
    </>
  );
};
