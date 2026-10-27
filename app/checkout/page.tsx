'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CheckoutForm from '../components/CheckoutForm';
import { useCart, Product } from '../context/CartContext';
import { DatosCheckout } from '../utils/validaciones';

interface Pedido {
  numero: number;
  datos: DatosCheckout;
  items: Product[];
  total: number;
}

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [pedido, setPedido] = useState<Pedido | null>(null);

  const handleSubmit = (datos: DatosCheckout) => {
    setPedido({ numero: Date.now(), datos, items: cart, total });
    clearCart();
  };

  // Vista de compra exitosa
  if (pedido) {
    return (
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="p-4 rounded-4 bg-white shadow-glam">
              <h2 className="fw-bold text-success">✓ Compra realizada</h2>
              <p className="text-muted">Pedido nro #{pedido.numero}</p>
              <p className="mb-1"><strong>{pedido.datos.nombre} {pedido.datos.apellidos}</strong></p>
              <p className="mb-1">{pedido.datos.correo}</p>
              <p>
                {pedido.datos.calle}
                {pedido.datos.departamento && `, Depto ${pedido.datos.departamento}`}, {pedido.datos.comuna}, {pedido.datos.region}
              </p>
              <ul className="list-group list-group-flush mb-3">
                {pedido.items.map((item, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between">
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </li>
                ))}
              </ul>
              <h5 className="text-end">Total pagado: ${pedido.total.toLocaleString('es-CL')}</h5>
              <Link href="/" className="btn btn-outline-secondary w-100 mt-3">Volver a la tienda</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Carrito vacío
  if (cart.length === 0) {
    return (
      <div className="container my-4 text-center">
        <h3>Tu carrito está vacío</h3>
        <Link href="/" className="btn btn-glam mt-3">Ir a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="row g-4">
        <div className="col-12 col-lg-5 order-lg-2">
          <div className="p-4 rounded-4 bg-white shadow-glam">
            <h5 className="fw-bold mb-3" style={{ color: '#c2185b' }}>Resumen del carrito</h5>
            <ul className="list-group list-group-flush mb-3">
              {cart.map((item, i) => (
                <li key={i} className="list-group-item d-flex justify-content-between">
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
            <h5 className="text-end">Total: ${total.toLocaleString('es-CL')}</h5>
          </div>
        </div>
        <div className="col-12 col-lg-7 order-lg-1">
          <CheckoutForm total={total} onSubmitForm={handleSubmit} />
        </div>
      </div>
    </div>
  );
}