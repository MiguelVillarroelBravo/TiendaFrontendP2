'use client';

import React, { use } from 'react';
import Link from 'next/link';
import datos from '@/datos_prueba.json';
import ProductDetail from '@/app/components/ProductDetail';
import { useCart } from '@/app/context/CartContext';
export default function ProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const product = datos.products.find((p) => p.id === id);

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <Link href="/" className="btn btn-outline-secondary btn-sm mb-3">← Volver</Link>
          {product ? (
            <ProductDetail product={product} onAddToCart={addToCart} />
          ) : (
            <h4>Producto no encontrado</h4>
          )}
        </div>
      </div>
    </div>
  );
}