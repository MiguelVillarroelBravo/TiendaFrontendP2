/// <reference types="jasmine" />
import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import Cart from '../app/components/Cart';
import { CartProvider, useCart } from '../app/context/CartContext';
import { mockProductos } from './mocks';

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

function TestCartApp() {
  const { cart, addToCart, clearCart } = useCart();
  return (
    <div>
      <span data-testid="cart-count">{cart.length}</span>
      <button data-testid="add-btn" onClick={() => addToCart(mockProductos[0])}>Agregar</button>
      <button data-testid="clear-btn" onClick={clearCart}>Vaciar</button>
    </div>
  );
}

describe('Carrito y Manejo de Estado (Tests 9 y 10)', () => {
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

  it('Test 9: Verificación de eliminación de items interactuando con el DOM', () => {
    const onRemoveSpy = jasmine.createSpy('onRemoveFromCart');
    
    act(() => {
      root.render(<Cart cart={mockProductos} onRemoveFromCart={onRemoveSpy} />);
    });

    const btnQuitar = contenedor.querySelector('button[title="Eliminar producto"]') as HTMLButtonElement;
    act(() => {
      btnQuitar.click();
    });

    expect(onRemoveSpy).toHaveBeenCalledWith(0);
  });

  it('Test 10: Comprobación de reinicio y persistencia de estado ante interacción del usuario', () => {
    act(() => {
      root.render(
        <CartProvider>
          <TestCartApp />
        </CartProvider>
      );
    });

    const count = contenedor.querySelector('[data-testid="cart-count"]')!;
    const btnAdd = contenedor.querySelector('[data-testid="add-btn"]') as HTMLButtonElement;
    const btnClear = contenedor.querySelector('[data-testid="clear-btn"]') as HTMLButtonElement;

    expect(count.textContent).toBe('0');

    act(() => { btnAdd.click(); });
    expect(count.textContent).toBe('1'); 

    act(() => { btnClear.click(); });
    expect(count.textContent).toBe('0'); 
  });
});
