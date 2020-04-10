/* eslint-disable consistent-return */
const chalk = require('chalk');
const prompts = require('./prompts');
const EntityGenerator = require('generator-jhipster/generators/entity');

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
        const customPhase = {
            setupConfigQuarkus() {
                const context = this.context;
                const configuration = this.getAllJhipsterConfig(this, true);
                context.dataAccessPattern = configuration.get('dataAccessPattern') || 'activeRecord';
            }
        };
        return Object.assign(phaseFromJHipster, customPhase);
    }

    get prompting() {
        const phaseFromJHipster = super._prompting();
        const customPhase = {
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
        return customPhase;
    }

    get configuring() {
        // const phaseFromJHipster = super._configuring();
        // const writeEntityJsonFromParent = phaseFromJHipster.writeEntityJson;
        // const context = this.context;
        // const myCustomPhaseSteps = {
        //     writeEntityJson() {
        //         // if (!context.dataAccessPattern) {
        //         //     context.dataAccessPattern = 'activeRecord';
        //         // }
        //         // Use this.storageData to delegate to the parent EntityGenrator the file writing;
        //         this.storageData.dataAccessPattern = context.dataAccessPattern;
        //         writeEntityJsonFromParent();
        //     }
        // };
        // return Object.assign(phaseFromJHipster, myCustomPhaseSteps);
        return super._configuring();
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
