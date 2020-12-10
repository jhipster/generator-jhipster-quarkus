const assert = require('yeoman-assert');

const { buildCommonGeneratorContext } = require('./utils/generator-testing-api');

describe('Subgenerator common of quarkus JHipster blueprint', () => {
    describe('with Quarkus blueprint config', () => {
        before(buildCommonGeneratorContext());

        it('README.md should contains Quarkus references', () => {
            assert.fileContent('README.md', /JHipster Quarkus/);
        });
    });
});
