import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';

export default class extends BaseApplicationGenerator {
    constructor(args, opts, features) {
        super(args, opts, { ...features, sbsBlueprint: true });
    }

    get [BaseApplicationGenerator.POST_WRITING]() {
        return this.asPostWritingTaskGroup({
            customize({ application }) {
                if (application.authenticationTypeOauth2) {
                    this.editFile(`${application.cypressDir}support/oauth2.ts`, content =>
                        content.replace(
                            `
        followRedirect: false,
        form: true,`,
                            `
        followRedirect: true,
        form: true,`,
                        ),
                    );
                }
            },
            async postWritingTemplateTask() {},
        });
    }
}
