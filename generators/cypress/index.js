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

        this.sbsBlueprint = true;
    }

    get postWriting() {
        return {
            customize() {
                if (this.jhipsterConfig.authenticationType === 'oauth2') {
                    this.replaceContent(
                        `${CLIENT_TEST_SRC_DIR}cypress/support/oauth2.ts`,
                        `
        followRedirect: false,
        form: true,`,
                        `
        followRedirect: true,
        form: true,`
                    );
                }
            },
        };
    }
};
