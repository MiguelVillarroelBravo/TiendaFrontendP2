# Norbert Makeup - Tienda de Maquillaje Online

Aplicación web frontend de comercio electrónico desarrollada para **Norbert Makeup**, construida con **React 19**, **Next.js (App Router)**, **TypeScript** y **Bootstrap 5**. Incluye gestión de estado global para el carrito de compras, validaciones reactivas de formularios y una suite completa de pruebas unitarias automatizadas con **Jasmine**, **Karma** y reportes de cobertura con **Istanbul**.

---

## Características Principales

* **Catálogo Interactivo de Productos:** Visualización de productos por categoría, control visual de disponibilidad de stock (`Disponible` / `Agotado`) y vista de detalle dinámico por producto (`/producto/[id]`).
* **Carrito de Compras Global (`CartContext`):** Gestión de estado mediante React Context API para agregar productos, eliminar ítems individuales, vaciar el carrito y calcular subtotales y totales automáticamente en pesos chilenos (`CLP`).
* **Flujo de Checkout y Despacho (`/checkout`):** Formulario de compra con selectores dinámicos anidados por Región y Comuna, resumen de compra adaptativo y generación de comprobante de pedido.
* **Formulario de Contacto Reactivo (`/contacto`):** Validaciones en tiempo real con retroalimentación visual inmediata (`.is-valid` / `.is-invalid`) al interactuar con los campos.
* **Diseño Responsivo:** Interfaz adaptable a dispositivos móviles, tablets y escritorio utilizando el sistema de grillas de **Bootstrap 5** combinado con estilos personalizados.
* **Testing Unitario y Cobertura:** Suite de 10 pruebas unitarias con aislamiento mediante *Mocks* y *Spies*, ejecutadas en `ChromeHeadless` con generación de reportes HTML y por consola.

---

## Stack Tecnológico

| Categoría | Tecnologías Utilizadas |
| :--- | :--- |
| **Framework & Librería UI** | Next.js (App Router), React 19 |
| **Lenguaje** | TypeScript (`.ts`, `.tsx`) |
| **Estilos y Responsividad** | Bootstrap 5, CSS3 Custom Variables |
| **Testing & QA** | Jasmine, Karma, Webpack (`ts-loader`), Chrome Headless |
| **Cobertura de Código** | Istanbul (`@jsdevtools/coverage-istanbul-loader`) |

---

## Estructura del Proyecto

```text
TiendaFrontendP2/
├── app/
│   ├── components/          # Componentes reutilizables de la interfaz
│   │   ├── Cart.tsx
│   │   ├── CheckoutForm.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductCatalog.tsx
│   │   └── ProductDetail.tsx
│   ├── context/
│   │   └── CartContext.tsx  # Estado global del carrito y utilidades de precio
│   ├── utils/
│   │   └── validaciones.ts  # Reglas de validación para Contacto y Checkout
│   ├── blog/                # Ruta de blog
│   ├── categorias/          # Ruta de categorías
│   ├── checkout/            # Flujo de pago y confirmación de orden
│   ├── contacto/            # Página de contacto
│   ├── nosotros/            # Información de la tienda
│   ├── ofertas/             # Sección de ofertas
│   ├── producto/[id]/       # Vista detallada dinámica por producto
│   ├── globals.css          # Estilos personalizados y paleta de colores
│   ├── layout.tsx           # Layout raíz con CartProvider y Navbar
│   └── page.tsx             # Página principal (Catálogo + Carrito)
├── spec/                    # Suite de pruebas unitarias y Mocks
│   ├── cart.spec.tsx        # Tests 9 y 10 (Carrito y persistencia de estado)
│   ├── catalog.spec.tsx     # Tests 7 y 8 (Conversión de precios y catálogo con mock)
│   ├── formularios.spec.tsx # Tests 4, 5 y 6 (Validaciones reactivas en ContactForm)
│   ├── navbar.spec.tsx      # Tests 1, 2 y 3 (Navbar, props de catálogo y CartProvider)
│   └── mocks.ts             # Datos simulados de productos (mockProductos)
├── datos_prueba.json        # Catálogo base de productos de la tienda
├── karma.conf.js            # Configuración de Karma, Webpack e Istanbul
├── tsconfig.json            # Configuración principal de TypeScript
├── tsconfig.karma.json      # Configuración de compilación para el entorno de testing
└── package.json             # Dependencias y scripts del proyecto
```

---

## Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/MiguelVillarroelBravo/TiendaFrontendP2.git](https://github.com/MiguelVillarroelBravo/TiendaFrontendP2.git)]
   cd TiendaFrontendP2
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**
   Visita [http://localhost:3000](http://localhost:3000) para visualizar la tienda.

---

## Ejecución de Pruebas Unitarias y Cobertura

El proyecto cuenta con **10 pruebas unitarias** configuradas con **Jasmine** y **Karma**, verificando renderizado de componentes, paso de `props`, manejo de `state` / `Context`, validaciones de formularios y manipulación del DOM.

Para ejecutar la suite de pruebas en modo headless y generar el reporte de cobertura:

```bash
npm test
```
*(O directamente mediante `npx karma start`)*

### Resumen de Suites de Prueba (`spec/`)

| Archivo Spec | Pruebas Incluidas | Componentes / Módulos Evaluados |
| :--- | :--- | :--- |
| `navbar.spec.tsx` | **Tests 1, 2 y 3** | Renderizado de `Navbar`, paso de props en `ProductCatalog` y actualización de estado en `CartContext`. |
| `formularios.spec.tsx` | **Tests 4, 5 y 6** | Validación de campos vacíos, envío válido con limpieza de formulario y alternancia dinámica de clases `.is-invalid` / `.is-valid` en `ContactForm`. |
| `catalog.spec.tsx` | **Tests 7 y 8** | Función utilitaria `precioANumero` y renderizado aislado de productos con y sin stock usando `mockProductos`. |
| `cart.spec.tsx` | **Tests 9 y 10** | Eliminación de ítems del DOM en `Cart` y flujo de adición/vaciado (`clearCart`) en `CartProvider`. |

Al finalizar la ejecución, el reporte interactivo HTML de cobertura generado por **Istanbul** queda disponible en la ruta local:
`coverage/report-html/index.html`

---

## Scripts Disponibles

* `npm run dev` — Inicia el entorno de desarrollo en `http://localhost:3000`.
* `npm run build` — Compila la aplicación para producción.
* `npm run start` — Inicia el servidor de producción de Next.js.
* `npm test` — Ejecuta las pruebas unitarias con Karma + Jasmine y genera el reporte de cobertura con Istanbul.
