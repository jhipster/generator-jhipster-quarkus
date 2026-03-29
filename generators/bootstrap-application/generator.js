import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { CACHE_EXPIRE_AFTER_WRITE, CACHE_MAXIMUM_SIZE } from '../constants.js';

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
                if (this.jhipsterConfig.searchEngine && this.jhipsterConfig.searchEngine !== 'no') {
                    this.log.warn(`searchEngine '${this.jhipsterConfig.searchEngine}' is not supported by this blueprint, falling back to 'no'`);
                    this.jhipsterConfig.searchEngine = 'no';
                }
            },
        });
    }

    get [BaseApplicationGenerator.LOADING]() {
        return this.asLoadingTaskGroup({
            async loadingTemplateTask({ application }) {
                application.backendType = 'Quarkus';
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
