import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { javaTestPackageTemplatesBlock } from 'generator-jhipster/generators/java/support';

export default class extends BaseApplicationGenerator {
    constructor(args, opts, features) {
        super(args, opts, { ...features, sbsBlueprint: true });
    }

    get [BaseApplicationGenerator.WRITING_ENTITIES]() {
        return this.asEndTaskGroup({
            async writingEntities({ application, entities }) {
                for (const entity of entities.filter(entity => !entity.skipServer && !entity.builtIn)) {
                    await this.writeFiles({
                        blocks: [
                            javaTestPackageTemplatesBlock({
                                templates: [
                                    '_entityPackage_/domain/_persistClass_Asserts.java',
                                    '_entityPackage_/domain/_persistClass_Test.java',
                                    '_entityPackage_/domain/_persistClass_TestSamples.java',
                                ],
                            }),
                        ],
                        context: { ...application, ...entity },
                    });
                }
            },
        });
    }
}
