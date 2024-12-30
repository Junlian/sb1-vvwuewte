export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
  stock: number;
  category: Category;
}

export interface ProductImage {
  id: number;
  url: string;
  altText: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface ProductFilters {
  category?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
}