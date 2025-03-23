# 💼 Front-Test-T – Aplicación Angular 18 para Gestión de Productos

Este proyecto es una aplicación web desarrollada con Angular 18 y TypeScript, orientada a la gestión de productos. Permite visualizar, agregar, editar y listar productos utilizando componentes reutilizables y Angular Material para una interfaz moderna y accesible.

## 🚀 Tecnologías utilizadas

- Angular 18
- TypeScript
- Angular Material
- SCSS
- RxJS
- Servicios con HTTPClient
- Pruebas con Jasmine, Karma y Cypress para E2E

## 📁 Estructura del Proyecto

```
src/app/
├── components/
│   ├── add-product/          # Componente para agregar productos
│   ├── edit-product/         # Componente para editar productos
│   ├── product-list/         # Lista de productos
│   ├── product-table/        # Tabla con listado de productos
│   ├── side-menu/            # Menú lateral de navegación
│   ├── status/               # Componente de estado
│   ├── layout/               # Diseño base (layouts compartidos)
│   └── loading/              # Indicador de carga
├── features/                 # Funcionalidades agrupadas
├── models/                   # Interfaces y modelos de datos
│   └── product.model.ts
├── pages/                    # Vistas principales
├── pipes/                    # Pipes personalizados
├── services/                 # Servicios reutilizables
│   ├── loading.service.ts
│   └── product.service.ts
cypress/e2e/
├── product-list.cy.ts        # Pruebas E2E para listado de productos
├── add-product.cy.ts          # Pruebas E2E para agregar productos
└── edit-product.cy.ts         # Pruebas E2E para editar productos
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

## 🧪 Ejecutar pruebas unitarias

```bash
ng test
```

## 🧱 Ejecutar pruebas E2E con Cypress

```bash
npm run cypress:open
# o en modo headless:
npm run cypress:run
```

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
- 🧪 Pruebas unitarias y pruebas E2E con Cypress

## 📃 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## 👨‍💼 Autor

Desarrollado por David Varela M  
️✉️ Contacto: davamo@davamo.cl
