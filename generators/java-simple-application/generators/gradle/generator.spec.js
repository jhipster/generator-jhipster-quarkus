import { beforeAll, describe, expect, it } from 'vitest';

import { defaultHelpers as helpers, result } from 'generator-jhipster/testing';

const SUB_GENERATOR = 'java-simple-application:gradle';
const BLUEPRINT_NAMESPACE = `jhipster:${SUB_GENERATOR}`;

describe('SubGenerator java-simple-application:gradle of quarkus JHipster blueprint', () => {
    describe('run', () => {
        beforeAll(async function () {
            await helpers
                .run(BLUEPRINT_NAMESPACE)
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
