import { create } from "zustand";

// Dummy orders data
const initialOrders = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    items: [
      { productId: 1, name: "Monstera Deliciosa", quantity: 2, price: 45.99 },
      { productId: 5, name: "Pothos Golden", quantity: 1, price: 19.99 }
    ],
    totalAmount: 111.97,
    status: "pending",
    orderDate: "2024-01-20",
    shippingAddress: "123 Main St, City, State 12345",
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    items: [
      { productId: 2, name: "Snake Plant", quantity: 3, price: 29.99 }
    ],
    totalAmount: 89.97,
    status: "processing",
    orderDate: "2024-01-19",
    shippingAddress: "456 Oak Ave, City, State 12345",
    paymentMethod: "PayPal"
  },
  {
    id: "ORD-003",
    customerName: "Bob Johnson",
    customerEmail: "bob@example.com",
    items: [
      { productId: 3, name: "Peace Lily", quantity: 1, price: 35.50 },
      { productId: 4, name: "Fiddle Leaf Fig", quantity: 1, price: 89.99 }
    ],
    totalAmount: 125.49,
    status: "shipped",
    orderDate: "2024-01-18",
    shippingAddress: "789 Pine Rd, City, State 12345",
    paymentMethod: "Credit Card",
    trackingNumber: "TRACK-123456"
  },
  {
    id: "ORD-004",
    customerName: "Alice Williams",
    customerEmail: "alice@example.com",
    items: [
      { productId: 1, name: "Monstera Deliciosa", quantity: 1, price: 45.99 },
      { productId: 2, name: "Snake Plant", quantity: 2, price: 29.99 },
      { productId: 5, name: "Pothos Golden", quantity: 2, price: 19.99 }
    ],
    totalAmount: 155.95,
    status: "delivered",
    orderDate: "2024-01-15",
    shippingAddress: "321 Elm St, City, State 12345",
    paymentMethod: "Credit Card",
    trackingNumber: "TRACK-123455",
    deliveredDate: "2024-01-17"
  },
  {
    id: "ORD-005",
    customerName: "Charlie Brown",
    customerEmail: "charlie@example.com",
    items: [
      { productId: 4, name: "Fiddle Leaf Fig", quantity: 1, price: 89.99 }
    ],
    totalAmount: 89.99,
    status: "cancelled",
    orderDate: "2024-01-17",
    shippingAddress: "654 Maple Dr, City, State 12345",
    paymentMethod: "Credit Card",
    cancelledDate: "2024-01-18"
  },
  {
    id: "ORD-006",
    customerName: "Diana Prince",
    customerEmail: "diana@example.com",
    items: [
      { productId: 3, name: "Peace Lily", quantity: 2, price: 35.50 }
    ],
    totalAmount: 71.00,
    status: "pending",
    orderDate: "2024-01-21",
    shippingAddress: "987 Cedar Ln, City, State 12345",
    paymentMethod: "PayPal"
  }
];

export const useOrderStore = create((set, get) => ({
  orders: initialOrders,
  
  updateOrderStatus: (orderId, newStatus) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              ...(newStatus === "shipped" && !order.trackingNumber
                ? { trackingNumber: `TRACK-${Math.floor(Math.random() * 1000000)}` }
                : {}),
              ...(newStatus === "delivered"
                ? { deliveredDate: new Date().toISOString().split('T')[0] }
                : {}),
              ...(newStatus === "cancelled"
                ? { cancelledDate: new Date().toISOString().split('T')[0] }
                : {})
            }
          : order
      )
    }));
  },
  
  getOrderById: (orderId) => {
    return get().orders.find((order) => order.id === orderId);
  },
  
  getOrdersByStatus: (status) => {
    return get().orders.filter((order) => order.status === status);
  }
}));

