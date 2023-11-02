import MavenGenerator from 'generator-jhipster/generators/maven';
import command from './command.js';

export default class extends MavenGenerator {
    constructor(args, opts, features) {
        super(args, opts, {
            ...features,
            checkBlueprint: true,
            // Dropped it once migration is done.
            jhipster7Migration: true,
        });
    }

    async beforeQueue() {
        await super.beforeQueue();
    }

    get [MavenGenerator.INITIALIZING]() {
        return this.asInitializingTaskGroup({
            ...super.initializing,
            async initializingTemplateTask() {
                this.parseJHipsterArguments(command.arguments);
                this.parseJHipsterOptions(command.options);
            },
        });
    }

    get [MavenGenerator.PROMPTING]() {
        return this.asPromptingTaskGroup({
            ...super.prompting,
        });
    }

    get [MavenGenerator.CONFIGURING]() {
        return this.asConfiguringTaskGroup({
            ...super.configuring,
        });
    }

    get [MavenGenerator.COMPOSING]() {
        return this.asComposingTaskGroup({
            ...super.composing,
        });
    }

    get [MavenGenerator.LOADING]() {
        return this.asLoadingTaskGroup({
            ...super.loading,
        });
    }

    get [MavenGenerator.PREPARING]() {
        return this.asPreparingTaskGroup({
            ...super.preparing,
        });
    }

    get [MavenGenerator.CONFIGURING_EACH_ENTITY]() {
        return this.asConfiguringEachEntityTaskGroup({
            ...super.configuringEachEntity,
        });
    }

    get [MavenGenerator.LOADING_ENTITIES]() {
        return this.asLoadingEntitiesTaskGroup({
            ...super.loadingEntities,
        });
    }

    get [MavenGenerator.PREPARING_EACH_ENTITY]() {
        return this.asPreparingEachEntityTaskGroup({
            ...super.preparingEachEntity,
        });
    }

    get [MavenGenerator.PREPARING_EACH_ENTITY_FIELD]() {
        return this.asPreparingEachEntityFieldTaskGroup({
            ...super.preparingEachEntityField,
        });
    }

    get [MavenGenerator.PREPARING_EACH_ENTITY_RELATIONSHIP]() {
        return this.asPreparingEachEntityRelationshipTaskGroup({
            ...super.preparingEachEntityRelationship,
        });
    }

    get [MavenGenerator.POST_PREPARING_EACH_ENTITY]() {
        return this.asPostPreparingEachEntityTaskGroup({
            ...super.postPreparingEachEntity,
        });
    }

    get [MavenGenerator.DEFAULT]() {
        return this.asDefaultTaskGroup({
            ...super.default,
        });
    }

    get [MavenGenerator.WRITING]() {
        return this.asWritingTaskGroup({
            ...super.writing,
        });
    }

    get [MavenGenerator.WRITING_ENTITIES]() {
        return this.asWritingEntitiesTaskGroup({
            ...super.writingEntities,
        });
    }

    get [MavenGenerator.POST_WRITING]() {
        return this.asPostWritingTaskGroup({
            ...super.postWriting,
            /** Quarkus blueprint uses a single pom.xml template without needles insertions. Original ordering should be kept */
            sortPom() {},
        });
    }

    get [MavenGenerator.POST_WRITING_ENTITIES]() {
        return this.asPostWritingEntitiesTaskGroup({
            ...super.postWritingEntities,
        });
    }

    get [MavenGenerator.LOADING_TRANSLATIONS]() {
        return this.asLoadingTranslationsTaskGroup({
            ...super.loadingTranslations,
        });
    }

    get [MavenGenerator.INSTALL]() {
        return this.asInstallTaskGroup({
            ...super.install,
        });
    }

    get [MavenGenerator.POST_INSTALL]() {
        return this.asPostInstallTaskGroup({
            ...super.postInstall,
        });
    }

    get [MavenGenerator.END]() {
        return this.asEndTaskGroup({
            ...super.end,
        });
    }
}
