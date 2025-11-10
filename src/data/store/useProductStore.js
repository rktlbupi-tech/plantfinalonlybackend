import { create } from "zustand";

// Dummy products data
const initialProducts = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    description: "Large tropical plant with unique split leaves",
    price: 45.99,
    category: "Indoor",
    stock: 25,
    image: "https://images.unsplash.com/photo-1519336056116-9e799c0a2b0c?w=400",
    status: "active",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Snake Plant",
    description: "Low maintenance air-purifying plant",
    price: 29.99,
    category: "Indoor",
    stock: 40,
    image: "https://images.unsplash.com/photo-1593691509545-8d834b6c2e2a?w=400",
    status: "active",
    createdAt: "2024-01-10"
  },
  {
    id: 3,
    name: "Peace Lily",
    description: "Elegant white flowers, perfect for low light",
    price: 35.50,
    category: "Indoor",
    stock: 18,
    image: "https://images.unsplash.com/photo-1463154545680-d59320fd685d?w=400",
    status: "active",
    createdAt: "2024-01-08"
  },
  {
    id: 4,
    name: "Fiddle Leaf Fig",
    description: "Popular large-leafed statement plant",
    price: 89.99,
    category: "Indoor",
    stock: 12,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
    status: "active",
    createdAt: "2024-01-05"
  },
  {
    id: 5,
    name: "Pothos Golden",
    description: "Trailing vine plant, easy to care for",
    price: 19.99,
    category: "Indoor",
    stock: 50,
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400",
    status: "active",
    createdAt: "2024-01-12"
  }
];

export const useProductStore = create((set, get) => ({
  products: initialProducts,
  
  addProduct: (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      status: "active",
      createdAt: new Date().toISOString().split('T')[0],
      stock: parseInt(product.stock) || 0
    };
    set((state) => ({
      products: [newProduct, ...state.products]
    }));
    return newProduct;
  },
  
  updateProduct: (id, updates) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      )
    }));
  },
  
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id)
    }));
  },
  
  getProductById: (id) => {
    return get().products.find((p) => p.id === id);
  }
}));

