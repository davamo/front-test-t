declare namespace Cypress {
    interface Chainable {
      /**
       * Mocks de API de productos con opción de simular errores.
       * @param options Opciones para forzar errores
       */
      mockProductsApi(options?: {
        failGet?: boolean;
        failPost?: boolean;
        failPut?: boolean;
        failDelete?: boolean;
      }): void;
    }
  }
  