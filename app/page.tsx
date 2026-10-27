'use client';

import React from 'react';
import ProductCatalog from './components/ProductCatalog';
import Cart from './components/Cart';
import datos from '../datos_prueba.json';
import { useCart } from './context/CartContext';

export default function Home() {
  const { cart, addToCart, removeFromCart } = useCart();

  return (
    <div className="container my-4">
      <h1 className="fw-bold mb-4 text-center">Tienda de Maquillaje - Norbert Makeup</h1>

      <div className="row">
        <div className="col-md-8">
          <ProductCatalog products={datos.products} onAddToCart={addToCart} />
        </div>

        <div className="col-md-4">
          <Cart cart={cart} onRemoveFromCart={removeFromCart} />
        </div>
      </div>
    </div>
  );
}