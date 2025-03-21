import globals from 'globals';
import pluginJs from '@eslint/js';
import dicodingAcademyConfig from 'eslint-config-dicodingacademy';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.browser,
        ...globals.node, // Tambahkan globals Node.js agar `process` dikenali
      },
    },
  },
  pluginJs.configs.recommended,
  dicodingAcademyConfig, // Menambahkan konfigurasi Dicoding Academy langsung
];
