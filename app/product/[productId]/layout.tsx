import { ReactNode } from 'react';

export default function ProductDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <h2>Product Details Layout</h2>
      {children}
    </>
  );
}
