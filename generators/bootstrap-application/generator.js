import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { CACHE_EXPIRE_AFTER_WRITE, CACHE_MAXIMUM_SIZE, QUARKUS_VERSION } from '../constants.js';

export default class extends BaseApplicationGenerator {
    constructor(args, opts, features) {
        super(args, opts, { ...features, sbsBlueprint: true });
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
