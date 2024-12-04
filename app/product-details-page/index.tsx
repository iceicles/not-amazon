'use client';
import { useGetProductById } from '@/utils/hooks/useGetProductById';
import { FC } from 'react';

interface ProductDetails {
  productId: string;
}

export const ProductDetailsPage: FC<ProductDetails> = ({ productId }) => {
  const { data, isLoading } = useGetProductById(productId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No products with {productId} found</div>;
  }

  return (
    <>
      {data?.map((product) => (
        <div key={product._id}>
          <h2>Product Title: {product.title}</h2>
          <h3>Product Description: {product.description}</h3>
        </div>
      ))}
    </>
  );
};
