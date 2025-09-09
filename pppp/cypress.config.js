import { defineConfig } from "cypress";
// import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    testIsolation: true, //to prevent Cypress errors
    // setupNodeEvents(on) {
    //   on('file:preprocessor', vitePreprocessor())
    // },
  },
});
