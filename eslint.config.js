export default [
    {
      files: ["**/*.js"],
      languageOptions: {
        ecmaVersion: 2015,
        sourceType: "module",
        globals: {
          browser: true,  // Dla środowiska przeglądarki
          node: true,     // Dla środowiska Node.js
        },
      },
      rules: {
        indent: ["error", 2], // Wymuszanie wcięcia na 2 spacje
        "linebreak-style": ["off"], // Wyłączanie wymogu stylu linii
        quotes: ["error", "single", { allowTemplateLiterals: true }], // Preferowanie pojedynczych cudzysłowów
        semi: ["error", "always"], // Wymuszanie średników
        "no-console": "off", // Wyłączanie ostrzeżeń dla console.log
        "no-prototype-builtins": "off", // Wyłączanie ostrzeżeń dla prototypów
      },
    },
  ];
