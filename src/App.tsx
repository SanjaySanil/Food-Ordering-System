import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Cart } from './components/Cart';
import { Orders } from './components/Orders';
import { AdminPanel } from './components/AdminPanel';
import { useCart } from './hooks/useCart';
import { useAuth } from './hooks/useAuth';
import { MenuItem, MenuVariant } from './types';
import { orderService } from './services/orderService';
import { Lock } from 'lucide-react';

type ViewType = 'menu' | 'cart' | 'orders' | 'admin';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('menu');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isOrderingOpen, setIsOrderingOpen] = useState(true);
  const [loginError, setLoginError] = useState('');

  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalAmount,
    getTotalItems,
  } = useCart();

  const { isAdminAuthenticated, adminLogin, adminLogout } = useAuth();

  useEffect(() => {
    checkOrderingStatus();
  }, []);

  const checkOrderingStatus = async () => {
    try {
      const status = await orderService.getOrderingStatus();
      setIsOrderingOpen(status);
    } catch (error) {
      console.error('Error checking ordering status:', error);
    }
  };

  const handleAddToCart = (item: MenuItem, variant: MenuVariant, quantity: number) => {
    if (!isOrderingOpen) {
      alert('Sorry, ordering is currently closed.');
      return;
    }

    addToCart({
      menuItemId: item.id,
      variantId: variant.id,
      quantity,
      menuItem: item,
      variant,
    });
  };

  const getCartQuantity = (itemId: string, variantId: string): number => {
    const item = cartItems.find(
      (cartItem) => cartItem.menuItemId === itemId && cartItem.variantId === variantId
    );
    return item ? item.quantity : 0;
  };

  const handleViewChange = (view: ViewType) => {
    if (view === 'admin') {
      if (isAdminAuthenticated) {
        setCurrentView('admin');
      } else {
        setShowAdminLogin(true);
      }
    } else {
      setCurrentView(view);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(adminPassword);
    if (success) {
      setCurrentView('admin');
      setShowAdminLogin(false);
      setAdminPassword('');
      setLoginError('');
    } else {
      setLoginError('Invalid password');
    }
  };

  const handleAdminLogout = () => {
    adminLogout();
    setCurrentView('menu');
  };

  // Show ordering closed message
  if (!isOrderingOpen && !isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header
          cartItemCount={getTotalItems()}
          currentView={currentView}
          onViewChange={handleViewChange}
          isAdmin={isAdminAuthenticated}
          onAdminLogout={handleAdminLogout}
        />
        
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ordering is Currently Closed</h2>
            <p className="text-gray-600">
              The food ordering system has been temporarily disabled. Please check back later or contact the front desk for assistance.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        cartItemCount={getTotalItems()}
        currentView={currentView}
        onViewChange={handleViewChange}
        isAdmin={isAdminAuthenticated}
        onAdminLogout={handleAdminLogout}
      />

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Admin Login</h2>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter admin password"
                  required
                />
                {loginError && (
                  <p className="text-red-600 text-sm mt-1">{loginError}</p>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminLogin(false);
                    setAdminPassword('');
                    setLoginError('');
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pb-8">
        {currentView === 'menu' && (
          <Menu
            onAddToCart={handleAddToCart}
            getCartQuantity={getCartQuantity}
            onUpdateQuantity={updateQuantity}
          />
        )}

        {currentView === 'cart' && (
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
            totalAmount={getTotalAmount()}
          />
        )}

        {currentView === 'orders' && <Orders />}

        {currentView === 'admin' && isAdminAuthenticated && <AdminPanel />}
      </main>

      {/* Admin Access Button (Hidden) */}
      {!isAdminAuthenticated && (
        <button
          onClick={() => setShowAdminLogin(true)}
          className="fixed bottom-4 right-4 w-12 h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-full opacity-20 hover:opacity-100 transition-opacity"
          title="Admin Access"
        >
          <Lock className="w-6 h-6 mx-auto" />
        </button>
      )}
    </div>
  );
}

export default App;