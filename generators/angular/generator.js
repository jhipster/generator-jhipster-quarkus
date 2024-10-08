import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';

export default class extends BaseApplicationGenerator {
    constructor(args, opts, features) {
        super(args, opts, { ...features, queueCommandTasks: true, sbsBlueprint: true });
    }

    get [BaseApplicationGenerator.POST_WRITING]() {
        return this.asPostWritingTaskGroup({
            async customize({ application }) {
                this.editFile(`${application.clientSrcDir}app/admin/configuration/configuration.component.html`, content =>
                    content.replace(
                        '<h3 id="spring-configuration">Spring configuration</h3>',
                        '<h3 id="Quarkus-configuration">Quarkus configuration</h3>',
                    ),
                );

                // Remove health modal
                // TODO node 16 support is kept for workflow diff, drop after first merge
                this.deleteDestination(`${application.clientSrcDir}app/admin/health/modal/**`);
                /*
                TODO enable at node 18, breaks at node 16
                await this.pipeline(
                    {
                        refresh: true,
                        filter: file => file.path.startsWith(this.destinationPath(`${application.clientSrcDir}app/admin/health/modal/`)),
                    },
                    Duplex.from(async function (generator) {
                        for await (const file of generator) {
                            // Ignore files.
                        }
                    }),
                );
                */
            },
        });
    }
}
