import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, Package, Truck, User } from 'lucide-react';
import { Order } from '../types';
import { orderService } from '../services/orderService';
import { format } from 'date-fns';

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ name: '', roomNumber: '' });

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    const name = localStorage.getItem('userName');
    const roomNumber = localStorage.getItem('userRoomNumber');
    
    if (name && roomNumber) {
      setUserInfo({ name, roomNumber });
      try {
        const user = await orderService.getUserByNameAndRoom(name, roomNumber);
        if (user) {
          const userOrders = await orderService.getUserOrders(user.id);
          setOrders(userOrders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
    setLoading(false);
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.roomNumber) return;

    localStorage.setItem('userName', userInfo.name);
    localStorage.setItem('userRoomNumber', userInfo.roomNumber);
    
    setLoading(true);
    await fetchUserOrders();
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'preparing':
        return <Package className="w-5 h-5 text-orange-500" />;
      case 'ready':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Order Placed';
      case 'confirmed':
        return 'Confirmed';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready for Pickup';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      case 'ready':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!localStorage.getItem('userName') || !localStorage.getItem('userRoomNumber')) {
    return (
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <User className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">View Your Orders</h2>
            <p className="text-gray-600">Enter your details to see your order history</p>
          </div>

          <form onSubmit={handleUserSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
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
                value={userInfo.roomNumber}
                onChange={(e) => setUserInfo({ ...userInfo, roomNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your room number"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              View My Orders
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <div className="text-sm text-gray-600">
          <p>{userInfo.name} • Room {userInfo.roomNumber}</p>
          <button
            onClick={() => {
              localStorage.removeItem('userName');
              localStorage.removeItem('userRoomNumber');
              setOrders([]);
            }}
            className="text-yellow-600 hover:text-yellow-700 underline"
          >
            Switch User
          </button>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600">When you place an order, it will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(order.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">₹{order.totalAmount}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(order.createdAt), 'MMM dd, yyyy • h:mm a')}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <div>
                        <span className="font-medium">{item.menuItemName}</span>
                        <span className="text-sm text-gray-600 ml-2">({item.variantName})</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">x{item.quantity}</span>
                        <span className="text-gray-600 ml-3">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};