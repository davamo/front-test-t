/// <reference types="cypress" />

describe('Validación del formulario de productos', () => {
    beforeEach(() => {
      cy.mockCategoriesApi(); // Asegúrate de interceptar correctamente
      cy.visit('/products/add'); // También aplica a /edit/ID si lo deseas
      cy.wait('@getCategories');
    });
  
    it('debería mostrar errores si se deja el formulario vacío', () => {
      cy.get('[data-cy="save-button"]').should('be.disabled');
  
      cy.get('[data-cy="input-title"]').focus().blur();
      cy.get('[data-cy="input-price"]').focus().blur();
      cy.get('[data-cy="select-category"]').focus().blur();
  
      cy.get('[data-cy="error-title-required"]').should('be.visible');
      cy.get('[data-cy="error-price-required"]').should('be.visible');
      cy.get('[data-cy="error-category-required"]').should('be.visible');
    });
  
    it('debería mostrar error si el precio es negativo', () => {
      cy.get('[data-cy="input-title"]').type('Producto inválido');
      cy.get('[data-cy="input-price"]').clear().type('-5');
      cy.get('[data-cy="select-category"]').click();
      cy.get('[data-cy="category-option"]').first().click();
  
      cy.get('[data-cy="error-price-min"]').should('be.visible');
      cy.get('[data-cy="save-button"]').should('be.disabled');
    });
  
    it('debería mostrar error si la categoría tiene un valor inválido', () => {
      cy.get('[data-cy="input-title"]').type('Producto sin categoría válida');
      cy.get('[data-cy="input-price"]').clear().type('1000');
      cy.get('[data-cy="select-category"]').click();
  
      // Simula que no selecciona ninguna opción (cierra sin elegir)
      cy.get('body').click(0, 0); // Cierra el dropdown
  
      cy.get('[data-cy="error-category-required"]').should('exist');
      cy.get('[data-cy="save-button"]').should('be.disabled');
    });
  });
  