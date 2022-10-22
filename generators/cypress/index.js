/* eslint-disable consistent-return */
const chalk = require('chalk');
const CypressGenerator = require('generator-jhipster/generators/cypress');
const { CLIENT_TEST_SRC_DIR } = require('generator-jhipster/generators/generator-constants');

module.exports = class extends CypressGenerator {
    constructor(args, options, features) {
        super(args, options, features);

        if (this.options.help) return;

        if (!this.options.jhipsterContext) {
            throw new Error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints quarkus')}`);
        }

        // Side-by-side blueprint doesn't override the main generator.
        // We are just customizing some files and providing alternative files.
        this.sbsBlueprint = true;
    }

    get postWriting() {
        return {
            customize() {
                /*
                this.replaceContent(
                    `${CLIENT_TEST_SRC_DIR}cypress/e2e/account/reset-password-page.cy.ts`,
                    "it('should be able to init reset password'",
                    "it.skip('should be able to init reset password'"
                );
                */
                this.replaceContent(
                    `${CLIENT_TEST_SRC_DIR}cypress/e2e/account/register-page.cy.ts`,
                    "it('register a valid user'",
                    "it.skip('register a valid user'"
                );
                if (this.authenticationTypeOauth2) {
                    this.replaceContent(
                        `${CLIENT_TEST_SRC_DIR}cypress/support/oauth2.ts.ejs`,
                        "followRedirect: false,",
                        "followRedirect: true,"
                    );
                }
            },
        };
    }
};
