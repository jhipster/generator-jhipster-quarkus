/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityServerGenerator = require('generator-jhipster/generators/entity-server');
const writeFiles = require('./files').writeFiles;

module.exports = class extends EntityServerGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        if (!this.jhipsterContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint quarkus')}`);
        }
    }

    get initializing() {
        /**
         * Any method beginning with _ can be reused from the superclass `EntityServerGenerator`
         *
         * There are multiple ways to customize a phase from JHipster.
         *
         * 1. Let JHipster handle a phase, blueprint doesnt override anything.
         * ```
         *      return super._initializing();
         * ```
         *
         * 2. Override the entire phase, this is when the blueprint takes control of a phase
         * ```
         *      return {
         *          myCustomInitPhaseStep() {
         *              // Do all your stuff here
         *          },
         *          myAnotherCustomInitPhaseStep(){
         *              // Do all your stuff here
         *          }
         *      };
         * ```
         *
         * 3. Partially override a phase, this is when the blueprint gets the phase from JHipster and customizes it.
         * ```
         *      const phaseFromJHipster = super._initializing();
         *      const myCustomPhaseSteps = {
         *          displayLogo() {
         *              // override the displayLogo method from the _initializing phase of JHipster
         *          },
         *          myCustomInitPhaseStep() {
         *              // Do all your stuff here
         *          },
         *      }
         *      return Object.assign(phaseFromJHipster, myCustomPhaseSteps);
         * ```
         */
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._initializing();
    }

    get prompting() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._prompting();
    }

    get configuring() {
        // const phaseFromJHipster = super._configuring();
        const phaseFromQuarkus = {
            disableFluentMethods() {
                this.fluentMethods = false;
            },
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
            },
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
