module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'prettier',
    ],
    plugins: ['react-hooks'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        quotes: ['error', 'single'],
        'no-unused-labels': ['error'],
        'no-unused-vars': ['error'],
        'consistent-return': ['error'],
        'no-fallthrough': ['error'],
        'import/order': 0,
        '@typescript-eslint/explicit-member-accessibility': ['error'],
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
        '@typescript-eslint/member-ordering': ['error'],
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 1,
        '@typescript-eslint/ban-ts-ignore': 0, // TODO убрать правило
        '@typescript-eslint/no-inferrable-types': 0, // because this rule conflicts with typedef rule
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
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

        'import/prefer-default-export': 0,
        'import/extensions': 0,
        eqeqeq: ['error', 'always'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'max-len': [1, 120, { ignorePattern: '^import\\W.*' }],
        'react/prop-types': 0,
        'react/display-name': 0,
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
        'react/jsx-props-no-spreading': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-wrap-multilines': 1,
        semi: [2, 'always'],
        'object-curly-spacing': [2, 'always'],
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: ['const', 'let'], next: '*' },
            { blankLine: 'always', prev: '*', next: ['const', 'let'] },
            {
                blankLine: 'any',
                prev: ['const', 'let'],
                next: ['const', 'let'],
            },
            { blankLine: 'always', prev: 'directive', next: '*' },
            { blankLine: 'any', prev: 'directive', next: 'directive' },
            { blankLine: 'always', prev: '*', next: 'return' },
            { blankLine: 'always', prev: '*', next: 'break' },
            { blankLine: 'always', prev: '*', next: 'switch' },
            { blankLine: 'always', prev: 'switch', next: '*' },
            { blankLine: 'always', prev: '*', next: 'try' },
            { blankLine: 'always', prev: 'try', next: '*' },
            { blankLine: 'always', prev: 'while', next: '*' },
            { blankLine: 'always', prev: '*', next: 'while' },
            { blankLine: 'always', prev: '*', next: 'if' },
            { blankLine: 'always', prev: 'if', next: '*' },
            { blankLine: 'always', prev: '*', next: 'for' },
            { blankLine: 'always', prev: 'for', next: '*' },
            { blankLine: 'always', prev: '*', next: 'function' },
            { blankLine: 'always', prev: 'function', next: '*' },
            { blankLine: 'always', prev: '*', next: 'export' },
            { blankLine: 'always', prev: 'export', next: '*' },
            { blankLine: 'always', prev: '*', next: 'class' },
            { blankLine: 'always', prev: 'class', next: '*' },
            { blankLine: 'never', prev: 'expression', next: 'expression' },
            { blankLine: 'never', prev: 'expression', next: 'expression' },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src/app'],
                extensions: ['.ts', '.tsx', '.d.ts'],
            },
        },
        react: {
            version: 'detect',
        },
    },
    env: {
        browser: true,
    },
};
