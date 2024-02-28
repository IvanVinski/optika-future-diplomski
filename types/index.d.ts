export {};

declare global {
  type About = {
    title: string;
    content: string;
    image: string;
  };

  type Branch = {
    id: string;
    name: string;
    coordinates: { lat: number; lng: number };
    address: string;
    phone: string;
    email: string;
    working_hours: string;
  };

  type Cart = {
    items: Product[];
    itemsInCart: number;
    totalPrice: number;
  };

  type ProductType = {
    id: string;
    name: string;
    brand: string;
    model: string;
    description: string;
    price: number;
    discount: number;
    finalPrice: string;
    itemsInStock: number;
    images: string[];
    category: { value: string; label: string };
    featured: boolean;
    tags: { value: string; label: string }[];
    sex: { value: string; label: string };
  };

  interface ProductCart extends ProductType {
    quantity: number;
    sumPrice: number;
  }

  type User = {
    uid: string;
    email: string;
    photoURL?: string;
    name: string;
    phoneNumber?: string;
    role?: string;
    addresses: any[];
    orders: any[];
  };

  type Blog = {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    image: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    tags: string;
    featured: boolean;
    published: boolean;
  };

  type Order = {
    address: Address;
    date: Timestamp;
    id: string;
    items: ProductCart[];
    quantity: number;
    status: string;
    total: number;
    user: any;
  };
}
