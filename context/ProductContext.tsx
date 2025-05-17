import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Product } from '@/types';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProductById: (id: number) => Product | undefined;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: false,
  error: null,
  fetchProducts: async () => {},
  getProductById: () => undefined,
});

export const useProducts = () => useContext(ProductContext);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = (id: number) => {
    return products.find(product => product.id === id);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error, fetchProducts, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};