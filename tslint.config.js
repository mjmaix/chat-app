module.exports = {
  extends: [
    'tslint:recommended',
    'tslint-react',
    'tslint-config-prettier',
    'tslint-react-hooks',
    'tslint-etc',
  ],
  jsRules: {
    'no-empty': true,
  },
  rules: {
    'interface-name': false,
    'jsx-boolean-value': false,
    'jsx-no-lambda': false,
    'member-ordering': false,
    'no-angle-bracket-type-assertion': false,
    'no-unused-declaration': {
      // tslint-etc
      options: [
        {
          declarations: true,
          imports: true,
        },
      ],
      severity: 'error',
    },
    'object-literal-sort-keys': false,
    'ordered-imports': false,
    'react-hooks-nesting': 'error',
    'throw-error': { severity: 'error' }, // tslint-etc
  },
};
