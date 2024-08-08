import { beforeAll, describe, expect, it } from 'vitest';

import { defaultHelpers as helpers, result } from 'generator-jhipster/testing';

const SUB_GENERATOR = 'quarkus';
const SUB_GENERATOR_NAMESPACE = `jhipster-quarkus:${SUB_GENERATOR}`;

describe('SubGenerator quarkus of quarkus JHipster blueprint', () => {
    describe('run', () => {
        beforeAll(async function () {
            await helpers
                .run(SUB_GENERATOR_NAMESPACE)
                .withJHipsterConfig()
                .withOptions({
                    ignoreNeedlesError: true,
                    blueprints: 'quarkus',
                })
                .withJHipsterLookup()
                .withParentBlueprintLookup();
        });

        it('should succeed', () => {
            expect(result.getStateSnapshot()).toMatchSnapshot();
        });
    });
    describe('run with oauth2 and mongodb', () => {
        beforeAll(async function () {
            await helpers
                .run(SUB_GENERATOR_NAMESPACE)
                .withJHipsterConfig({
                    applicationType: 'gateway',
                    buildTool: 'gradle',
                    authenticationType: 'oauth2',
                    databaseType: 'mongodb',
                })
                .withOptions({
                    ignoreNeedlesError: true,
                    blueprints: 'quarkus',
                })
                .withJHipsterLookup()
                .withParentBlueprintLookup();
        });

        it('should succeed', () => {
            expect(result.getStateSnapshot()).toMatchSnapshot();
        });
    });

    describe('with some entities', () => {
        beforeAll(async function () {
            await helpers
                .run(SUB_GENERATOR_NAMESPACE)
                .withJHipsterConfig(
                    {
                        creationTimestamp: 1596513172471,
                    },
                    [
                        {
                            name: 'Entity',
                            dto: 'mapstruct',
                            fields: [
                                {
                                    fieldName: 'name',
                                    fieldType: 'String',
                                },
                            ],
                        },
                    ],
                )
                .withOptions({
                    reproducible: true,
                    ignoreNeedlesError: true,
                    blueprints: 'quarkus',
                })
                .withJHipsterLookup()
                .withParentBlueprintLookup();
        });

        it('should succeed', () => {
            expect(result.getStateSnapshot()).toMatchSnapshot();
        });
    });
});
