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
            async promptingTemplateTask() {},
        });
    }

    get [MavenGenerator.CONFIGURING]() {
        return this.asConfiguringTaskGroup({
            ...super.configuring,
            async configuringTemplateTask() {},
        });
    }

    get [MavenGenerator.COMPOSING]() {
        return this.asComposingTaskGroup({
            ...super.composing,
            async composingTemplateTask() {},
        });
    }

    get [MavenGenerator.LOADING]() {
        return this.asLoadingTaskGroup({
            ...super.loading,
            async loadingTemplateTask() {},
        });
    }

    get [MavenGenerator.PREPARING]() {
        return this.asPreparingTaskGroup({
            ...super.preparing,
            async preparingTemplateTask() {},
        });
    }

    get [MavenGenerator.CONFIGURING_EACH_ENTITY]() {
        return this.asConfiguringEachEntityTaskGroup({
            ...super.configuringEachEntity,
            async configuringEachEntityTemplateTask() {},
        });
    }

    get [MavenGenerator.LOADING_ENTITIES]() {
        return this.asLoadingEntitiesTaskGroup({
            ...super.loadingEntities,
            async loadingEntitiesTemplateTask() {},
        });
    }

    get [MavenGenerator.PREPARING_EACH_ENTITY]() {
        return this.asPreparingEachEntityTaskGroup({
            ...super.preparingEachEntity,
            async preparingEachEntityTemplateTask() {},
        });
    }

    get [MavenGenerator.PREPARING_EACH_ENTITY_FIELD]() {
        return this.asPreparingEachEntityFieldTaskGroup({
            ...super.preparingEachEntityField,
            async preparingEachEntityFieldTemplateTask() {},
        });
    }

    get [MavenGenerator.PREPARING_EACH_ENTITY_RELATIONSHIP]() {
        return this.asPreparingEachEntityRelationshipTaskGroup({
            ...super.preparingEachEntityRelationship,
            async preparingEachEntityRelationshipTemplateTask() {},
        });
    }

    get [MavenGenerator.POST_PREPARING_EACH_ENTITY]() {
        return this.asPostPreparingEachEntityTaskGroup({
            ...super.postPreparingEachEntity,
            async postPreparingEachEntityTemplateTask() {},
        });
    }

    get [MavenGenerator.DEFAULT]() {
        return this.asDefaultTaskGroup({
            ...super.default,
            async defaultTemplateTask() {},
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
            async writingEntitiesTemplateTask() {},
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
            async postWritingEntitiesTemplateTask() {},
        });
    }

    get [MavenGenerator.LOADING_TRANSLATIONS]() {
        return this.asLoadingTranslationsTaskGroup({
            ...super.loadingTranslations,
            async loadingTranslationsTemplateTask() {},
        });
    }

    get [MavenGenerator.INSTALL]() {
        return this.asInstallTaskGroup({
            ...super.install,
            async installTemplateTask() {},
        });
    }

    get [MavenGenerator.POST_INSTALL]() {
        return this.asPostInstallTaskGroup({
            ...super.postInstall,
            async postInstallTemplateTask() {},
        });
    }

    get [MavenGenerator.END]() {
        return this.asEndTaskGroup({
            ...super.end,
            async endTemplateTask() {},
        });
    }
}
