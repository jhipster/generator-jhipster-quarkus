import { GENERATOR_BOOTSTRAP_APPLICATION } from 'generator-jhipster/generators';
import ServerGenerator from 'generator-jhipster/generators/server';
import { entityServerFilesFromJHipster } from '../quarkus/entity-files.js';

export default class extends ServerGenerator {
    constructor(args, opts, features) {
        super(args, opts, {
            ...features,
            queueCommandTasks: true,
            checkBlueprint: true,
            sbsBlueprint: true,
        });
    }

    async beforeQueue() {
        this.jhipsterTemplatesFolders.push(
            this.fetchFromInstalledJHipster('java/generators/node/templates'),
            this.fetchFromInstalledJHipster('spring-boot/templates'),
        );
        await this.dependsOnJHipster(GENERATOR_BOOTSTRAP_APPLICATION);
    }

    get [ServerGenerator.CONFIGURING]() {
        return this.asConfiguringTaskGroup({
            async configuring() {
                this.jhipsterConfig.backendType = 'Quarkus';
            },
        });
    }

    get [ServerGenerator.COMPOSING]() {
        return this.asComposingTaskGroup({
            async composing() {
                await this.composeWith('jhipster-quarkus:quarkus');
            },
        });
    }

    get [ServerGenerator.WRITING]() {
        return this.asWritingTaskGroup({
            async writeFiles({ application }) {
                await this.writeFiles({
                    blocks: [
                        {
                            condition: ctx => ctx.useNpmWrapper,
                            templates: ['npmw', 'npmw.cmd'],
                        },
                    ],
                    context: application,
                });
            },
        });
    }

    get [ServerGenerator.WRITING_ENTITIES]() {
        return this.asWritingTaskGroup({
            async writeQuarkusServerFiles({ application, entities }) {
                for (const entity of entities.filter(entity => !entity.skipServer && !entity.builtIn)) {
                    this.writeFiles({
                        sections: entityServerFilesFromJHipster,
                        context: { ...application, ...entity },
                    });
                }
            },
        });
    }
}
