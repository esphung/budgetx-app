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
    "fetch": true
  },
  "plugins": [
    // ...
    "react-hooks"
  ],
  // "rules": {
  //   // ...
  //   "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  //   "react-hooks/rules-of-hooks": "error",
  //   "react-hooks/exhaustive-deps": "warn",
  //   "import/no-extraneous-dependencies": ["error", {"devDependencies": false}],
  //   "import/no-unresolved": "off",
  //   "import/extensions": 0,
  //   "no-underscore-dangle": ["error", { "allow": ["current", "_root"] }]
  // }
    // "rules": {
    //     "react-hooks/rules-of-hooks": "error",
    //     "react-hooks/exhaustive-deps": "warn",
    //     "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    // }
}