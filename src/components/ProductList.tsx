import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Search } from 'lucide-react';
import { Product, ProductFilters } from '../types/product';
import { ProductCard } from './ProductCard';
import { productService } from '../services/productService';

interface ProductListProps {
  initialFilters?: ProductFilters;
}

export const ProductList: React.FC<ProductListProps> = ({ initialFilters = {} }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  
  const { ref, inView } = useInView({
    threshold: 0.5
  });

  const fetchProducts = async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      const { results, hasMore: moreResults } = await productService.getProducts(filters, pageNum);
      
      if (pageNum === 1) {
        setProducts(results);
      } else {
        setProducts(prev => [...prev, ...results]);
      }
      
      setHasMore(moreResults);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }));
    setPage(1);
  };

  useEffect(() => {
    fetchProducts(page);
  }, [filters, page]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  }, [inView, hasMore, loading]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {error && (
        <div className="text-red-600 bg-red-100 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}
      <div ref={ref} className="h-20" />
    </div>
  );
};