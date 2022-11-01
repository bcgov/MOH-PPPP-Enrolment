module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ["node_modules/(?!vuelidate)/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!src/main.js", // No need to cover bootstrap file
    "!src/constants/*", // Entirely constant exports
    "!src/settings.js", // Entirely constant exports
    "!src/store/states/*", // Entirely constant exports
    "!src/store/index.js", // Entirely constant exports
    "!src/locale/strings.en.js", // Entirely constant exports
    "!src/helpers/form-helpers.js", // Entirely constant exports
    "!src/helpers/user-agent.js", // Not really reasonable/possible to test in unit tests
  ],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/file-mock.js",
    "\\.(css|less)$": "<rootDir>/tests/__mocks__/styleMock.js",
  },
}
