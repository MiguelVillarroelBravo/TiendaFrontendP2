/// <reference types="jasmine" />
import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import ProductCatalog from '../app/components/ProductCatalog';
import { precioANumero } from '../app/context/CartContext';
import { mockProductos } from './mocks';

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

describe('Catálogo y Cálculos (Tests 7 y 8)', () => {
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

  it('Test 7: Cálculo correcto de conversión de precios para subtotales y total del carrito', () => {
    expect(precioANumero('$6.999')).toBe(6999);
    expect(precioANumero('12.000')).toBe(12000);
    expect(precioANumero('TextoInvalido')).toBe(0);
  });

  it('Test 8: Integración con un mock de datos de productos para verificar renderizado aislado', () => {
    const onAddToCartSpy = jasmine.createSpy('onAddToCart');
    
    act(() => {
      root.render(<ProductCatalog products={mockProductos} onAddToCart={onAddToCartSpy} />);
    });

    const cards = contenedor.querySelectorAll('.product-card-glam');
    expect(cards.length).toBe(2);
    expect(cards[0].textContent).toContain('Labial Rojo Mate');

    const botones = contenedor.querySelectorAll('button');
    act(() => {
      botones[0].click();
    });

    expect(onAddToCartSpy).toHaveBeenCalledWith(mockProductos[0]);
    expect(botones[1].disabled).toBeTrue(); 
  });
});
