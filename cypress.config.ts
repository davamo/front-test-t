import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'mr2qnk',
  e2e: {
    setupNodeEvents(on, config) {
      // Aquí puedes configurar hooks o plugins si los necesitas
    },
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
  },
});
