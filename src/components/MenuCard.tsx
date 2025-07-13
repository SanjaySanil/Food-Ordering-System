import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { MenuItem, MenuVariant } from '../types';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, variant: MenuVariant, quantity: number) => void;
  getCartQuantity: (itemId: string, variantId: string) => number;
  onUpdateQuantity: (itemId: string, variantId: string, quantity: number) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  onAddToCart,
  getCartQuantity,
  onUpdateQuantity,
}) => {
  const handleAddToCart = (variant: MenuVariant) => {
    onAddToCart(item, variant, 1);
  };

  const handleQuantityChange = (variant: MenuVariant, change: number) => {
    const currentQuantity = getCartQuantity(item.id, variant.id);
    const newQuantity = Math.max(0, currentQuantity + change);
    onUpdateQuantity(item.id, variant.id, newQuantity);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
            {item.description && (
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
            )}
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
              {item.category}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {item.variants.map((variant) => {
            const cartQuantity = getCartQuantity(item.id, variant.id);
            
            return (
              <div
                key={variant.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900">{variant.name}</span>
                    <span className="text-xl font-bold text-green-600">₹{variant.price}</span>
                  </div>
                  {variant.description && (
                    <p className="text-gray-500 text-xs mt-1">{variant.description}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {cartQuantity > 0 ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(variant, -1)}
                        className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{cartQuantity}</span>
                      <button
                        onClick={() => handleQuantityChange(variant, 1)}
                        className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(variant)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};