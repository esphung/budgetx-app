module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off'
  },
  'globals': {
    "fetch": false
  },
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/no-extraneous-dependencies": ["error", {"devDependencies": false}],
    "import/no-unresolved": "off"
  }
}