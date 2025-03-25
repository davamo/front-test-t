/// <reference types="cypress" />

describe('Lista de Productos', () => {
    beforeEach(() => {
      cy.mockProductsApi(); // Crea @getProducts y productos mock
      cy.visit('/products');
      cy.wait('@getProducts');
    });
  
    it('debería filtrar productos por término de búsqueda', () => {
      cy.get('[data-cy="search-input"]').type('Laptop');
      cy.get('[data-cy="product-card"]').should('exist');
  
      cy.get('[data-cy="product-card"]').each(($card) => {
        cy.wrap($card).should('contain.text', 'Laptop');
      });
    });
  
    it('debería limpiar el filtro de búsqueda', () => {
      cy.get('[data-cy="search-input"]').type('Cámara');
      cy.get('[data-cy="clear-search-button"]').click();
      cy.get('[data-cy="search-input"]').should('have.value', '');
    });
  
    it('debería navegar a agregar producto', () => {
      cy.get('[data-cy="add-product-button"]').click();
      cy.url().should('include', '/products/add');
    });
  
    it('debería navegar a editar producto', () => {
      cy.get('[data-cy="product-card"]').first().within(() => {
        cy.get('[data-cy="edit-button"]').click();
      });
      cy.url().should('include', '/products/edit');
    });
  
    it('debería confirmar y eliminar un producto', () => {
      cy.get('[data-cy="product-card"]').first().within(() => {
        cy.get('[data-cy="delete-button"]').click();
      });
  
      // Confirmación
      cy.get('[data-cy="confirm-dialog"]').should('exist');
      cy.get('[data-cy="confirm-accept"]').click();
  
      cy.wait('@deleteProduct');
  
      cy.get('snack-bar-container, .mat-mdc-snack-bar-container')
        .should('contain', 'Producto eliminado');
    });
  
    it('debería mostrar error si no se pueden cargar productos', () => {
      // Reemplazar intercepto original con uno que falle
      cy.intercept('GET', '**/products', {
        statusCode: 500,
        body: {}
      }).as('getProductsFail');
  
      cy.visit('/products');
      cy.wait('@getProductsFail');
  
      cy.get('[data-cy="error-message"]')
        .should('exist')
        .and('contain', 'No se pudieron cargar los productos');
    });
  });
  