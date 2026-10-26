'use client';

import React, { useState } from 'react';
import ProductCatalog from './components/ProductCatalog';
import Cart from './components/Cart';
import datos from '../datos_prueba.json';

interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  stocked: boolean;
}

export default function Home() {
  // Gestión de estado con useState
  const [cart, setCart] = useState<Product[]>([]);

  // Función para agregar al carrito
  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  // Función para eliminar del carrito
  const handleRemoveFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div className="container my-4">
      <h1 className="fw-bold mb-4 text-center">Tienda de Maquillaje - Norbert Makeup</h1>

      <div className="row">
        {/* Catálogo de productos (recibe props) */}
        <div className="col-md-8">
          <ProductCatalog products={datos.products} onAddToCart={handleAddToCart} />
        </div>

        {/* Carrito de compras (gestión de estado) */}
        <div className="col-md-4">
          <Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />
        </div>
      </div>
    </div>
  );
}