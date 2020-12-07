/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityGenerator = require('generator-jhipster/generators/entity');
const prompts = require('./prompts');
const constants = require('../generator-quarkus-constants');

module.exports = class extends EntityGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint quarkus')}`);
        }

        this.configOptions = jhContext.configOptions || {};

        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupEntityOptions(this, jhContext, this);
    }

    get initializing() {
        const phaseFromJHipster = super._initializing();
        const phaseFromQuarkus = {
            ...phaseFromJHipster,
            setupConfigQuarkus() {
                const context = this.context;
                if (!context.useConfigurationFile) {
                    context.dataAccess = constants.DEFAULT_DATA_ACCESS;
                } else {
                    context.dataAccess = context.fileData.dataAccess || constants.DEFAULT_DATA_ACCESS;
                }
            },
        };
        return phaseFromQuarkus;
    }

    get prompting() {
        const generator = this;
        const phaseFromJHipster = super._prompting();
        const phaseFromQuarkus = {
            /* pre entity hook needs to be written here */
            // askForMicroserviceJson: prompts.askForMicroserviceJson,
            /* ask question to user if s/he wants to update entity */
            askForUpdate: phaseFromJHipster.askForUpdate,
            askForFields: phaseFromJHipster.askForFields,
            askForFieldsToRemove: phaseFromJHipster.askForFieldsToRemove,
            askForRelationships: () => {
                if (generator.context.databaseType === 'mongodb') {
                    return;
                }
                phaseFromJHipster.askForRelationships.call(generator);
            },
            askForRelationsToRemove: () => {
                if (generator.context.databaseType === 'mongodb') {
                    return;
                }
                phaseFromJHipster.askForRelationsToRemove.call(generator);
            },
            askForTableName: phaseFromJHipster.askForTableName,
            askForDataAccess: prompts.askForDataAccess,
            askForService: prompts.askForService,
            askForDTO: phaseFromJHipster.askForDTO,
            // askForFiltering: phaseFromJHipster.askForFiltering,
            // askForReadOnly: phaseFromJHipster.askForReadOnly,
            askForPagination: phaseFromJHipster.askForPagination,
        };
        return phaseFromQuarkus;
    }

    get configuring() {
        const phaseFromJHipster = super._configuring();
        const phaseFromQuarkus = {
            configureEntityQuarkus() {
                const context = this.context;
                if (!this.storageData) {
                    this.storageData = {};
                }
                this.storageData.dataAccess = context.dataAccess;
            },
            ...phaseFromJHipster,
        };
        return phaseFromQuarkus;
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        const phaseFromQuarkus = {
            composeServer() {
                const context = this.context;
                if (context.skipServer) return;
                const configOptions = this.configOptions;

                this.composeWith(require.resolve('../entity-server'), {
                    context,
                    configOptions,
                    force: context.options.force,
                    debug: context.isDebugEnabled,
                });
            },

            composeClient() {
                const context = this.context;
                if (context.skipClient) return;
                const configOptions = this.configOptions;

                this.composeWith(require.resolve('generator-jhipster/generators/entity-client'), {
                    context,
                    configOptions,
                    'skip-install': context.options['skip-install'],
                    force: context.options.force,
                    debug: context.isDebugEnabled,
                });
            },

            composeI18n() {
                const context = this.context;
                if (context.skipClient) return;
                const configOptions = this.configOptions;
                this.composeWith(require.resolve('generator-jhipster/generators/entity-i18n'), {
                    context,
                    configOptions,
                    'skip-install': context.options['skip-install'],
                    force: context.options.force,
                    debug: context.isDebugEnabled,
                });
            },
        };

        return phaseFromQuarkus;
    }

    get install() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._install();
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }
};
