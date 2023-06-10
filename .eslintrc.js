module.exports = {
    plugins: ['import', 'react-hooks', 'promise'],
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:promise/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        project: ['./tsconfig.json'],
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
        'import/resolver': {
            node: {
                paths: ['src'],
            },
        },
    },
    rules: {
        'react/display-name': 'error',
        'no-console':
            process.env.NODE_ENV === 'production'
                ? ['error', { allow: ['warn', 'error'] }]
                : ['warn', { allow: ['warn', 'error'] }],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any':
            process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'promise/always-return': 'off',
        'promise/catch-or-return': 'off',
        'promise/no-nesting': 'error',
        'promise/no-callback-in-promise': 'error',
        'no-extra-boolean-cast': 'error',
        'no-useless-return': 'error',
        curly: ['error', 'all'],
        'newline-before-return': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-unused-vars': 'error',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['off'],
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        'linebreak-style': ['error', 'unix'],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                pathGroups: [
                    {
                        pattern: 'react*',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: 'react*/**',
                        group: 'external',
                        position: 'before',
                    },
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: false,
                },
                'newlines-between': 'always',
            },
        ],
        'react/prop-types': 'error',
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        'react/self-closing-comp': [
            'error',
            {
                component: true,
                html: true,
            },
        ],
        'react/no-unused-prop-types': 'error',
        'prefer-template': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: true,
                },
            },
        ],
        'prettier/prettier': [
            2,
            {
                semi: true,
                trailingComma: 'all',
                singleQuote: true,
                printWidth: 100,
                tabWidth: 4,
            },
        ],
    },
};
