export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        browser: true, // Zmienna globalna dla środowiska przeglądarki
        node: true, // Zmienna globalna dla środowiska Node.js
        es6: true // Ustawienie dla ES6
      }
    },
    rules: {
      "semi": ["error", "always"], // Wymusza średniki
      "quotes": ["error", "double"], // Wymusza podwójne cudzysłowy
      "no-var": "error", // Blokuje użycie var
      "prefer-const": "error", // Zaleca używanie const
      "eqeqeq": ["error", "always"], // Wymusza użycie ===
      "curly": ["error", "all"], // Wymusza używanie klamr
      "no-unused-vars": "warn", // Ostrzeżenie dla nieużywanych zmiennych
      "no-console": "off" // Możesz wyłączyć ostrzeżenie dla console.log
    }
  }
];



