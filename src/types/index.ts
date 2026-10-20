export type UserRole = 'manager' | 'courier' | 'warehouse' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  email: string;
  avatar?: string;
}

export type OrderStatus = 'new' | 'processing' | 'assembling' | 'ready' | 'delivering' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Order {
  id: string;
  number: string;
  customer: string;
  phone: string;
  address: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  courier?: string;
  courierId?: string;
  createdAt: string;
  estimatedDelivery?: string;
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  unit: string;
}

export interface DashboardStats {
  totalOrders: number;
  activeOrders: number;
  deliveredToday: number;
  revenue: number;
  pendingAssembly: number;
  availableCouriers: number;
}
