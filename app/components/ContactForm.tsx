'use client';

import React, { useState } from 'react';
import { DatosContacto, validarContacto } from '../utils/validaciones';

const VACIO: DatosContacto = { nombre: '', correo: '', mensaje: '' };

interface ContactFormProps {
  onSubmitForm?: (datos: DatosContacto) => void;
}

export default function ContactForm({ onSubmitForm }: ContactFormProps) {
  const [valores, setValores] = useState<DatosContacto>(VACIO);
  const [tocados, setTocados] = useState<Record<string, boolean>>({});
  const [enviado, setEnviado] = useState(false);

  // Se recalcula en cada render: validación en tiempo real
  const errores = validarContacto(valores);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValores({ ...valores, [name]: value });
    setTocados({ ...tocados, [name]: true });
    setEnviado(false);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTocados({ ...tocados, [e.target.name]: true });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTocados({ nombre: true, correo: true, mensaje: true });
    if (Object.keys(errores).length > 0) return;

    onSubmitForm?.(valores);
    setValores(VACIO);
    setTocados({});
    setEnviado(true);
  };

  const clase = (campo: keyof DatosContacto) =>
    `form-control ${tocados[campo] ? (errores[campo] ? 'is-invalid' : 'is-valid') : ''}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="p-4 rounded-4 bg-white shadow-glam">
      {enviado && (
        <div className="alert alert-success" role="alert">
          ¡Mensaje enviado! Te responderemos pronto.
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="nombre" className="form-label fw-semibold">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          className={clase('nombre')}
          value={valores.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="invalid-feedback">{errores.nombre}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="correo" className="form-label fw-semibold">Correo</label>
        <input
          id="correo"
          name="correo"
          type="email"
          className={clase('correo')}
          value={valores.correo}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="invalid-feedback">{errores.correo}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="mensaje" className="form-label fw-semibold">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          className={clase('mensaje')}
          value={valores.mensaje}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="invalid-feedback">{errores.mensaje}</div>
      </div>

      <button type="submit" className="btn btn-glam w-100 py-2" style={{ borderRadius: '25px' }}>
        Enviar mensaje
      </button>
    </form>
  );
}