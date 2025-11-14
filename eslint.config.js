import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      react,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      //'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      //
      // --- Qualité JS (niveau medium) ---
      //
      eqeqeq: ['error', 'always'],                         // → Oblige à utiliser === et !== au lieu de == et !=
      'no-var': 'error',                                   // Interdit l’utilisation de var
      'prefer-const': ['error', { destructuring: 'all' }], // favorise const
      'no-debugger': 'error',                              //Interdit debugger; dans le code
      'no-console': ['warn', { allow: ['warn', 'error'] }],//→ Les console.log deviennent des warnings.

      //
      // --- Variables ---
      //
      'no-unused-vars': [
        'warn',
          //Variables inutilisées = warning
        {
          varsIgnorePattern: '^[A-Z_]',  //Ignore les variables MAJUSCULES (souvent des constantes)
          argsIgnorePattern: '^_',      // autorise les args inutilisés qui commencent par _
        },
      ],

      //
      // --- React ---
      //
      'react/react-in-jsx-scope': 'off',                  // plus besoin d'importer react (avec React 17+ inutile)
      'react/prop-types': 'off',                          // je peux le remettre en "warn" si j'utilise PropTypes
      'react/jsx-boolean-value': ['error', 'never'],      // <Composant disabled /> au lieu de disabled={true}
      'react/jsx-key': 'error',                           // key obligatoire dans les listes
      'react/no-array-index-key': 'warn',                 // évite les bugs de key
      'react/jsx-no-useless-fragment': 'warn',            // Les fragments inutiles sont des <></> qui ne servent à rien.

      //
      // --- Hooks ---
      //
      'react-hooks/rules-of-hooks': 'error', //les regles les plus  importantes dans react: interdit d'appeler un hook dans une boucle, d’appeler un hook dans un if, d’appeler un hook dans une fonction qui n’est pas un component
      'react-hooks/exhaustive-deps': 'warn', //Vérifie que les dépendances de ton useEffect sont correctes.

      //
      // --- Vite / HMR ---
      //
      'react-refresh/only-export-components': [ //“N’exporte que des composants React depuis un fichier contenant des JSX.”
        'warn',
        { allowConstantExport: true },
      ],

      // --- Import Order ---
      'import/order': [ //Impose un ordre logique des imports : 1-builtin (ex: fs, path, natif Node), 2-external (ex: react, axios, mui), 3-internal (chemins absolus type src/...), 4-parent, 5-sibling, 6-index
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
])
