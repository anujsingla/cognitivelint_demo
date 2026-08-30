/** @type {import('@cognitivelint/core').Config} */
export default {
  include: ['src/**/*.tsx'],
  exclude: ['**/node_modules/**', '**/*.test.*'],
  minScore: 0,
  rules: {
    // Keep off for demo — enable to show modal-nesting findings
    'error-prevention/modal-nesting': 'off',
  },
};
