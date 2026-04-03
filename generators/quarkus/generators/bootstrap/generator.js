import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { prepareSqlApplicationProperties } from 'generator-jhipster/generators/spring-boot/generators/data-relational/support';

import { CACHE_EXPIRE_AFTER_WRITE, CACHE_MAXIMUM_SIZE } from '../../../constants.js';

export default class extends BaseApplicationGenerator {
    constructor(args, opts, features) {
        super(args, opts, { ...features, sbsBlueprint: true });
    }

    async beforeQueue() {
        await this.dependsOnBootstrap('server');
        await this.dependsOnBootstrap('java');
    }

    get [BaseApplicationGenerator.LOADING]() {
        return this.asLoadingTaskGroup({
            async loadingTemplateTask({ applicationDefaults }) {
                applicationDefaults({
                    backendType: 'Quarkus',
                    backendTypeJavaAny: true,
                    CACHE_MAXIMUM_SIZE,
                    CACHE_EXPIRE_AFTER_WRITE,
                    jhipsterQuarkusVersion: undefined,
                    messageBrokerAny: undefined,
                    temporaryDir: ({ buildTool }) => {
                        switch (buildTool) {
                            case 'maven':
                                return 'target/';
                            case 'gradle':
                                return 'build/';
                            default:
                                return 'temp/';
                        }
                    },
                });
            },
        });
    }

    get [BaseApplicationGenerator.PREPARING]() {
        return this.asPreparingTaskGroup({
            async preparingTemplateTask({ application }) {
                application.clientDistDir = application.buildToolGradle
                    ? `${application.temporaryDir}resources/main/META-INF/resources/`
                    : `${application.temporaryDir}classes/META-INF/resources/`;
                application.useNpmWrapper = application.clientFrameworkAny;
                application.dockerContainers.mongodb = 'mongo:4.4.15';
            },
            defaults({ application }) {
                if (application.databaseTypeSql) {
                    prepareSqlApplicationProperties({ application });
                }
            },
        });
    }

    get [BaseApplicationGenerator.PREPARING_EACH_ENTITY_FIELD]() {
        return this.asPreparingEachEntityFieldTaskGroup({
            prepareField({ entity, field }) {
                if (!entity.skipServer) {
                    field.propertyGet = field.propertyName;
                    field.propertySet = value => `${field.propertyName} = ${value}`;
                }
            },
        });
    }

    get [BaseApplicationGenerator.PREPARING_EACH_ENTITY_RELATIONSHIP]() {
        return this.asPreparingEachEntityRelationshipTaskGroup({
            prepareField({ entity, relationship }) {
                if (!entity.skipServer) {
                    relationship.propertyGet = relationship.propertyName;
                    relationship.propertySet = value => `${relationship.propertyName} = ${value}`;
                }
            },
        });
    }

    get [BaseApplicationGenerator.POST_PREPARING_EACH_ENTITY]() {
        return this.asPreparingTaskGroup({
            async prepareQuarkusRendering({ entity }) {
                entity.primaryKey.propertyGet = entity.primaryKey.name;
                entity.primaryKey.propertySet = value => `${entity.primaryKey.name} = ${value}`;
            },
        });
    }

    get [BaseApplicationGenerator.DEFAULT]() {
        return this.asDefaultTaskGroup({
            async defaultTemplateTask({ application }) {
                if (application.authority) {
                    application.authority.skipClient = false;
                }
                if (application.user) {
                    // Quarkus does not provides Public User API, so we need to set it to admin/users
                    application.user.entityApiUrl = 'admin/users';
                }
            },
        });
    }
}
