import { TEMPLATES_DOCKER_DIR } from 'generator-jhipster';
import { GENERATOR_BOOTSTRAP_APPLICATION } from 'generator-jhipster/generators';
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';

const renameTo = (ctx, filepath) => `${ctx.dockerServicesDir}${filepath}`.replace('/_eureka_', '').replace('/_consul_', '');

export default class extends BaseApplicationGenerator {
    constructor(args, opts, features) {
        super(args, opts, { ...features, sbsBlueprint: true });
    }

    async beforeQueue() {
        await this.dependsOnJHipster(GENERATOR_BOOTSTRAP_APPLICATION);
    }

    get [BaseApplicationGenerator.PREPARING]() {
        return this.asPreparingTaskGroup({
            async preparingTemplateTask({ application }) {
                application.dockerServices.push('app');
            },
        });
    }

    get [BaseApplicationGenerator.WRITING]() {
        return this.asWritingTaskGroup({
            async writingTemplateTask({ application }) {
                await this.writeFiles({
                    sections: {
                        docker: [
                            {
                                path: TEMPLATES_DOCKER_DIR,
                                renameTo,
                                templates: ['Dockerfile.jvm', 'Dockerfile.native', 'Dockerfile.legacy-jar'],
                            },
                            {
                                path: TEMPLATES_DOCKER_DIR,
                                condition: ctx => ctx.authenticationTypeOauth2,
                                renameTo: () => `${application.srcTestResources}jhipster-realm.json`,
                                templates: ['realm-config/jhipster-realm.json'],
                            },
                        ],
                    },
                    context: application,
                });
            },
        });
    }
}
