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
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints quarkus')}`);
        }

        this.entity = this.entity || this.context;
        // this.entity.prodDatabaseType = this.entity.prodDatabaseType || this.jhipsterConfig.prodDatabaseType;
    }

    get initializing() {
        const phaseFromJHipster = super._initializing();
        return {
            ...phaseFromJHipster,
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
                this.entityStorage.defaults({
                    dataAccess: constants.DEFAULT_DATA_ACCESS,
                });
            },
            ...phaseFromJHipster,
        };
    }

    get composing() {
        return super._composing();
    }

    get loading() {
        return {
            ...super._loading(),
            loadQuarkusConfig() {
                this.entity.dataAccess = this.entityConfig.dataAccess;
            },
        };
    }

    get preparing() {
        return super._preparing();
    }

    get preparingFields() {
        return super._preparingFields();
    }

    get preparingRelationships() {
        return super._preparingRelationships();
    }

    get default() {
        return super._default();
    }

    get writing() {
        return super._writing();
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
