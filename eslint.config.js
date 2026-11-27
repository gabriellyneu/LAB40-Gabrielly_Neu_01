module.exports = [
    {
        ignores: ['node_modules/', 'coverage/']
    },
    {
        files: ['src/**/*.js', 'test/**/*.js', 'scripts/**/*.js', 'eslint.config.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'commonjs',
            globals: {
                require: 'readonly',
                module: 'writable',
                exports: 'writable',
                process: 'readonly',
                console: 'readonly',
                setTimeout: 'readonly',
                fetch: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                URL: 'readonly',
                Buffer: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': 'error',
            'no-undef': 'error',
            'prefer-const': 'error',
            eqeqeq: 'error'
        }
    },
    {
        files: ['public/**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'script',
            globals: { document: 'readonly', window: 'readonly', fetch: 'readonly', console: 'readonly' }
        },
        rules: {
            'no-unused-vars': 'error',
            'no-undef': 'error',
            'prefer-const': 'error',
            eqeqeq: 'error'
        }
    }
];