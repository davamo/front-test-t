describe('Agregar Producto', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200/products/add');
    });
  
    it('debería mostrar el formulario de agregar producto', () => {
      cy.contains('Agregar Producto').should('exist');
    });
  
    it('debería permitir completar y enviar el formulario', () => {
      cy.get('input[formcontrolname="name"]').type('Producto Cypress');
      cy.get('input[formcontrolname="title"]').type('Título de prueba');
      cy.get('textarea[formcontrolname="description"]').type('Este es un producto creado desde un test E2E');
      cy.get('input[formcontrolname="category"]').type('Tecnología');
      cy.get('input[formcontrolname="price"]').type('999');
      cy.get('input[formcontrolname="images"]').type('https://via.placeholder.com/150');
  
      cy.get('button[type="submit"]').click();
  
      // Ajusta esto si rediriges a otra ruta después del submit
      cy.url().should('include', '/products');
      cy.contains('Producto Cypress').should('exist');
    });
  });
  