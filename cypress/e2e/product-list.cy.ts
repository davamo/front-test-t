describe('Listado de Productos', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200/products');
    });
  
    it('debería mostrar el título de la página y productos disponibles', () => {
      cy.contains('Productos disponibles').should('exist');
      cy.get('.product-card').should('have.length.greaterThan', 0);
    });
  
    it('debería permitir buscar un producto', () => {
      cy.get('input[type="text"]').type('Mock 1');
      cy.get('.product-card').each(($el) => {
        cy.wrap($el).contains('Mock 1');
      });
    });
  
    it('debería limpiar el campo de búsqueda', () => {
      cy.get('input[type="text"]').type('Cualquier texto');
      cy.get('button[aria-label="Limpiar"]').click();
      cy.get('input[type="text"]').should('have.value', '');
    });
  
    it('debería navegar a la vista de agregar producto al hacer clic en el botón flotante', () => {
      cy.get('button[aria-label="Agregar producto"]').click();
      cy.url().should('include', '/products/add');
    });
  
    it('debería tener botones para editar y eliminar productos', () => {
      cy.get('.product-card').first().within(() => {
        cy.get('button[mattooltip="Editar"]').should('exist');
        cy.get('button[mattooltip="Eliminar"]').should('exist');
      });
    });
  });
  