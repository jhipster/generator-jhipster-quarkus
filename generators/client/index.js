/* eslint-disable consistent-return */
const chalk = require('chalk');
const ClientGenerator = require('generator-jhipster/generators/client');
const constants = require('generator-jhipster/generators/generator-constants');

const { ANGULAR, REACT } = constants.SUPPORTED_CLIENT_FRAMEWORKS;
const { ANGULAR_DIR, REACT_DIR } = constants;

module.exports = class extends ClientGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints quarkus')}`);
        }
    }

    get initializing() {
        return super._initializing();
    }

    get prompting() {
        return super._prompting();
    }

    get configuring() {
        return super._configuring();
    }

    get composing() {
        return super._composing();
    }

    get loading() {
        return super._loading();
    }

    get preparing() {
        return super._preparing();
    }

    get default() {
        return super._default();
    }

    get writing() {
        return super._writing();
    }

    get postWriting() {
        return {
            ...super._postWriting(),
            customize() {
                if (this.skipClient) return;
                if (this.clientFramework === ANGULAR) {
                    this.replaceContent(
                        `${ANGULAR_DIR}admin/configuration/configuration.component.html`,
                        '<h3 id="spring-configuration">Spring configuration</h3>',
                        '<h3 id="Quarkus-configuration">Quarkus configuration</h3>'
                    );
                }
                if (this.clientFramework === REACT) {
                    this.replaceContent(
                        `${REACT_DIR}modules/administration/configuration/configuration.tsx`,
                        '<label>Spring configuration</label>',
                        '<label>Quarkus configuration</label>'
                    );
                }
            },
        };
    }

    get install() {
        return super._install();
    }

    get end() {
        return super._end();
    }
};
