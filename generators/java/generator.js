import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { javaTestPackageTemplatesBlock } from 'generator-jhipster/generators/java/support';

export default class extends BaseApplicationGenerator {
    constructor(args, opts, features) {
        super(args, opts, { ...features, sbsBlueprint: true });
    }

    get [BaseApplicationGenerator.PREPARING_EACH_ENTITY_FIELD]() {
        return this.asPreparingEachEntityFieldTaskGroup({
            prepareField({ entity, field }) {
                if (!entity.skipServer) {
                    field.propertyGet = field.propertyName;
                    field.propertySet = value => `${field.propertyName} = ${value}`;
                }
            },
        });
    }

    get [BaseApplicationGenerator.PREPARING_EACH_ENTITY_RELATIONSHIP]() {
        return this.asPreparingEachEntityRelationshipTaskGroup({
            prepareField({ entity, relationship }) {
                if (!entity.skipServer) {
                    relationship.propertyGet = relationship.propertyName;
                    relationship.propertySet = value => `${relationship.propertyName} = ${value}`;
                }
            },
        });
    }

    get [BaseApplicationGenerator.POST_PREPARING_EACH_ENTITY]() {
        return this.asPreparingTaskGroup({
            async prepareQuarkusRendering({ entity }) {
                entity.primaryKey.propertyGet = entity.primaryKey.name;
                entity.primaryKey.propertySet = value => `${entity.primaryKey.name} = ${value}`;
            },
        });
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
