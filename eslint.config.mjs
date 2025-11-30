import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
    ...nextCoreWebVitals,
    ...nextTypescript,
    // Add your custom rules or overrides here
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            // Example: Turn off the rule for explicit function return types
            '@typescript-eslint/no-explicit-any': 'warn'
        }
    },
    prettier,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts'
    ])
]);
