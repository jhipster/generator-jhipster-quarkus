import { beforeAll, describe, expect, it } from 'vitest';

import { defaultHelpers as helpers, fromMatrix, result } from 'generator-jhipster/testing';

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
                })
                .withJHipsterGenerators()
                .withConfiguredBlueprint()
                .withBlueprintConfig();
        });

        it('should succeed', () => {
            expect(result.getStateSnapshot()).toMatchSnapshot();
        });
    });

    Object.entries(
        fromMatrix({ applicationType: ['gateway', 'microservice'], authenticationType: ['jwt', 'oauth2'], buildTool: ['maven', 'gradle'] }),
    ).forEach(([name, config]) => {
        describe(`run with ${name} and mongodb`, () => {
            beforeAll(async function () {
                await helpers
                    .run(SUB_GENERATOR_NAMESPACE)
                    .withJHipsterConfig({
                        databaseType: 'mongodb',
                        ...config,
                    })
                    .withOptions({
                        ignoreNeedlesError: true,
                    })
                    .withJHipsterGenerators()
                    .withConfiguredBlueprint()
                    .withBlueprintConfig();
            });

            it('should succeed', () => {
                expect(result.getStateSnapshot()).toMatchSnapshot();
            });
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
                })
                .withJHipsterGenerators()
                .withConfiguredBlueprint()
                .withBlueprintConfig();
        });

        it('should succeed', () => {
            expect(result.getStateSnapshot()).toMatchSnapshot();
        });
    });

    describe('entity with a text blob field on postgresql', () => {
        beforeAll(async function () {
            await helpers
                .run(SUB_GENERATOR_NAMESPACE)
                .withJHipsterConfig(
                    {
                        creationTimestamp: 1596513172471,
                        prodDatabaseType: 'postgresql',
                    },
                    [
                        {
                            name: 'Note',
                            fields: [
                                {
                                    fieldName: 'content',
                                    fieldType: 'byte[]',
                                    fieldTypeBlobContent: 'text',
                                },
                            ],
                        },
                    ],
                )
                .withOptions({
                    reproducible: true,
                    ignoreNeedlesError: true,
                })
                .withJHipsterGenerators()
                .withConfiguredBlueprint()
                .withBlueprintConfig();
        });

        it('should use JdbcTypeCode(SqlTypes.LONGVARCHAR) instead of Lob and Type', () => {
            result.assertFileContent(
                'src/main/java/com/mycompany/myapp/domain/Note.java',
                'import org.hibernate.annotations.JdbcTypeCode;',
            );
            result.assertFileContent('src/main/java/com/mycompany/myapp/domain/Note.java', 'import org.hibernate.type.SqlTypes;');
            result.assertFileContent('src/main/java/com/mycompany/myapp/domain/Note.java', '@JdbcTypeCode(SqlTypes.LONGVARCHAR)');
            result.assertNoFileContent('src/main/java/com/mycompany/myapp/domain/Note.java', '@Lob');
            result.assertNoFileContent('src/main/java/com/mycompany/myapp/domain/Note.java', 'org.hibernate.annotations.Type');
        });
    });

    describe('entity with a UUID and text blob field on mysql', () => {
        beforeAll(async function () {
            await helpers
                .run(SUB_GENERATOR_NAMESPACE)
                .withJHipsterConfig(
                    {
                        creationTimestamp: 1596513172471,
                        prodDatabaseType: 'mysql',
                        devDatabaseType: 'mysql',
                    },
                    [
                        {
                            name: 'Note',
                            fields: [
                                {
                                    fieldName: 'externalId',
                                    fieldType: 'UUID',
                                },
                                {
                                    fieldName: 'content',
                                    fieldType: 'byte[]',
                                    fieldTypeBlobContent: 'text',
                                },
                            ],
                        },
                    ],
                )
                .withOptions({
                    reproducible: true,
                    ignoreNeedlesError: true,
                })
                .withJHipsterGenerators()
                .withConfiguredBlueprint()
                .withBlueprintConfig();
        });

        it('should use JdbcTypeCode(SqlTypes.VARCHAR) for UUID and Lob for text blob', () => {
            result.assertFileContent(
                'src/main/java/com/mycompany/myapp/domain/Note.java',
                'import org.hibernate.annotations.JdbcTypeCode;',
            );
            result.assertFileContent('src/main/java/com/mycompany/myapp/domain/Note.java', 'import org.hibernate.type.SqlTypes;');
            result.assertFileContent('src/main/java/com/mycompany/myapp/domain/Note.java', '@JdbcTypeCode(SqlTypes.VARCHAR)');
            result.assertFileContent('src/main/java/com/mycompany/myapp/domain/Note.java', '@Lob');
            result.assertNoFileContent('src/main/java/com/mycompany/myapp/domain/Note.java', 'org.hibernate.annotations.Type');
        });
    });
});
