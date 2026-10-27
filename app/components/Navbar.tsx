'use client';

import { useState } from 'react';
import Link from 'next/link';

const ENLACES = [
  { href: '/', texto: 'Home' },
  { href: '/categorias', texto: 'Categorías' },
  { href: '/ofertas', texto: 'Ofertas' },
  { href: '/nosotros', texto: 'Nosotros' },
  { href: '/blog', texto: 'Blog' },
  { href: '/contacto', texto: 'Contacto' },
];

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg py-3 mb-4 bg-white shadow-glam">
      <div className="container">
        <h3 className="fw-bold m-0" style={{ color: '#c2185b', letterSpacing: '1px' }}>
          Norbert Makeup
        </h3>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse justify-content-end ${abierto ? 'show' : ''}`}>
          <ul className="navbar-nav">
            {ENLACES.map((enlace) => (
              <li className="nav-item" key={enlace.href}>
                <Link
                  href={enlace.href}
                  className="nav-link fw-semibold"
                  style={{ color: '#2c2c2c' }}
                  onClick={() => setAbierto(false)}
                >
                  {enlace.texto}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}