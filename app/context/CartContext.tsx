'use client';

import React, { createContext, useContext, useState } from 'react';

export interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  stocked: boolean;
}

// Convierte "$6.999" en el número 6999
export function precioANumero(precio: string): number {
  return Number(precio.replace(/\D/g, '')) || 0;
}

interface CartContextType {
  cart: Product[];
  total: number;
  addToCart: (product: Product) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);
  console.log('>>> CartProvider se está usando');

  const addToCart = (product: Product) => setCart((prev) => [...prev, product]);
  const removeFromCart = (index: number) =>
    setCart((prev) => prev.filter((_, i) => i !== index));
  const clearCart = () => setCart([]);

  const total = cart.reduce((suma, item) => suma + precioANumero(item.price), 0);

  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
}