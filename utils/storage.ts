import { Order } from '@/constants/mockData';

// Key for storing orders in AsyncStorage
const ORDERS_STORAGE_KEY = 'autodinar_orders';

// Get orders from localStorage (web) since this is a web-focused project
export const getOrders = (): Order[] => {
  try {
    const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (storedOrders) {
      return JSON.parse(storedOrders);
    }
    return [];
  } catch (error) {
    console.error('Failed to get orders from storage', error);
    return [];
  }
};

// Save orders to localStorage
export const saveOrders = (orders: Order[]): void => {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Failed to save orders to storage', error);
  }
};

// Add a new order
export const addOrder = (order: Order): void => {
  const currentOrders = getOrders();
  saveOrders([order, ...currentOrders]);
};

// Get a specific order by ID
export const getOrderById = (id: string): Order | undefined => {
  const orders = getOrders();
  return orders.find(order => order.id === id);
};