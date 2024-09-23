import globals from 'globals';
import prettier from 'eslint-plugin-prettier/recommended';
import jhipster from 'generator-jhipster/eslint/recommended';

// Workaround for jhipster export issue.
delete jhipster.recommended.recommended;
// jhipster-needle-eslint-add-import - JHipster will add additional import here

export default [
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    { ignores: ['coverage/**'] },
    {
        rules: {
            '@typescript-eslint/no-deprecated': 'off',
        },
    },
    jhipster.recommended,
    // jhipster-needle-eslint-add-config - JHipster will add additional config here
    prettier,
];
