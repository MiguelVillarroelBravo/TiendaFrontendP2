import React from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  stocked: boolean;
}

interface CartProps {
  cart: Product[];
  onRemoveFromCart: (index: number) => void;
}

export default function Cart({ cart, onRemoveFromCart }: CartProps) {
  return (
    <div className="p-4 rounded-4 bg-white shadow-glam">
      <h4 className="mb-3 fw-bold d-flex align-items-center justify-content-between" style={{ color: '#c2185b' }}>
        <span> Mi Carrito</span>
        <span className="badge bg-light text-dark fs-6 rounded-circle border">{cart.length}</span>
      </h4>
      <hr style={{ borderColor: '#f8bbd0' }} />

      {cart.length === 0 ? (
        <p className="text-muted text-center py-4">Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul className="list-group list-group-flush mb-3">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent border-bottom">
                <div>
                  <span className="small fw-bold d-block">{item.name}</span>
                  <small className="fw-semibold" style={{ color: '#c2185b' }}>{item.price}</small>
                </div>
                <button
                  className="btn btn-outline-danger btn-sm rounded-circle"
                  style={{ width: '28px', height: '28px', padding: 0, fontSize: '12px' }}
                  onClick={() => onRemoveFromCart(index)}
                  title="Eliminar producto"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <div className="p-3 rounded-3" style={{ backgroundColor: '#fff9fa', border: '1px solid #f8bbd0' }}>
            <div className="d-flex justify-content-between fw-bold">
              <span>Total de productos:</span>
              <span style={{ color: '#c2185b' }}>{cart.length}</span>
              <Link href="/checkout" className="btn btn-glam w-100 mt-3" style={{ borderRadius: '25px' }}>
                Ir a pagar
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}