describe('Editar Producto', () => {
    beforeEach(() => {
      // Ajusta el ID según tu configuración o mocks
      cy.visit('http://localhost:4200/products/edit/1');
    });
  
    it('debería mostrar el formulario de edición con los datos cargados', () => {
      cy.contains('Editar Producto').should('exist');
  
      // Validar que los campos obligatorios tienen valores
      cy.get('input[formcontrolname="name"]').invoke('val').should('not.be.empty');
      cy.get('input[formcontrolname="title"]').invoke('val').should('not.be.empty');
      cy.get('textarea[formcontrolname="description"]').invoke('val').should('not.be.empty');
      cy.get('input[formcontrolname="category"]').invoke('val').should('not.be.empty');
      cy.get('input[formcontrolname="price"]').invoke('val').should('not.be.empty');
  
      // Validar que el campo opcional de imagen existe, sin forzar valor
      cy.get('input[formcontrolname="images"]').should('exist');
    });
  
    it('debería permitir modificar y guardar los cambios del producto', () => {
      cy.get('input[formcontrolname="name"]').clear().type('Producto Actualizado Cypress');
      cy.get('input[formcontrolname="title"]').clear().type('Nuevo Título Cypress');
      cy.get('textarea[formcontrolname="description"]')
        .clear()
        .type('Descripción actualizada desde test E2E');
      cy.get('input[formcontrolname="category"]').clear().type('Accesorios');
      cy.get('input[formcontrolname="price"]').clear().type('7490');
      cy.get('input[formcontrolname="images"]').clear().type('https://via.placeholder.com/actualizado');
  
      // Enviar el formulario
      cy.get('button[type="submit"]').click();
  
      // Verificar redirección y existencia del producto actualizado
      cy.url().should('include', '/products');
      cy.contains('Producto Actualizado Cypress').should('exist');
    });
  });
  