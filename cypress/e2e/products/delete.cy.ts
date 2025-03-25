/// <reference types="cypress" />

describe('Eliminar Producto', () => {
    beforeEach(() => {
      cy.mockProductsApi(); // ← se asegura de interceptar @getProducts y @deleteProduct
      cy.visit('/products');
      cy.wait('@getProducts');
    });
  
    it('debería eliminar un producto tras confirmación', () => {
      cy.get('[data-cy="delete-button"]').first().click();
  
      cy.get('[data-cy="confirm-dialog"]').should('exist');
      cy.get('[data-cy="confirm-accept"]').click();
  
      cy.wait('@deleteProduct');
  
      cy.get('snack-bar-container, .mat-mdc-snack-bar-container')
        .should('contain', 'Producto eliminado');
    });
  
    it('debería cancelar la eliminación si el usuario no confirma', () => {
      cy.get('[data-cy="delete-button"]').first().click();
  
      cy.get('[data-cy="confirm-dialog"]').should('exist');
      cy.get('[data-cy="confirm-cancel"]').click();
  
      // Esperar un poco para asegurar que no se ejecutó DELETE
      cy.get('@deleteProduct.all').should('have.length', 0);
    });
  
    it('debería mostrar error si falla la eliminación', () => {
      // Configurar el mock ANTES del visit
      cy.mockProductsApi({ failDelete: true });
      cy.visit('/products');
      cy.wait('@getProducts');
  
      cy.get('[data-cy="delete-button"]').first().click();
      cy.get('[data-cy="confirm-accept"]').click();
  
      cy.wait('@deleteProduct');
  
      cy.get('snack-bar-container, .mat-mdc-snack-bar-container')
        .should('contain', 'Error al eliminar el producto');
    });
  });
  