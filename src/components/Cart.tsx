import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem, User } from '../types';
import { orderService } from '../services/orderService';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, variantId: string, quantity: number) => void;
  onRemoveItem: (itemId: string, variantId: string) => void;
  onClearCart: () => void;
  totalAmount: number;
}

export const Cart: React.FC<CartProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  totalAmount,
}) => {
  const [user, setUser] = useState({ name: '', roomNumber: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0 || !user.name || !user.roomNumber) return;

    setIsLoading(true);
    try {
      // Create or get user
      let userData = await orderService.getUserByNameAndRoom(user.name, user.roomNumber);
      if (!userData) {
        userData = await orderService.createUser({
          name: user.name,
          roomNumber: user.roomNumber,
        });
      }

      // Create order
      const orderItems = cartItems.map(item => ({
        menuItemId: item.menuItemId,
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.variant.price,
        menuItemName: item.menuItem.name,
        variantName: item.variant.name,
      }));

      await orderService.createOrder({
        userId: userData.id,
        userName: user.name,
        roomNumber: user.roomNumber,
        items: orderItems,
        totalAmount,
        status: 'pending',
      });

      setOrderSuccess(true);
      onClearCart();
      
      // Reset form after a delay
      setTimeout(() => {
        setOrderSuccess(false);
        setUser({ name: '', roomNumber: '' });
      }, 3000);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">Order Placed Successfully!</h2>
          <p className="text-green-700">Your order has been received and will be prepared shortly.</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600">Add some delicious items from our menu!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cart Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Items ({cartItems.length})</h2>
            <button
              onClick={onClearCart}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Clear All
            </button>
          </div>

          {cartItems.map((item) => (
            <div key={`${item.menuItemId}-${item.variantId}`} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.menuItem.name}</h3>
                  <p className="text-sm text-gray-600">{item.variant.name}</p>
                  <p className="text-lg font-bold text-green-600 mt-1">₹{item.variant.price}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.menuItemId, item.variantId, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.menuItemId, item.variantId, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.menuItemId, item.variantId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{item.variant.price * item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Details</h2>

          <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-2">
                Room Number
              </label>
              <input
                type="text"
                id="room"
                required
                value={user.roomNumber}
                onChange={(e) => setUser({ ...user, roomNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your room number"
              />
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-green-600">₹{totalAmount}</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                {isLoading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};