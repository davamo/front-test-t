export interface Product {
  id: number;
  images: string[];
  price: number;
  title: string;
  description: string;
  category: {
    id: number;
    name: string;
    typeImg: string;
  };
}