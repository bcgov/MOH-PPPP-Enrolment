import { defineConfig } from "cypress";
// import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    baseUrl: "http://172.25.129.209:5173/ahdc/",
    experimentalRunAllSpecs: true,
    testIsolation: true, //to prevent Cypress errors
    experimentalSessionAndOrigin: true,
    // setupNodeEvents(on) {
    //   on('file:preprocessor', vitePreprocessor())
    // },
  },
});
