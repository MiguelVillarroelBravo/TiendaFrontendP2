'use client';

import React, { useState } from 'react';
import { DatosCheckout, validarCheckout } from '../utils/validaciones';

const REGIONES: Record<string, string[]> = {
  'Región Metropolitana de Santiago': ['Santiago', 'Maipú', 'Cerrillos', 'Providencia', 'Ñuñoa', 'Puente Alto'],
  'Región de Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué'],
  'Región del Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles'],
};

const VACIO: DatosCheckout = {
  nombre: '',
  apellidos: '',
  correo: '',
  calle: '',
  departamento: '',
  region: '',
  comuna: '',
  indicaciones: '',
};

interface CheckoutFormProps {
  total: number;
  onSubmitForm: (datos: DatosCheckout) => void;
}

export default function CheckoutForm({ total, onSubmitForm }: CheckoutFormProps) {
  const [valores, setValores] = useState<DatosCheckout>(VACIO);
  const [tocados, setTocados] = useState<Record<string, boolean>>({});

  const errores = validarCheckout(valores);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Si cambia la región, se reinicia la comuna
    const nuevos = name === 'region' ? { ...valores, region: value, comuna: '' } : { ...valores, [name]: value };
    setValores(nuevos);
    setTocados({ ...tocados, [name]: true });
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setTocados({ ...tocados, [e.target.name]: true });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todos: Record<string, boolean> = {};
    Object.keys(valores).forEach((k) => (todos[k] = true));
    setTocados(todos);
    if (Object.keys(errores).length > 0) return;
    onSubmitForm(valores);
  };

  const clase = (campo: keyof DatosCheckout, tipo = 'form-control') =>
    `${tipo} ${tocados[campo] ? (errores[campo] ? 'is-invalid' : 'is-valid') : ''}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="p-4 rounded-4 bg-white shadow-glam">
      <h5 className="fw-bold mb-3" style={{ color: '#c2185b' }}>Información del cliente</h5>
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <label htmlFor="nombre" className="form-label">Nombre *</label>
          <input id="nombre" name="nombre" className={clase('nombre')} value={valores.nombre} onChange={handleChange} onBlur={handleBlur} />
          <div className="invalid-feedback">{errores.nombre}</div>
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="apellidos" className="form-label">Apellidos *</label>
          <input id="apellidos" name="apellidos" className={clase('apellidos')} value={valores.apellidos} onChange={handleChange} onBlur={handleBlur} />
          <div className="invalid-feedback">{errores.apellidos}</div>
        </div>
        <div className="col-12">
          <label htmlFor="correo" className="form-label">Correo *</label>
          <input id="correo" name="correo" type="email" className={clase('correo')} value={valores.correo} onChange={handleChange} onBlur={handleBlur} />
          <div className="invalid-feedback">{errores.correo}</div>
        </div>
      </div>

      <h5 className="fw-bold mb-3" style={{ color: '#c2185b' }}>Dirección de entrega</h5>
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-8">
          <label htmlFor="calle" className="form-label">Calle *</label>
          <input id="calle" name="calle" className={clase('calle')} value={valores.calle} onChange={handleChange} onBlur={handleBlur} />
          <div className="invalid-feedback">{errores.calle}</div>
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="departamento" className="form-label">Departamento (opcional)</label>
          <input id="departamento" name="departamento" placeholder="Ej: 603" className="form-control" value={valores.departamento} onChange={handleChange} />
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="region" className="form-label">Región *</label>
          <select id="region" name="region" className={clase('region', 'form-select')} value={valores.region} onChange={handleChange} onBlur={handleBlur}>
            <option value="">Selecciona...</option>
            {Object.keys(REGIONES).map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <div className="invalid-feedback">{errores.region}</div>
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="comuna" className="form-label">Comuna *</label>
          <select id="comuna" name="comuna" className={clase('comuna', 'form-select')} value={valores.comuna} onChange={handleChange} onBlur={handleBlur} disabled={!valores.region}>
            <option value="">Selecciona...</option>
            {(REGIONES[valores.region] ?? []).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div className="invalid-feedback">{errores.comuna}</div>
        </div>
        <div className="col-12">
          <label htmlFor="indicaciones" className="form-label">Indicaciones para la entrega (opcional)</label>
          <textarea id="indicaciones" name="indicaciones" rows={3} className="form-control" value={valores.indicaciones} onChange={handleChange} />
        </div>
      </div>

      <button type="submit" className="btn btn-glam w-100 py-2" style={{ borderRadius: '25px' }}>
        Pagar ahora ${total.toLocaleString('es-CL')}
      </button>
    </form>
  );
}