import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { CACHE_EXPIRE_AFTER_WRITE, CACHE_MAXIMUM_SIZE, QUARKUS_VERSION } from '../constants.js';

export default class extends BaseApplicationGenerator {
    constructor(args, opts, features) {
        super(args, opts, { ...features, queueCommandTasks: true, sbsBlueprint: true });
    }

    get [BaseApplicationGenerator.CONFIGURING]() {
        return this.asConfiguringTaskGroup({
            async configuringTemplateTask() {
                if (!this.jhipsterConfig.cacheProvider) {
                    this.jhipsterConfig.cacheProvider = 'no';
                }
                if (!['caffeine', 'redis', 'no'].includes(this.jhipsterConfig.cacheProvider)) {
                    throw new Error(`Cache provider ${this.jhipsterConfig.cacheProvider} is not supported`);
                }
                if (this.jhipsterConfig.keycloak.admin-client-id && this.jhipsterConfig.keycloak.admin-client-id !== 'no') {
                    this.log.warn(`keycloak.admin-client-id '${this.jhipsterConfig.keycloak.admin-client-id}' is not supported by this blueprint, falling back to 'no'`);
                    this.jhipsterConfig.keycloak.admin-client-id = 'no';
                }
                if (this.jhipsterConfig.keycloak.admin-client-secret && this.jhipsterConfig.keycloak.admin-client-secret !== 'no') {
                    this.log.warn(`keycloak.admin-client-secret '${this.jhipsterConfig.keycloak.admin-client-secret}' is not supported by this blueprint, falling back to 'no'`);
                    this.jhipsterConfig.keycloak.admin-client-secret = 'no';
                }
                if (this.jhipsterConfig.keycloak.sync-users-on-login && this.jhipsterConfig.keycloak.sync-users-on-login !== 'no') {
                    this.log.warn(`keycloak.sync-users-on-login '${this.jhipsterConfig.keycloak.sync-users-on-login}' is not supported by this blueprint, falling back to 'no'`);
                    this.jhipsterConfig.keycloak.sync-users-on-login = 'no';
                }
                if (this.jhipsterConfig.keycloak.realm && this.jhipsterConfig.keycloak.realm !== 'no') {
                    this.log.warn(`keycloak.realm '${this.jhipsterConfig.keycloak.realm}' is not supported by this blueprint, falling back to 'no'`);
                    this.jhipsterConfig.keycloak.realm = 'no';
                }
                if (this.jhipsterConfig.keycloak.user-sync-enabled && this.jhipsterConfig.keycloak.user-sync-enabled !== 'no') {
                    this.log.warn(`keycloak.user-sync-enabled '${this.jhipsterConfig.keycloak.user-sync-enabled}' is not supported by this blueprint, falling back to 'no'`);
                    this.jhipsterConfig.keycloak.user-sync-enabled = 'no';
                }
                if (this.jhipsterConfig.keycloak.sync-on-login && this.jhipsterConfig.keycloak.sync-on-login !== 'no') {
                    this.log.warn(`keycloak.sync-on-login '${this.jhipsterConfig.keycloak.sync-on-login}' is not supported by this blueprint, falling back to 'no'`);
                    this.jhipsterConfig.keycloak.sync-on-login = 'no';
                }
                if (this.jhipsterConfig.keycloak.realm && this.jhipsterConfig.keycloak.realm !== 'no') {
                    this.log.warn(`keycloak.realm '${this.jhipsterConfig.keycloak.realm}' is not supported by this blueprint, falling back to 'no'`);
                    this.jhipsterConfig.keycloak.realm = 'no';
                }
                if (this.jhipsterConfig.keycloak.resource && this.jhipsterConfig.keycloak.resource !== 'no') {
                    this.log.warn(`keycloak.resource '${this.jhipsterConfig.keycloak.resource}' is not supported by this blueprint, falling back to 'no'`);
                    this.jhipsterConfig.keycloak.resource = 'no';
                }
            },
        });
    }

    get [BaseApplicationGenerator.LOADING]() {
        return this.asLoadingTaskGroup({
            async loadingTemplateTask({ application }) {
                application.backendType = 'Quarkus';
                application.quarkusVersion = QUARKUS_VERSION;
                application.backendTypeJavaAny = true;
                application.CACHE_MAXIMUM_SIZE = CACHE_MAXIMUM_SIZE;
                application.CACHE_EXPIRE_AFTER_WRITE = CACHE_EXPIRE_AFTER_WRITE;
                application.jhipsterQuarkusVersion = undefined;
                application.messageBrokerAny ??= undefined;
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
        });
    }
}
