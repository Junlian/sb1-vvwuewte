import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      <div className="space-y-4">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => updateQuantity(product.id, quantity - 1)}
              >
                <Minus size={18} />
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => updateQuantity(product.id, quantity + 1)}
              >
                <Plus size={18} />
              </button>
            </div>
            <button
              className="p-2 text-red-500 hover:bg-red-50 rounded"
              onClick={() => removeFromCart(product.id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold">${total.toFixed(2)}</span>
        </div>
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};