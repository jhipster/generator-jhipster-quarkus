import { GENERATOR_BOOTSTRAP_APPLICATION } from 'generator-jhipster/generators';
import ServerGenerator from 'generator-jhipster/generators/server';
import { entityServerFilesFromJHipster } from '../quarkus/entity-files.js';

export default class extends ServerGenerator {
    constructor(args, opts, features) {
        super(args, opts, {
            ...features,
            checkBlueprint: true,
            // Dropped it once migration is done.
            jhipster7Migration: true,
        });
    }

    async beforeQueue() {
        await this.dependsOnJHipster(GENERATOR_BOOTSTRAP_APPLICATION);
    }

    get [ServerGenerator.LOADING]() {
        return this.asLoadingTaskGroup({
            ...super.loading,
        });
    }

    get [ServerGenerator.COMPOSING]() {
        return this.asComposingTaskGroup({
            async composing() {
                await this.composeWith('jhipster-quarkus:quarkus');
            },
        });
    }

    get [ServerGenerator.POST_PREPARING]() {
        return this.asPostPreparingTaskGroup({
            useNpmWrapper({ application }) {
                if (application.useNpmWrapper) {
                    this.useNpmWrapperInstallTask();
                }
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
                            transform: false,
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
            async writeMicronautServerFiles({ application, entities }) {
                for (const entity of entities.filter(entity => !entity.skipServer && !entity.builtIn)) {
                    this.writeFiles({
                        sections: entityServerFilesFromJHipster,
                        context: { ...application, ...entity },
                    });
                }
            },
        });
    }

    get [ServerGenerator.POST_WRITING]() {
        return this.asPostWritingTaskGroup({
            ...super.postWriting,
            addTestSpringFactory: undefined,
            customizeMaven: undefined,
        });
    }
}
