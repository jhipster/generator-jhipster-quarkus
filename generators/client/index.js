/* eslint-disable consistent-return */
const chalk = require('chalk');
const ClientGenerator = require('generator-jhipster/generators/client');
const constants = require('generator-jhipster/generators/generator-constants');

const { ANGULAR, REACT } = constants.SUPPORTED_CLIENT_FRAMEWORKS;
const { ANGULAR_DIR, REACT_DIR } = constants;

module.exports = class extends ClientGenerator {
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
                if (this.jhipsterConfig.skipClient) return;
                if (this.jhipsterConfig.clientFramework === ANGULAR) {
                    this.replaceContent(
                        `${ANGULAR_DIR}admin/configuration/configuration.component.html`,
                        '<h3 id="spring-configuration">Spring configuration</h3>',
                        '<h3 id="Quarkus-configuration">Quarkus configuration</h3>'
                    );
                    this.deleteDestination(`${ANGULAR_DIR}admin/health/modal/`);
                }
                if (this.jhipsterConfig.clientFramework === REACT) {
                    this.replaceContent(
                        `${REACT_DIR}modules/administration/configuration/configuration.tsx`,
                        '<label>Spring configuration</label>',
                        '<label>Quarkus configuration</label>'
                    );

                    this.deleteDestination(`${REACT_DIR}modules/administration/health/health-modal.tsx`);

                    //                    // Workaround jhipster 7.1.0 bug
                    //                    this.packageJson.merge({
                    //                        devDependencies: {
                    //                            'workbox-webpack-plugin': '6.2.4',
                    //                        },
                    //                    });
                }
            },
        };
    }
};
