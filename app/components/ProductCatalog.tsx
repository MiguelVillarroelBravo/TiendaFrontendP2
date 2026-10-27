import React from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  stocked: boolean;
}

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function ProductCatalog({ products, onAddToCart }: ProductCatalogProps) {
  return (
    <div>
      <h3 className="mb-4 fw-bold" style={{ color: '#c2185b' }}>
        Catálogo de Productos
      </h3>
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="p-3 product-card-glam shadow-glam d-flex flex-column justify-content-between h-100">
              <div>
                <span className="badge badge-gold mb-2">{product.category}</span>
                <Link href={`/producto/${product.id}`} className="text-decoration-none text-dark">
                  <h5 className="fw-bold fs-6 mt-1 mb-2">{product.name}</h5>
                </Link>
                <p className="fw-bold fs-5" style={{ color: '#c2185b' }}>{product.price}</p>
              </div>
              <button
                className={`btn w-100 py-2 ${product.stocked ? 'btn-glam' : 'btn-secondary'}`}
                disabled={!product.stocked}
                onClick={() => onAddToCart(product)}
                style={{ borderRadius: '25px' }}
              >
                {product.stocked ? ' Añadir al Carrito' : 'Agotado'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}