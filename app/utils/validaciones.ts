export interface DatosContacto {
  nombre: string;
  correo: string;
  mensaje: string;
}

export type ErroresContacto = Partial<Record<keyof DatosContacto, string>>;

export function validarCorreo(correo: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

export function validarContacto(datos: DatosContacto): ErroresContacto {
  const errores: ErroresContacto = {};

  if (!datos.nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio';
  } else if (datos.nombre.trim().length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres';
  }

  if (!datos.correo.trim()) {
    errores.correo = 'El correo es obligatorio';
  } else if (!validarCorreo(datos.correo.trim())) {
    errores.correo = 'Ingresa un correo válido';
  }

  if (!datos.mensaje.trim()) {
    errores.mensaje = 'El mensaje es obligatorio';
  } else if (datos.mensaje.trim().length < 10) {
    errores.mensaje = 'El mensaje debe tener al menos 10 caracteres';
  }

  return errores;
}