import { api } from './api';
import { Product, ProductFilters } from '../types/product';

interface ProductResponse {
  results: Product[];
  hasMore: boolean;
}

export const productService = {
  async getProducts(filters: ProductFilters, page: number): Promise<ProductResponse> {
    try {
      const response = await api.get<ProductResponse>('/api/products/', {
        params: {
          ...filters,
          page,
        },
      });
      return response.data;
    } catch (error) {
      // Convert error to string instead of logging directly
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
      throw new Error(errorMessage);
    }
  },
};