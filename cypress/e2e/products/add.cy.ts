/// <reference types="cypress" />

describe('Agregar Producto', () => {
    beforeEach(() => {
      cy.mockCategoriesApi();
      cy.mockProductsApi();
      cy.visit('/products/add');
      cy.wait('@getCategories');
    });
  
    it('debería cargar el formulario', () => {
      cy.get('[data-cy="add-product-form"]').should('exist');
      cy.get('[data-cy="input-title"]').should('exist');
      cy.get('[data-cy="input-price"]').should('exist');
      cy.get('[data-cy="input-description"]').should('exist');
      cy.get('[data-cy="select-category"]').should('exist');
      cy.get('[data-cy="save-button"]').should('be.disabled');
    });
  
    it('debería completar y enviar el formulario correctamente', () => {
      cy.get('[data-cy="input-title"]').type('Mouse Gamer');
      cy.get('[data-cy="input-price"]').clear().type('29990');
      cy.get('[data-cy="input-description"]').type('Mouse con RGB y alta precisión');
  
      cy.get('[data-cy="select-category"]').click();
      cy.get('[data-cy="category-option"]').contains('Tecnología').click();
  
      cy.get('[data-cy="add-image"]').click();
      cy.get('[data-cy="image-array"] input').first().type('https://example.com/mouse.jpg');
  
      cy.get('[data-cy="save-button"]').should('not.be.disabled').click();
  
      cy.wait('@addProduct');
      cy.url().should('include', '/products');
      cy.get('snack-bar-container, .mat-mdc-snack-bar-container')
        .should('contain', 'Producto agregado con éxito');
    });
  
    it('debería mostrar errores si se intenta guardar sin completar el formulario', () => {
      // Forzar touched con blur
      cy.get('[data-cy="input-title"]').focus().blur();
      cy.get('[data-cy="input-price"]').focus().blur();
      cy.get('[data-cy="select-category"]').click();
      cy.get('body').click(0, 0); // cerrar select
  
      cy.get('[data-cy="save-button"]').click();
  
      cy.get('[data-cy="error-title-required"]').should('be.visible');
      cy.get('[data-cy="error-price-required"]').should('be.visible');
      cy.get('[data-cy="error-category-required"]').should('be.visible');
    });
  
    it('debería mostrar error si la categoría no existe', () => {
      cy.get('[data-cy="input-title"]').type('Producto sin categoría');
      cy.get('[data-cy="input-price"]').type('1000');
      cy.get('[data-cy="input-description"]').type('No seleccioné categoría');
  
      // Simula cerrar el select sin elegir categoría
      cy.get('[data-cy="select-category"]').click();
      cy.get('body').click(0, 0);
  
      cy.get('[data-cy="save-button"]').should('be.disabled');
      cy.get('[data-cy="error-category-required"]').should('exist');
    });
  
    it('debería mostrar error si la API falla al guardar', () => {
      // Reiniciar mocks para esta prueba con error
      cy.mockProductsApi({ failPost: true });
      cy.mockCategoriesApi();
      cy.visit('/products/add');
      cy.wait('@getCategories');
  
      cy.get('[data-cy="input-title"]').type('Producto fallido');
      cy.get('[data-cy="input-price"]').type('12000');
      cy.get('[data-cy="input-description"]').type('Prueba de error al guardar');
  
      cy.get('[data-cy="select-category"]').click();
      cy.get('[data-cy="category-option"]').first().click();
  
      cy.get('[data-cy="save-button"]').click();
      cy.wait('@addProduct');
  
      cy.get('snack-bar-container, .mat-mdc-snack-bar-container')
        .should('contain', 'Error al agregar el producto');
    });
  
    it('debería cancelar y volver a la lista', () => {
      cy.get('[data-cy="cancel-button"]').click();
      cy.url().should('include', '/products');
    });
  });
  