module.exports = {
  extends: [
    require.resolve('@umijs/fabric/dist/eslint'),
    'plugin:prettier/recommended',
  ],
  globals: {
    NODE_IS_DEV: 'readonly',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'consistent-return': 0,
    'no-new': 0,
    'no-nested-ternary': 0,
    'no-case-declarations': 0,
    'react/no-array-index-key': 0,
    'react-hooks/exhaustive-deps': 0,
  },
};
