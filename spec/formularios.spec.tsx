/// <reference types="jasmine" />
import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import ContactForm from '../app/components/ContactForm';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('ContactForm (formulario con validaciones)', () => {
  let contenedor: HTMLDivElement;
  let root: Root;
  let onSubmitSpy: jasmine.Spy;

  // Simula que el usuario escribe en un campo
  function escribir(id: string, valor: string) {
    const el = contenedor.querySelector<HTMLInputElement | HTMLTextAreaElement>(`#${id}`)!;
    const proto = el instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;
    act(() => {
      Object.getOwnPropertyDescriptor(proto, 'value')!.set!.call(el, valor);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });
  }

  function enviar() {
    act(() => {
      contenedor.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    });
  }

  beforeEach(() => {
    contenedor = document.createElement('div');
    document.body.appendChild(contenedor);
    root = createRoot(contenedor);
    onSubmitSpy = jasmine.createSpy('onSubmitForm'); // mock del callback
    act(() => {
      root.render(<ContactForm onSubmitForm={onSubmitSpy} />);
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    contenedor.remove();
  });

  it('Test 4: muestra errores y no envía si los campos requeridos están vacíos', () => {
    enviar();

    const mensajes = Array.from(contenedor.querySelectorAll('.invalid-feedback')).map(
      (e) => e.textContent
    );
    expect(mensajes).toEqual([
      'El nombre es obligatorio',
      'El correo es obligatorio',
      'El mensaje es obligatorio',
    ]);
    expect(onSubmitSpy).not.toHaveBeenCalled();
  });

  it('Test 5: al enviar con datos válidos llama a onSubmitForm y limpia el formulario', () => {
    escribir('nombre', 'Miguel Villarroel');
    escribir('correo', 'miguel@correo.cl');
    escribir('mensaje', 'Hola, quiero consultar por un producto');
    enviar();

    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    expect(onSubmitSpy).toHaveBeenCalledWith({
      nombre: 'Miguel Villarroel',
      correo: 'miguel@correo.cl',
      mensaje: 'Hola, quiero consultar por un producto',
    });
    expect(contenedor.querySelector('.alert-success')).not.toBeNull();
    expect(contenedor.querySelector<HTMLInputElement>('#nombre')!.value).toBe('');
  });

  it('Test 6: el DOM alterna entre estado inválido y válido según lo que se escribe', () => {
    // Al inicio no hay mensajes ni clases de validación
    expect(contenedor.querySelectorAll('.is-invalid').length).toBe(0);
    expect(contenedor.querySelectorAll('.is-valid').length).toBe(0);

    // Nombre demasiado corto: aparece el error
    escribir('nombre', 'Mi');
    const nombre = contenedor.querySelector('#nombre')!;
    expect(nombre.classList.contains('is-invalid')).toBeTrue();
    expect(nombre.parentElement!.querySelector('.invalid-feedback')!.textContent)
      .toBe('El nombre debe tener al menos 3 caracteres');

    // Nombre correcto: el error desaparece y pasa a válido
    escribir('nombre', 'Miguel');
    expect(nombre.classList.contains('is-invalid')).toBeFalse();
    expect(nombre.classList.contains('is-valid')).toBeTrue();
  });
});