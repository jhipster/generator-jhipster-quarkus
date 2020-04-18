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
                    context.repository = constants.DEFAULT_USE_REPOSITORY;
                } else {
                    context.repository = context.fileData.repository || constants.DEFAULT_USE_REPOSITORY;
                }
            }
        };
        return phaseFromQuarkus;
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
            askForRepository: prompts.askForRepository,
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
            configureEntityQuarkus() {
                const context = this.context;
                if (!this.storageData) {
                    this.storageData = {};
                }
                this.storageData.repository = context.repository;
            },
            plop() {
                const context = this.context;
                context.viaService = context.service !== 'no';
                context.viaRepository = context.repository !== 'no';
                context.hasDto = context.dto === 'mapstruct';
                context.hasTransaction = !context.viaService && !context.saveUserSnapshot;
                context.hasPagination = context.pagination !== 'no';
                context.isUsingMapsId = false;
                context.mapsIdAssoc = undefined;
                context.primaryKeyType = context.pkType;
                for (let idx = 0; idx < context.relationships.length; idx++) {
                    context.isUsingMapsId = context.relationships[idx].useJPADerivedIdentifier;
                    if (context.isUsingMapsId) {
                        context.mapsIdAssoc = context.relationships[idx];
                        context.primaryKeyType =
                            context.relationships[idx].otherEntityName === 'user' && context.authenticationType === 'oauth2'
                                ? 'String'
                                : context.pkType;
                        break;
                    }
                }

                context.instanceType = context.hasDto ? this.asDto(context.entityClass) : this.asEntity(context.entityClass);
                context.instanceName = context.hasDto ? this.asDto(context.entityInstance) : this.asEntity(context.entityInstance);
                context.entityInstanceName = this.asEntity(context.entityInstance);
                context.entityClassName = this.asEntity(context.entityClass);
            },
            ...phaseFromJHipster
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
