import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { MenuCard } from './MenuCard';
import { menuItems, categories } from '../data/menuData';
import { MenuItem, MenuVariant } from '../types';

interface MenuProps {
  onAddToCart: (item: MenuItem, variant: MenuVariant, quantity: number) => void;
  getCartQuantity: (itemId: string, variantId: string) => number;
  onUpdateQuantity: (itemId: string, variantId: string, quantity: number) => void;
}

export const Menu: React.FC<MenuProps> = ({
  onAddToCart,
  getCartQuantity,
  onUpdateQuantity,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    let filtered = menuItems;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Hotel Chillies Menu</h1>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === 'All'
                ? 'bg-yellow-500 text-gray-900 font-semibold'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-yellow-500 text-gray-900 font-semibold'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
            getCartQuantity={getCartQuantity}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found matching your search.</p>
        </div>
      )}
    </div>
  );
};