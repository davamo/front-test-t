# 🛒 Front-Test-T – Aplicación Angular 18 para Gestión de Productos

Este proyecto es una aplicación web desarrollada con Angular 18 y TypeScript, orientada a la gestión de productos. Permite visualizar, agregar, editar y listar productos utilizando componentes reutilizables y Angular Material para una interfaz moderna y accesible.

## 🚀 Tecnologías utilizadas

- Angular 18
- TypeScript
- Angular Material
- SCSS
- RxJS
- Servicios con HTTPClient
- Pruebas con Jasmine y Karma

## 📁 Estructura del Proyecto

```
src/app/
├── components/
│   ├── add-product/          # Componente para agregar productos
│   ├── edit-product/         # Componente para editar productos
│   ├── product-list/         # Lista de productos (con HTML, SCSS y spec.ts)
│   ├── product-table/        # Tabla con listado de productos
│   ├── side-menu/            # Menú lateral de navegación
│   ├── status/               # Componente de estado
│   ├── layout/               # Diseño base (layouts compartidos)
│   └── loading/              # Indicador de carga (spinner)
├── features/                 # Funcionalidades agrupadas (si aplica)
├── models/                   # Interfaces y modelos de datos
│   └── product.model.ts
├── pages/                    # Vistas o páginas principales
├── pipes/                    # Pipes personalizados (si existen)
├── services/                 # Servicios reutilizables
│   ├── loading.service.ts
│   └── product.service.ts
```

## 🔧 Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/usuario/front-test-t.git
cd front-test-t
```

2. Instalar dependencias

```bash
npm install
```

3. Ejecutar la aplicación

```bash
ng serve
```

Abrir el navegador en http://localhost:4200/

## 🧪 Ejecutar pruebas

```bash
ng test
```

Esto ejecuta las pruebas unitarias configuradas en los archivos .spec.ts.

## 🧱 Build de producción

```bash
ng build --configuration production
```

Los archivos se generarán en la carpeta dist/.

## 🧠 Funcionalidades principales

- 📝 Crear y editar productos
- 📋 Listado dinámico con tabla y filtrado
- 🧱 Navegación lateral con Angular Material
- 🔄 Indicadores de carga reutilizables
- 🧪 Pruebas unitarias para servicios y componentes

## 📃 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## 👨‍💼 Autor

Desarrollado por David Varela M  
️✉️ Contacto: davamo@davamo.cl
