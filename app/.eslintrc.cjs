module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    'cypress/globals': true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:testing-library/react'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'cypress'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': [0],
    'testing-library/no-debugging-utils': [
      'error',
      {
        utilsToCheckFor: {
          debug: false,
          logRoles: true,
          logDOM: true
        }
      }
    ]
  }
}
