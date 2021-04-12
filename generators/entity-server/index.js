/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityServerGenerator = require('generator-jhipster/generators/entity-server');
const writeFiles = require('./files').writeFiles;

module.exports = class extends EntityServerGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        if (!this.jhipsterContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints quarkus')}`);
        }
    }

    get initializing() {
        return super._initializing();
    }

    get prompting() {
        return super._prompting();
    }

    get configuring() {
        // const phaseFromJHipster = super._configuring();
        return {
            disableFluentMethods() {
                this.fluentMethods = false;
            },
            fixRelationshipsPk() {
                // TODO remove after JHipster 6.8.0
                // https://github.com/jhipster/generator-jhipster/blob/master/generators/entity/index.js#L894
                this.relationships.forEach(relationship => {
                    relationship.otherEntityPrimaryKeyType =
                        relationship.otherEntityName === 'user' && this.authenticationType === 'oauth2'
                            ? 'String'
                            : this.getPkType(this.databaseType);
                });
            },
            prepareQuarkusRendering() {
                this.viaService = this.service !== 'no';
                this.hasServiceImpl = this.service === 'serviceImpl';
                this.viaRepository = this.dataAccess === 'repository';
                this.hasDto = this.dto === 'mapstruct';
                this.hasPagination = this.pagination !== 'no';

                this.mapsIdAssoc = undefined;
                this.primaryKeyType = this.pkType;
                // eslint-disable-next-line no-restricted-syntax
                for (const relationship of this.relationships) {
                    if (relationship.useJPADerivedIdentifier) {
                        this.mapsIdAssoc = relationship;
                        this.primaryKeyType =
                            relationship.otherEntityName === 'user' && this.authenticationType === 'oauth2' ? 'String' : this.pkType;
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

    get default() {
        return super._default();
    }

    get writing() {
        return writeFiles();
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
