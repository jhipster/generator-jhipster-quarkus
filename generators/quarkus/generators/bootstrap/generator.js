import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';

import { CACHE_EXPIRE_AFTER_WRITE, CACHE_MAXIMUM_SIZE } from '../constants.js';

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
        });
    }
}
