const path = require('path');

module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "react",
        "react-hooks",
        "@typescript-eslint"
    ],
    "extends": [
        "plugin:react/recommended",  // Uses the recommended rules from @eslint-plugin-react
        "plugin:@typescript-eslint/recommended",  // Uses the recommended rules from @typescript-eslint/eslint-plugin
    ],
    "parserOptions": {
        "project": path.resolve(__dirname, './tsconfig.json'),
        "tsconfigRootDir": __dirname,
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "settings": {
        "react": {
            "version": "detect",  // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    },
    "rules": {
        "max-len": ["error", 160],
        "keyword-spacing": ["warn"],
        "comma-dangle": ["warn", "never"],
        "no-trailing-spaces": ["warn", { "ignoreComments": true, "skipBlankLines": true }],
        "no-multiple-empty-lines": ["warn", { "max": 1, "maxEOF": 1 }],
        "no-var": "error",
        "prefer-const": "error",
        "semi": ["warn", "always", { "omitLastInOneLineBlock": true }],
        "object-curly-spacing": ["warn", "always"],
        "array-bracket-spacing": ["warn", "never"],
        "no-console": "warn",
        "react/no-children-prop": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "react/no-unescaped-entities": "off",
        "react/display-name": "off",
        "react/prop-types": "off",
        "react/jsx-no-target-blank": "off",
        "react/no-find-dom-node": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "react/no-string-refs": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-object-literal-type-assertion": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
    },
    "globals": {
        "require": false,
        "define": false,
        "_": false,
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "jQuery": false,
        "$": false,
        "__DEV__": false,
    },
};
