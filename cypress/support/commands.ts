/// <reference types="cypress" />

// Interceptar GET /categories
Cypress.Commands.add('mockCategoriesApi', () => {
    cy.intercept('GET', '**/categories', {
      statusCode: 200,
      body: [
        { id: 1, name: 'Tecnología' },
        { id: 2, name: 'Hogar' },
        { id: 3, name: 'Moda' }
      ]
    }).as('getCategories');
  });
  
  // Interceptar todo lo necesario para productos
  Cypress.Commands.add('mockProductsApi', (options = {}) => {
    const mockProduct = {
      id: 1,
      title: 'Laptop HP',
      description: 'Potente laptop',
      price: 99990,
      images: ['https://example.com/laptop.jpg'],
      category: { id: 1, name: 'Tecnología' }
    };
  
    // GET /products
    cy.intercept('GET', '**/products', {
      statusCode: options.failGet ? 500 : 200,
      body: options.failGet ? {} : [mockProduct]
    }).as('getProducts');
  
    // GET /products/1
    cy.intercept('GET', '**/products/1', {
      statusCode: 200,
      body: mockProduct
    }).as('getProduct');
  
    // PUT /products/1 (update product)
    cy.intercept('PUT', '**/products/1', (req) => {
      if (options.failPut) {
        req.reply({ statusCode: 500 });
      } else {
        req.reply({ statusCode: 200, body: { ...req.body, id: 1 } });
      }
    }).as('updateProduct');
  
    // POST /products (add new product)
    cy.intercept('POST', '**/products', (req) => {
      if (options.failPost) {
        req.reply({ statusCode: 500 });
      } else {
        req.reply({ statusCode: 201, body: { id: 999, ...req.body } });
      }
    }).as('addProduct');
  
    // DELETE /products/1
    cy.intercept('DELETE', '**/products/1', {
      statusCode: options.failDelete ? 500 : 200
    }).as('deleteProduct');
  });
  