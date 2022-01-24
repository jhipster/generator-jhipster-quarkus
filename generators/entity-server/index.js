/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityServerGenerator = require('generator-jhipster/generators/entity-server');
const { getCriteriaBuilder } = require('../utils');
const writeFiles = require('./files').writeFiles;
const { DEFAULT_DATA_ACCESS } = require('../generator-quarkus-constants');

module.exports = class extends EntityServerGenerator {
    constructor(args, options, features) {
        super(args, options, features);

        if (this.options.help) return;

        if (!this.jhipsterContext) {
            throw new Error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints quarkus')}`);
        }

        this.entity = this.options.context;
        this.entity.packageFolder = this.entity.packageFolder || this.entity.packageName.replace(/\./g, '/');

        // Drop when jhipster provides by default.
        this.entityStorage = this.getEntityConfig(this.entity.name, true);
        this.entityConfig = this.entityStorage.createProxy();
    }

    get initializing() {
        return super._initializing();
    }

    get prompting() {
        return super._prompting();
    }

    get configuring() {
        const phaseFromJHipster = super._configuring();
        return {
            configureEntityQuarkus() {
                this.entityStorage.defaults({
                    dataAccess: DEFAULT_DATA_ACCESS,
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
        return {
            disableFluentMethods() {
                this.entity.fluentMethods = false;
            },
            prepareQuarkusRendering() {
                const entity = this.entity;
                entity.viaService = entity.service !== 'no';
                entity.hasServiceImpl = entity.service === 'serviceImpl';
                entity.viaRepository = entity.dataAccess === 'repository';
                entity.hasDto = entity.dto === 'mapstruct';
                entity.hasPagination = entity.pagination !== 'no';

                entity.mapsIdAssoc = undefined;
                entity.primaryKeyType = entity.primaryKey.type;
                // eslint-disable-next-line no-restricted-syntax
                for (const relationship of entity.relationships) {
                    if (relationship.id) {
                        entity.mapsIdAssoc = relationship;
                        entity.primaryKeyType =
                            relationship.otherEntityName === 'user' && entity.authenticationType === 'oauth2'
                                ? 'String'
                                : entity.primaryKey.type;
                        break;
                    }
                }
                entity.isUsingMapsId = entity.mapsIdAssoc !== undefined;
                entity.dtoClass = this.asDto(entity.entityClass);
                entity.dtoInstance = this.asDto(entity.entityInstance);
                entity.entityOrDtoClass = entity.hasDto ? entity.dtoClass : this.asEntity(entity.entityClass);
                entity.entityOrDtoInstance = entity.hasDto ? entity.dtoInstance : this.asEntity(entity.entityInstance);
                entity.dataAccessObject = entity.viaRepository ? `${entity.entityInstance}Repository` : entity.entityClass;
                entity.mapper = `${entity.entityInstance}Mapper`;
                entity.entityToDtoMethodReference = `${entity.mapper}::toDto`;
                entity.entityToDtoMethodInvocation = `${entity.mapper}.toDto`;
                entity.serviceClassName = entity.hasServiceImpl ? `${entity.entityClass}ServiceImpl` : `${entity.entityClass}Service`;
                entity.serviceClassName = entity.hasServiceImpl ? `${entity.entityClass}ServiceImpl` : `${entity.entityClass}Service`;
                entity.getCriteriaBuilder = getCriteriaBuilder;
            },
            ...super._default(),
        };
    }

    get writing() {
        const { writeEnumFiles } = super._writing();
        return {
            removeIds() {
                this.fields = this.fields.filter(field => !field.id);
            },
            ...writeFiles(),
            writeEnumFiles,
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
