import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';

export default class extends BaseApplicationGenerator {
    // Use custom templates only
    customLifecycle = true;
    constructor(args, opts, features) {
        super(args, opts, { ...features, sbsBlueprint: true });
    }
}
