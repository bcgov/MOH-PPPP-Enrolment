// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   defaultCommandTimeout: 40000,
//   fixturesFolder: "tests/e2e/fixtures",
//   screenshotsFolder: "tests/e2e/screenshots",
//   videosFolder: "tests/e2e/videos",
//   e2e: {
//     // We've imported your old cypress plugins here.
//     // You may want to clean this up later by importing these.
//     experimentalRunAllSpecs: true,
//     setupNodeEvents(on, config) {
//       return require("./tests/e2e/plugins/index.js")(on, config);
//     },
//     specPattern: "tests/e2e/specs/**/*.cy.{js,jsx,ts,tsx}",
//     supportFile: "tests/e2e/support/index.js",
//   },

//   component: {
//     devServer: {
//       framework: "vue-cli",
//       bundler: "webpack",
//     },
//   },
// });

import { defineConfig } from "cypress";
// import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    baseUrl: "http://172.25.129.209:5173/ahdc/",
    experimentalRunAllSpecs: true,
    testIsolation: "on", //to prevent Cypress errors
    experimentalSessionAndOrigin: true,
    // setupNodeEvents(on) {
    //   on('file:preprocessor', vitePreprocessor())
    // },
  },
});
