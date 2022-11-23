module.exports = {
    env: {
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-recommended",
        "prettier",
    ],
    parserOptions: {
        parser: "@typescript-eslint/parser",
    },
    rules: {
        // override/add rules settings here, such as:
        "vue/multi-word-component-names": "off",
    },
};
