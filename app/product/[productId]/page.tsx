/*
  PDP - Product Details or Display Page
*/

import { ProductDetailsPage } from '@/app/product-details-page';
import { ProductItems } from '@/types/product.type';

// type Props = {
//   params: {
//     productId: Promise<string>;
//   };
// };

/* 
statically generate routes at build time
returns a list of 'params' to populate the [products] dynamic segment
*/
export async function generateStaticParams() {
  const data = await fetch('http://localhost:4000/api/v1/products').then(
    (res) => res.json()
  );

  return data.products.map((product: ProductItems) => ({
    productId: product._id,
  }));
}

/* 
multiple versions of this page will be statically generated using 'params' returned by 'generateStaticParams'
*/
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  return (
    <>
      <ProductDetailsPage productId={productId} />
    </>
  );
}
