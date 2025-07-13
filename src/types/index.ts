export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description?: string;
  image?: string;
  variants: MenuVariant[];
}

export interface MenuVariant {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface CartItem {
  menuItemId: string;
  variantId: string;
  quantity: number;
  menuItem: MenuItem;
  variant: MenuVariant;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  roomNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  menuItemId: string;
  variantId: string;
  quantity: number;
  price: number;
  menuItemName: string;
  variantName: string;
}

export interface User {
  id: string;
  name: string;
  roomNumber: string;
  createdAt: string;
}

export interface OrderSummary {
  totalOrders: number;
  totalAmount: number;
  itemSummary: {
    [key: string]: {
      quantity: number;
      customers: string[];
    };
  };
  userOrders: Order[];
}