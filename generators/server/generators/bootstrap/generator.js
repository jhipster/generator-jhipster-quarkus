import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';

export default class extends BaseApplicationGenerator {
    constructor(args, opts, features) {
        super(args, opts, { ...features, sbsBlueprint: true });
    }

    get [BaseApplicationGenerator.CONFIGURING]() {
        return this.asConfiguringTaskGroup({
            async configuring() {
                this.jhipsterConfig.backendType = 'Quarkus';
            },
        });
    }

    get [BaseApplicationGenerator.COMPOSING]() {
        return this.asComposingTaskGroup({
            async composing() {
                await this.composeWith('jhipster-quarkus:quarkus:bootstrap');
            },
        });
    }
}
