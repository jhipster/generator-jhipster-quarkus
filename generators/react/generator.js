import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';

export default class extends BaseApplicationGenerator {
    constructor(args, opts, features) {
        super(args, opts, { ...features, queueCommandTasks: true, sbsBlueprint: true });
    }

    get [BaseApplicationGenerator.POST_WRITING]() {
        return this.asPostWritingTaskGroup({
            async postWritingTemplateTask({ application }) {
                if (application.withAdminUi) {
                    this.editFile(`${application.clientSrcDir}app/modules/administration/configuration/configuration.tsx`, content =>
                        content.replace('<label>Spring configuration</label>', '<label>Quarkus configuration</label>'),
                    );

                    this.deleteDestination(`${application.clientSrcDir}app/modules/administration/health/health-modal.tsx`);
                }
            },
        });
    }
}
