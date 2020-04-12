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
        this.storageData = {};

        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupEntityOptions(this, jhContext, this);
    }

    get initializing() {
        const phaseFromJHipster = super._initializing();
        const phaseFromQuarkus = {
            setupConfigQuarkus() {
                const context = this.context;
                // Specific Entity sub-generator constants
                if (!context.useConfigurationFile) {
                    // no file present, new entity creation
                    // this.log(`\nThe entity ${entityName} is being created.\n`);
                    context.dataAccessPattern = constants.DATA_ACCESS_PATTERN;
                } else {
                    // existing entity reading values from file
                    // this.log(`\nThe entity ${entityName} is being updated.\n`);
                    try {
                        context.fileData = this.fs.readJSON(context.filename);
                    } catch (err) {
                        this.debug('Error:', err);
                        this.error('\nThe entity configuration file could not be read!\n');
                    }
                    context.dataAccessPattern = context.fileData.dataAccessPattern || constants.DATA_ACCESS_PATTERN;
                }
            }
        };
        return Object.assign(phaseFromJHipster, phaseFromQuarkus);
    }

    get prompting() {
        const phaseFromJHipster = super._prompting();
        const phaseFromQuarkus = {
            /* pre entity hook needs to be written here */
            // askForMicroserviceJson: prompts.askForMicroserviceJson,
            /* ask question to user if s/he wants to update entity */
            askForUpdate: phaseFromJHipster.askForUpdate,
            askForFields: phaseFromJHipster.askForFields,
            askForFieldsToRemove: phaseFromJHipster.askForFieldsToRemove,
            askForRelationships: phaseFromJHipster.askForRelationships,
            askForRelationsToRemove: phaseFromJHipster.askForRelationsToRemove,
            askForTableName: phaseFromJHipster.askForTableName,
            askForDataAccessPattern: prompts.askForDataAccessPattern,
            askForService: phaseFromJHipster.askForService,
            askForDTO: phaseFromJHipster.askForDTO,
            askForFiltering: phaseFromJHipster.askForFiltering,
            askForReadOnly: phaseFromJHipster.askForReadOnly,
            askForPagination: phaseFromJHipster.askForPagination
        };
        return phaseFromQuarkus;
    }

    get configuring() {
        const phaseFromJHipster = super._configuring();
        // redefine the phases to insert a custom configuration
        const phaseFromQuarkus = {
            validateFile: phaseFromJHipster.validateFile,
            configureEntityQuarkus() {
                const context = this.context;
                this.storageData.dataAccessPattern = context.dataAccessPattern;
            },
            writeEntityJson: phaseFromJHipster.writeEntityJson,
            loadInMemoryData: phaseFromJHipster.loadInMemoryData
        };
        return phaseFromQuarkus;
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._writing();
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
