# ESLint 9 Flat Config Setup

## Overview
ESLint 9 introduces a new "flat config" system (`eslint.config.js`) that replaces the legacy `.eslintrc.*` files. This new configuration format is simpler, more intuitive, and provides better IDE support.

## Key Changes in ESLint 9

### Migration from eslintrc to Flat Config
- **New Config File**: `eslint.config.js` (or `.mjs`, `.cjs`)
- **No More**: `.eslintrc.js`, `.eslintrc.json`, `.eslintrc.yml`
- **Simpler Structure**: Array-based configuration
- **Better TypeScript Support**: First-class TypeScript integration
- **No `extends`**: Configurations are directly imported and spread

## Installation

```bash
npm install eslint@latest --save-dev
npm install globals @eslint/js typescript-eslint --save-dev
```

### Dependencies Explained
- **eslint**: Core linting engine (v9.x)
- **@eslint/js**: Official ESLint JavaScript configurations
- **typescript-eslint**: TypeScript linting for ESLint 9
- **globals**: Predefined global variables for different environments

## Flat Config Structure

### Basic Setup
```javascript
// eslint.config.js
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const globals = require('globals');

module.exports = tseslint.config(
  // Recommended JavaScript rules
  js.configs.recommended,
  
  // Recommended TypeScript rules
  ...tseslint.configs.recommended,
  
  // Custom configuration
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      // Your custom rules
    },
  },
  
  // Ignore patterns
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
  },
);
```

## Key Concepts

### 1. Configuration Objects
Each object in the array is a configuration:

```javascript
module.exports = [
  {
    files: ['**/*.js', '**/*.ts'],
    rules: { /* rules */ },
  },
  {
    files: ['**/*.test.js'],
    rules: { /* test-specific rules */ },
  },
];
```

### 2. Language Options
Configure parser and globals:

```javascript
{
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
}
```

### 3. Ignoring Files
Use the `ignores` property:

```javascript
{
  ignores: [
    'node_modules/**',
    'dist/**',
    'build/**',
    '*.config.js',
  ],
}
```

### 4. Importing Configs
No more `extends`; directly import and spread:

```javascript
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
];
```

## React Native Specific Setup

```javascript
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const globals = require('globals');

module.exports = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {argsIgnorePattern: '^_'},
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'android/**',
      'ios/**',
      '.expo/**',
      'dist/**',
      'build/**',
      '*.config.js',
    ],
  },
);
```

## Common Patterns

### File-Specific Configurations
```javascript
{
  files: ['**/*.test.ts', '**/*.test.tsx'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
```

### Custom Rules
```javascript
{
  rules: {
    'no-console': 'warn',
    'prefer-const': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
  },
}
```

### Multiple Configurations
```javascript
module.exports = [
  // Global config
  {
    files: ['**/*.{js,ts,tsx}'],
    rules: { /* ... */ },
  },
  
  // Test files
  {
    files: ['**/*.test.{js,ts}'],
    rules: { /* ... */ },
  },
  
  // Config files
  {
    files: ['*.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
];
```

## Migration from eslintrc

### Before (eslintrc)
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: { /* ... */ },
};
```

### After (Flat Config)
```javascript
// eslint.config.js
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: { /* ... */ },
  },
];
```

## Running ESLint

### Via npm Script
```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### Command Line
```bash
npx eslint .
npx eslint . --fix
npx eslint src/**/*.ts
```

## Advantages of Flat Config

1. **Simpler**: Easier to understand and configure
2. **Type Safe**: Better TypeScript support
3. **Composable**: Easy to merge and compose configurations
4. **Explicit**: No hidden configuration magic
5. **Performance**: Faster config resolution
6. **IDE Support**: Better editor integration

## Best Practices

1. **Start Simple**: Begin with recommended configs
2. **Incremental**: Add rules gradually
3. **Document**: Comment complex rules
4. **Consistent**: Keep configurations consistent across projects
5. **Version Control**: Commit config files

## Troubleshooting

### Config Not Found
Ensure file is named `eslint.config.js` (not `.eslintrc.js`)

### Module Not Found
Install required dependencies:
```bash
npm install @eslint/js typescript-eslint globals --save-dev
```

### Peer Dependency Warnings
These are warnings about plugins expecting older ESLint versions. They usually work fine with ESLint 9.

## Resources
- [ESLint Flat Config Docs](https://eslint.org/docs/latest/use/configure/)
- [Migration Guide](https://eslint.org/docs/latest/use/configure/migration-guide)
- [typescript-eslint](https://typescript-eslint.io/)

## Version Info
- ESLint: 9.39.2+
- typescript-eslint: Latest
- Node.js: 18.x or higher required
