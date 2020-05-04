/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityServerGenerator = require('generator-jhipster/generators/entity-server');
const writeFiles = require('./files').writeFiles;
const prompts = require('./prompts');
const constants = require('../generator-quarkus-constants');

module.exports = class extends EntityServerGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        if (!this.jhipsterContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint quarkus')}`);
        }
    }

    get initializing() {
        const phaseFromJHipster = super._initializing();
        const phaseFromQuarkus = {
            ...phaseFromJHipster,
            setupConfigQuarkus() {
                if (!this.useConfigurationFile) {
                    this.dataAccess = constants.DEFAULT_DATA_ACCESS;
                } else {
                    this.dataAccess = this.fileData.dataAccess || constants.DEFAULT_DATA_ACCESS;
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
            askForDataAccess: prompts.askForDataAccess,
            askForService: prompts.askForService,
            askForDTO: phaseFromJHipster.askForDTO,
            // askForFiltering: phaseFromJHipster.askForFiltering,
            // askForReadOnly: phaseFromJHipster.askForReadOnly,
            askForPagination: phaseFromJHipster.askForPagination
        };
        return phaseFromQuarkus;
    }

    get configuring() {
        const phaseFromJHipster = super._configuring();
        const phaseFromQuarkus = {
            disableFluentMethods() {
                this.fluentMethods = false;
            },
            configureEntityQuarkus() {
                if (!this.storageData) {
                    this.storageData = {};
                }
                this.storageData.dataAccess = this.dataAccess;
            },
            ...phaseFromJHipster,
            fixRelationshipsPk() {
                // TODO remove after JHipster 6.8.0
                // https://github.com/jhipster/generator-jhipster/blob/master/generators/entity/index.js#L894
                for (let idx = 0; idx < this.relationships.length; idx++) {
                    this.relationships[idx].otherEntityPrimaryKeyType =
                        this.relationships[idx].otherEntityName === 'user' && this.authenticationType === 'oauth2'
                            ? 'String'
                            : this.getPkType(this.databaseType);
                }
            },
            prepareQuarkusRendering() {
                this.viaService = this.service !== 'no';
                this.hasServiceImpl = this.service === 'serviceImpl';
                this.viaRepository = this.dataAccess === 'repository';
                this.hasDto = this.dto === 'mapstruct';
                this.hasPagination = this.pagination !== 'no';

                this.mapsIdAssoc = undefined;
                this.primaryKeyType = this.pkType;
                for (let idx = 0; idx < this.relationships.length; idx++) {
                    const relationship = this.relationships[idx];
                    if (relationship.useJPADerivedIdentifier) {
                        this.mapsIdAssoc = relationship;
                        this.primaryKeyType =
                            this.relationships[idx].otherEntityName === 'user' && this.authenticationType === 'oauth2'
                                ? 'String'
                                : this.pkType;
                        break;
                    }
                }
                this.isUsingMapsId = this.mapsIdAssoc !== undefined;
                this.dtoClass = this.asDto(this.entityClass);
                this.dtoInstance = this.asDto(this.entityInstance);
                this.entityOrDtoClass = this.hasDto ? this.dtoClass : this.asEntity(this.entityClass);
                this.entityOrDtoInstance = this.hasDto ? this.dtoInstance : this.asEntity(this.entityInstance);
                this.dataAccessObject = this.viaRepository ? `${this.entityInstance}Repository` : this.entityClass;
                this.mapper = `${this.entityInstance}Mapper`;
                this.entityToDtoMethodReference = `${this.mapper}::toDto`;
                this.entityToDtoMethodInvocation = `${this.mapper}.toDto`;
                this.serviceClassName = this.hasServiceImpl ? `${this.entityClass}ServiceImpl` : `${this.entityClass}Service`;
            }
        };
        return phaseFromQuarkus;
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        return writeFiles();
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
