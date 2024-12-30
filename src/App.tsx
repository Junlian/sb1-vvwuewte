import React from 'react';
import { CartProvider } from './context/CartContext';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ProductList />
            </div>
            <div className="lg:col-span-1">
              <Cart />
            </div>
          </div>
        </main>
      </div>
    </CartProvider>
  );
}

export default App;