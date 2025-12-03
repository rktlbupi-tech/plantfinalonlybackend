import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],

            addToCart: (product, quantity = 1) => {
                const { cart } = get();
                const existingItem = cart.find((item) => item._id === product._id);

                if (existingItem) {
                    set({
                        cart: cart.map((item) =>
                            item._id === product._id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    });
                } else {
                    set({ cart: [...cart, { ...product, quantity }] });
                }
            },

            removeFromCart: (productId) => {
                set((state) => ({
                    cart: state.cart.filter((item) => item._id !== productId),
                }));
            },

            updateQuantity: (productId, quantity) => {
                if (quantity < 1) return;
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item._id === productId ? { ...item, quantity } : item
                    ),
                }));
            },

            clearCart: () => set({ cart: [] }),

            getCartTotal: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
