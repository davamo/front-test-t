/// <reference types="cypress" />

describe('Formulario Editar Producto', () => {
    beforeEach(() => {
        cy.mockCategoriesApi();
        cy.mockProductsApi(); // o cy.mockProductsApi({ failPut: true })
        cy.visit('/products/edit/1');
        cy.wait('@getCategories');
        cy.wait('@getProduct');
      });
      
  
    it('debería mostrar los datos del producto cargado', () => {
      cy.get('[data-cy="input-title"]').should('have.value', 'Laptop HP');
      cy.get('[data-cy="input-price"]').should('have.value', '99990');
      cy.get('[data-cy="input-description"]').should('contain.value', 'Potente laptop');
      cy.get('[data-cy="select-category"]').should('contain.text', 'Tecnología');
    });
  
    it('debería editar y guardar el producto correctamente', () => {
      cy.get('[data-cy="input-title"]').clear().type('Laptop Pro Max');
      cy.get('[data-cy="input-price"]').clear().type('149990');
      cy.get('[data-cy="input-description"]').clear().type('Modelo actualizado');
  
      cy.get('[data-cy="input-image-0"]').clear().type('https://example.com/laptop-nueva.jpg');
  
      cy.get('[data-cy="save-button"]').should('not.be.disabled').click();
      cy.wait('@updateProduct');
  
      cy.url().should('include', '/products');
      cy.get('snack-bar-container, .mat-mdc-snack-bar-container')
        .should('contain', 'Producto actualizado con éxito');
    });
  
    it('debería agregar y eliminar una imagen', () => {
      cy.get('[data-cy="add-image"]').click();
      cy.get('[data-cy="input-image-1"]').type('https://example.com/nueva-imagen.jpg');
      cy.get('[data-cy="delete-image-1"]').click();
      cy.get('[data-cy="input-image-1"]').should('not.exist');
    });
  
    it('debería mostrar errores si se dejan campos vacíos', () => {
      cy.get('[data-cy="input-title"]').clear().focus().blur();
      cy.get('[data-cy="input-price"]').clear().focus().blur();
  
      cy.get('[data-cy="error-title-required"]').should('be.visible');
      cy.get('[data-cy="error-price-required"]').should('be.visible');
  
      cy.get('[data-cy="save-button"]').should('be.disabled');
    });
  
    it('debería mostrar error si falla la actualización', () => {
      cy.mockProductsApi({ failPut: true }); // ⚠️ Reconfigura mocks antes de visitar
      cy.visit('/products/edit/1');
      cy.wait('@getProduct');
      cy.wait('@getCategories');
  
      cy.get('[data-cy="input-title"]').clear().type('Producto Falla');
      cy.get('[data-cy="save-button"]').click();
      cy.wait('@updateProduct');
  
      cy.get('snack-bar-container, .mat-mdc-snack-bar-container')
        .should('contain', 'Error al actualizar el producto');
    });
  
    it('debería cancelar la edición y volver a la lista', () => {
      cy.get('[data-cy="cancel-button"]').click();
      cy.url().should('include', '/products');
    });
  });
  