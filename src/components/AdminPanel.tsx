import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShoppingBag, 
  Download, 
  ToggleLeft, 
  ToggleRight,
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  Truck
} from 'lucide-react';
import { Order, OrderSummary } from '../types';
import { orderService } from '../services/orderService';
import { generateOrderSummaryPDF } from '../utils/pdfGenerator';
import { format } from 'date-fns';

export const AdminPanel: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOrderingOpen, setIsOrderingOpen] = useState(true);
  const [selectedView, setSelectedView] = useState<'summary' | 'orders' | 'analytics'>('summary');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [allOrders, summary, orderingStatus] = await Promise.all([
        orderService.getAllOrders(),
        orderService.getOrderSummary(),
        orderService.getOrderingStatus()
      ]);
      
      setOrders(allOrders);
      setOrderSummary(summary);
      setIsOrderingOpen(orderingStatus);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleOrdering = async () => {
    try {
      const newStatus = !isOrderingOpen;
      await orderService.setOrderingStatus(newStatus);
      setIsOrderingOpen(newStatus);
    } catch (error) {
      console.error('Error toggling ordering status:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      await orderService.updateOrderStatus(orderId, status);
      await fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleExportPDF = () => {
    if (orderSummary) {
      generateOrderSummaryPDF(orderSummary);
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'preparing':
        return <Package className="w-4 h-4 text-orange-500" />;
      case 'ready':
        return <Truck className="w-4 h-4 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getUniqueCustomers = () => {
    const customers = new Set();
    orders.forEach(order => {
      customers.add(`${order.userName} (Room ${order.roomNumber})`);
    });
    return customers.size;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          {/* Ordering Toggle */}
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${isOrderingOpen ? 'text-green-600' : 'text-red-600'}`}>
              Orders {isOrderingOpen ? 'Open' : 'Closed'}
            </span>
            <button
              onClick={handleToggleOrdering}
              className="text-gray-500 hover:text-gray-700"
            >
              {isOrderingOpen ? (
                <ToggleRight className="w-8 h-8 text-green-500" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-red-500" />
              )}
            </button>
          </div>

          {/* Export PDF */}
          <button
            onClick={handleExportPDF}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{orderSummary?.totalOrders || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">₹{orderSummary?.totalAmount || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Customers</p>
              <p className="text-2xl font-bold text-gray-900">{getUniqueCustomers()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Items Ordered</p>
              <p className="text-2xl font-bold text-gray-900">
                {orderSummary ? Object.keys(orderSummary.itemSummary).length : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8">
        <button
          onClick={() => setSelectedView('summary')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedView === 'summary'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Item Summary
        </button>
        <button
          onClick={() => setSelectedView('orders')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedView === 'orders'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          All Orders
        </button>
        <button
          onClick={() => setSelectedView('analytics')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedView === 'analytics'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Analytics
        </button>
      </div>

      {/* Content */}
      {selectedView === 'summary' && orderSummary && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Item Summary</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(orderSummary.itemSummary).map(([item, details]) => (
                <div key={item} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{item}</h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Total: {details.quantity}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Ordered by:</p>
                    <div className="flex flex-wrap gap-2">
                      {details.customers.map((customer, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                        >
                          {customer}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedView === 'orders' && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">All Orders</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {order.userName} - Room {order.roomNumber}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {format(new Date(order.createdAt), 'MMM dd, yyyy • h:mm a')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-green-600">₹{order.totalAmount}</span>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <span className="font-medium">{item.menuItemName}</span>
                          <span className="text-sm text-gray-600">({item.variantName})</span>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">x{item.quantity}</span>
                          <span className="text-gray-600 ml-3">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedView === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Status Distribution</h2>
            <div className="space-y-3">
              {['pending', 'confirmed', 'preparing', 'ready', 'delivered'].map((status) => {
                const count = orders.filter(order => order.status === status).length;
                const percentage = orders.length > 0 ? (count / orders.length) * 100 : 0;
                
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(status as Order['status'])}
                      <span className="capitalize font-medium">{status}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Resort Participation</h2>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{getUniqueCustomers()}</div>
                <div className="text-sm text-gray-600">out of 26 people have ordered</div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${(getUniqueCustomers() / 26) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {((getUniqueCustomers() / 26) * 100).toFixed(1)}% participation
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-2">Average order value</div>
                <div className="text-2xl font-bold text-gray-900">
                  ₹{orderSummary && orders.length > 0 ? Math.round(orderSummary.totalAmount / orders.length) : 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};