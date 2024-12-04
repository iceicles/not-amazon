
export type ProductItems = {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

export type Product = {

  products: ProductItems[];
  product: ProductItems[];
};