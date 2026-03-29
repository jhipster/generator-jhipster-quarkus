import { beforeAll, describe, expect, it } from 'vitest';

import { defaultHelpers as helpers, result } from 'generator-jhipster/testing';

const SUB_GENERATOR = 'quarkus:bootstrap';
const SUB_GENERATOR_NAMESPACE = `jhipster-quarkus:${SUB_GENERATOR}`;

describe('SubGenerator quarkus:bootstrap of quarkus JHipster blueprint', () => {
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
});
