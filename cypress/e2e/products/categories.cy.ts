/// <reference types="cypress" />

describe('Categorías en formularios', () => {
  beforeEach(() => {
    cy.mockCategoriesApi(); // ← asegúrate de tener este comando configurado
    cy.visit('/products/add'); // o `/products/edit/1` para editar
    cy.wait('@getCategories');
  });

  it('debería cargar y mostrar las categorías en el select', () => {
    cy.get('[data-cy="select-category"]').click();
    cy.get('[data-cy="category-option"]').should('have.length.greaterThan', 0);
  });

  it('debería seleccionar una categoría correctamente', () => {
    cy.get('[data-cy="select-category"]').click();
    cy.get('[data-cy="category-option"]').contains('Tecnología').click();
    cy.get('[data-cy="select-category"]').should('contain.text', 'Tecnología');
  });

  it('debería mostrar error si no se selecciona una categoría', () => {
    cy.get('[data-cy="save-button"]').click();
    cy.get('[data-cy="error-category-required"]').should('be.visible');
  });

  it('debería mostrar error si falla la carga de categorías', () => {
    cy.intercept('GET', '**/categories', { statusCode: 500 }).as('getCategoriesFail');
    cy.visit('/products/add');
    cy.wait('@getCategoriesFail');

    cy.get('snack-bar-container, .mat-mdc-snack-bar-container')
      .should('contain', 'Error al obtener las categorías');
  });
});
