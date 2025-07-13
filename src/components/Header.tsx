import React from 'react';
import { ShoppingCart, Users, LogOut } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  currentView: 'menu' | 'cart' | 'orders' | 'admin';
  onViewChange: (view: 'menu' | 'cart' | 'orders' | 'admin') => void;
  isAdmin: boolean;
  onAdminLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  currentView,
  onViewChange,
  isAdmin,
  onAdminLogout,
}) => {
  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-gray-900 font-bold text-sm">DG</span>
            </div>
            <h1 className="text-xl font-bold text-yellow-400">Nxt Adventure</h1>
          </div>

          <nav className="flex items-center space-x-4">
            {!isAdmin && (
              <>
                <button
                  onClick={() => onViewChange('menu')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'menu'
                      ? 'bg-yellow-500 text-gray-900'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  Menu
                </button>
                
                <button
                  onClick={() => onViewChange('cart')}
                  className={`relative px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    currentView === 'cart'
                      ? 'bg-yellow-500 text-gray-900'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => onViewChange('orders')}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    currentView === 'orders'
                      ? 'bg-yellow-500 text-gray-900'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>My Orders</span>
                </button>
              </>
            )}

            {isAdmin && (
              <>
                <span className="text-yellow-400 font-semibold">Admin Panel</span>
                <button
                  onClick={onAdminLogout}
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};