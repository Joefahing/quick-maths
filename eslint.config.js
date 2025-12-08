import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		plugins: {
			'simple-import-sort': simpleImportSort
		},
		rules: {
			// ✅ import sorting rule
			'simple-import-sort/imports': [
				'warn',
				{
					groups: [
						['^react-router-dom$'], // react-router-dom first
						['^react$', '^@?\\w'], // then react + 3rd party libs
						['^\\u0000'], // side-effect imports (CSS, polyfills)
						['^@/(.*)$'], // aliased imports (if used)
						['^\\.\\.(?!/?$)', '^\\.\\./?$'], // parent imports
						['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // same-folder
						['^.+\\.s?css$'] // style imports last
					]
				}
			]
		}
	}
]);
