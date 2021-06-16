/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityGenerator = require('generator-jhipster/generators/entity');
const _ = require('lodash');
const prompts = require('./prompts');
const constants = require('../generator-quarkus-constants');

module.exports = class extends EntityGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints quarkus')}`);
        }

        this.configOptions = jhContext.configOptions || {};

        // This sets up options for this sub generator and is being reused from JHipster
        const name = _.upperFirst(this.options.name).replace('.json', '');
        this.entityStorage = jhContext.getEntityConfig(name);
    }

    get initializing() {
        const phaseFromJHipster = super._initializing();
        return {
            ...phaseFromJHipster,
            setupConfigQuarkus() {
                const context = this.context;
                if (!context.useConfigurationFile) {
                    context.dataAccess = constants.DEFAULT_DATA_ACCESS;
                } else {
                    context.dataAccess = context.fileData ? context.fileData.dataAccess : constants.DEFAULT_DATA_ACCESS;
                }
            },
        };
    }

    get prompting() {
        const generator = this;
        const phaseFromJHipster = super._prompting();
        return {
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
    }

    get configuring() {
        const phaseFromJHipster = super._configuring();
        return {
            configureEntityQuarkus() {
                const context = this.context;
                if (!this.storageData) {
                    this.storageData = {};
                }
                this.storageData.dataAccess = context.dataAccess;
            },
            ...phaseFromJHipster,
        };
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

    get preparingRelationships() {
        return super._preparingRelationships();
    }

    get default() {
        return super._default();
    }

    get writing() {
        return {
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
    }

    get postWriting() {
        return super._postWriting();
    }

    get install() {
        return super._install();
    }

    get end() {
        return super._end();
    }
};
