/// <reference types="jasmine" />
import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import Navbar from '../app/components/Navbar';
import ProductCatalog from '../app/components/ProductCatalog';
import { CartProvider, useCart } from '../app/context/CartContext';
import { mockProductos } from './mocks';

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

describe('Componentes Núcleo y Estado (Tests 1, 2 y 3)', () => {
  let contenedor: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    contenedor = document.createElement('div');
    document.body.appendChild(contenedor);
    root = createRoot(contenedor);
  });

  afterEach(() => {
    act(() => root.unmount());
    contenedor.remove();
  });

  it('Test 1: Renderizado correcto del componente Navbar y sus enlaces de navegación', () => {
    act(() => { root.render(<Navbar />); });
    const enlaces = contenedor.querySelectorAll('a.nav-link');
    expect(enlaces.length).toBeGreaterThan(0);
    expect(enlaces[0].textContent).toBe('Home');
  });

  it('Test 2: Renderizado del catálogo de productos y verificación del paso de props al componente hijo', () => {
    const dummyAddToCart = jasmine.createSpy('addToCart');
    act(() => {
      root.render(<ProductCatalog products={mockProductos} onAddToCart={dummyAddToCart} />);
    });
    const tarjetas = contenedor.querySelectorAll('.product-card-glam');
    expect(tarjetas.length).toBe(mockProductos.length);
    expect(contenedor.textContent).toContain(mockProductos[0].name);
  });

  it('Test 3: Verificación del estado del carrito cuando se agrega un elemento', () => {
    function TestComponent() {
      const { cart, addToCart } = useCart();
      return (
        <div>
          <span id="cart-length">{cart.length}</span>
          <button id="add-btn" onClick={() => addToCart(mockProductos[0])}>Add</button>
        </div>
      );
    }

    act(() => {
      root.render(<CartProvider><TestComponent /></CartProvider>);
    });

    const span = contenedor.querySelector('#cart-length')!;
    const btn = contenedor.querySelector('#add-btn') as HTMLButtonElement;

    expect(span.textContent).toBe('0');
    act(() => { btn.click(); });
    expect(span.textContent).toBe('1');
  });
});
