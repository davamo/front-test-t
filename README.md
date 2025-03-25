# 📘 Angular Product Management App

Sistema de gestión de productos construido con **Angular 18**, **Angular Material**, **Reactive Forms**, y **Cypress** para pruebas E2E.

---

## 📦 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── add-product/
│   │   ├── edit-product/
│   │   ├── product-list/
│   │   ├── product-card/
│   │   └── confirm-dialog/
│   ├── services/
│   ├── models/
│   └── features/
```

---

## 🚀 Funcionalidades

- Agregar productos con validación.
- Editar productos existentes.
- Eliminar productos con confirmación.
- Filtro de búsqueda y paginación.
- Categorías cargadas desde API simulada.
- UI moderna con Angular Material.
- Pruebas unitarias y E2E completas.

---

## 🧪 Pruebas Automatizadas

| Tipo      | Herramienta | Ubicación                      |
| --------- | ----------- | ------------------------------ |
| Unitarias | Jasmine     | `*.spec.ts` en cada componente |
| E2E       | Cypress     | `cypress/e2e/products/*.cy.ts` |

### Comandos Cypress

```bash
npx cypress open      # UI interactiva
npx cypress run       # Headless (CI)
```

---

## ⚒️ Instalación y Setup

### Requisitos:

- Node.js 18+
- Angular CLI 17+
- Cypress (instalado con `npm i`)

### Instrucciones:

```bash
git clone https://github.com/tu-usuario/front-test-t.git
cd front-test-t
npm install
ng serve
```

Navega a [http://localhost:4200](http://localhost:4200)

---

## 📩 Comandos Útiles

| Acción                     | Comando            |
| -------------------------- | ------------------ |
| Ejecutar app               | `ng serve`         |
| Ejecutar pruebas unitarias | `ng test`          |
| Ejecutar pruebas E2E       | `npx cypress open` |
| Lint                       | `ng lint`          |

---

## 🔩 Accesibilidad para Cypress

Todos los campos, botones e íconos relevantes usan `data-cy`, por ejemplo:

```html
<input data-cy="input-title" />
<button data-cy="save-button">Guardar</button>
```

---

## 📁 Modo Mock / LocalStorage

- Si la API falla, el sistema carga productos desde `localStorage`.
- Puedes limpiar los datos con `localStorage.clear()` o desde el `ProductService`.

---

## 📈 Próximas Mejores Propuestas

- Autenticación con `AuthGuard`.
- Reemplazar API mock por Firebase o NestJS real.
- Añadir internationalización (`i18n`).
- Mejorar la cobertura de test (`coverage report`).
- Soporte para despliegue CI/CD.

---

## 👨‍💼 Desarrollador

> Proyecto desarrollado por [davamo](https://github.com/davamo)

---

## 📝 Licencia

MIT License

for davamo

email: [davamo@davamo.cl](mailto\:davamo@davamo.cl)

[https://davamo.cl/](https://davamo.cl/)
