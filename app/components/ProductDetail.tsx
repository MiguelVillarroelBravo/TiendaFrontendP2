'use client';

import React, { useState } from 'react';
import { Product } from '../context/CartContext';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetail({ product, onAddToCart }: ProductDetailProps) {
  const [agregado, setAgregado] = useState(false);

  const handleClick = () => {
    onAddToCart(product);
    setAgregado(true);
  };

  return (
    <div className="p-4 rounded-4 bg-white shadow-glam">
      <span className="badge badge-gold mb-2">{product.category}</span>
      <h2 className="fw-bold">{product.name}</h2>
      <p className="fw-bold fs-3" style={{ color: '#c2185b' }}>{product.price}</p>
      <p className={product.stocked ? 'text-success' : 'text-danger'}>
        {product.stocked ? 'Disponible' : 'Agotado'}
      </p>

      {agregado && (
        <div className="alert alert-success py-2" role="alert">
          Producto añadido al carrito
        </div>
      )}

      <button
        className={`btn w-100 py-2 ${product.stocked ? 'btn-glam' : 'btn-secondary'}`}
        style={{ borderRadius: '25px' }}
        disabled={!product.stocked}
        onClick={handleClick}
      >
        {product.stocked ? 'Añadir al Carrito' : 'Agotado'}
      </button>
    </div>
  );
}