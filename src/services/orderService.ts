import { supabase } from '../lib/supabase';
import { Order, OrderItem, User, OrderSummary } from '../types';

export const orderService = {
  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        user_id: order.userId,
        user_name: order.userName,
        room_number: order.roomNumber,
        items: order.items,
        total_amount: order.totalAmount,
        status: order.status,
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      userId: data.user_id,
      userName: data.user_name,
      roomNumber: data.room_number,
      items: data.items,
      totalAmount: data.total_amount,
      status: data.status,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(order => ({
      id: order.id,
      userId: order.user_id,
      userName: order.user_name,
      roomNumber: order.room_number,
      items: order.items,
      totalAmount: order.total_amount,
      status: order.status,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    }));
  },

  async getAllOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(order => ({
      id: order.id,
      userId: order.user_id,
      userName: order.user_name,
      roomNumber: order.room_number,
      items: order.items,
      totalAmount: order.total_amount,
      status: order.status,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    }));
  },

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) throw error;
  },

  async getOrderSummary(): Promise<OrderSummary> {
    const orders = await this.getAllOrders();
    
    const itemSummary: { [key: string]: { quantity: number; customers: string[] } } = {};
    
    orders.forEach(order => {
      order.items.forEach(item => {
        const key = `${item.menuItemName} (${item.variantName})`;
        if (!itemSummary[key]) {
          itemSummary[key] = { quantity: 0, customers: [] };
        }
        itemSummary[key].quantity += item.quantity;
        
        const customerInfo = `${order.userName} (Room ${order.roomNumber})`;
        if (!itemSummary[key].customers.includes(customerInfo)) {
          itemSummary[key].customers.push(customerInfo);
        }
      });
    });

    return {
      totalOrders: orders.length,
      totalAmount: orders.reduce((sum, order) => sum + order.totalAmount, 0),
      itemSummary,
      userOrders: orders,
    };
  },

  async createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        name: user.name,
        room_number: user.roomNumber,
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      roomNumber: data.room_number,
      createdAt: data.created_at,
    };
  },

  async getUserByNameAndRoom(name: string, roomNumber: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('name', name)
      .eq('room_number', roomNumber)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') throw error;
    if (!data) return null;

    return {
      id: data.id,
      name: data.name,
      roomNumber: data.room_number,
      createdAt: data.created_at,
    };
  },

  async getOrderingStatus(): Promise<boolean> {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'orders_open')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    
return (data?.value ?? 'true') === 'true';
  },

  async setOrderingStatus(isOpen: boolean): Promise<void> {
    const { error } = await supabase
      .from('settings')
      .upsert([{
        key: 'orders_open',
        value: isOpen.toString(),
        updated_at: new Date().toISOString(),
      }]);

    if (error) throw error;
  },
};