const assert = require('yeoman-assert');
const constants = require('generator-jhipster/generators/generator-constants');

const { buildClientGeneratorContext } = require('./utils/generator-testing-api');

const { ANGULAR_DIR, REACT_DIR } = constants;

describe('Subgenerator client of quarkus JHipster blueprint', () => {
    describe('Angular tests', () => {
        before(buildClientGeneratorContext());

        it('Angular health check files contain expected content', () => {
            assert.noFileContent(`${ANGULAR_DIR}admin/health/health.component.html`, 'components');
            assert.noFileContent(`${ANGULAR_DIR}admin/health/health.component.spec.ts`, 'components');
            assert.noFileContent(`${ANGULAR_DIR}admin/health/health.model.ts`, 'components');
            assert.noFileContent(`${ANGULAR_DIR}admin/health/health.service.ts`, 'components');
        });

        it('Angular configuration files contain expected content', () => {
            assert.fileContent(`${ANGULAR_DIR}admin/configuration/configuration.component.html`, 'Quarkus configuration</h3>');
        });
    });

    describe('React tests', () => {
        before(buildClientGeneratorContext({ clientFramework: 'react' }));

        it('React health check files contain expected content', () => {
            assert.fileContent(`${ANGULAR_DIR}modules/administration/health/health.tsx`, 'health?.checks');
        });

        it('React configuration files contain expected content', () => {
            assert.fileContent(
                `${REACT_DIR}modules/administration/configuration/configuration.tsx`,
                '<label>Quarkus configuration</label>'
            );
        });
    });
});
