export interface Listing {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  image: string;
  images?: string[];
}
