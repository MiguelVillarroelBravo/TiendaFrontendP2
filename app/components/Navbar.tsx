import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="py-3 mb-4 bg-white shadow-glam">
      <div className="container d-flex justify-content-between align-items-center">
        <h3 className="fw-bold m-0" style={{ color: '#c2185b', letterSpacing: '1px' }}>
           Norbert Makeup
        </h3>
        <ul className="nav">
          <li className="nav-item">
            <Link href="/" className="nav-link fw-semibold" style={{ color: '#2c2c2c' }}>Home</Link>
          </li>
          <li className="nav-item">
            <Link href="/categorias" className="nav-link fw-semibold" style={{ color: '#2c2c2c' }}>Categorías</Link>
          </li>
          <li className="nav-item">
            <Link href="/ofertas" className="nav-link fw-semibold" style={{ color: '#2c2c2c' }}>Ofertas</Link>
          </li>
          <li className="nav-item">
            <Link href="/nosotros" className="nav-link fw-semibold" style={{ color: '#2c2c2c' }}>Nosotros</Link>
          </li>
          <li className="nav-item">
            <Link href="/blog" className="nav-link fw-semibold" style={{ color: '#2c2c2c' }}>Blog</Link>
          </li>
          <li className="nav-item">
            <Link href="/contacto" className="nav-link fw-semibold" style={{ color: '#2c2c2c' }}>Contacto</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}