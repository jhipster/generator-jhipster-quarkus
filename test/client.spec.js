const assert = require('yeoman-assert');
const constants = require('generator-jhipster/generators/generator-constants');

const { buildClientGeneratorContext } = require('./utils/generator-testing-api');

const ANGULAR_DIR = constants.ANGULAR_DIR;

describe('Subgenerator client of quarkus JHipster blueprint', () => {
    describe('Angular tests', () => {
        before(buildClientGeneratorContext());

        it('Angular health check files contain expected content', () => {
            assert.fileContent(
                `${ANGULAR_DIR}admin/health/health.component.html`,
                '<tr *ngFor="let componentHealth of health.checks | keys">'
            );
            assert.fileContent(
                `${ANGULAR_DIR}admin/health/health.service.ts`,
                'export interface Health {\n' +
                    '    status: HealthStatus;\n' +
                    '    checks: {\n' +
                    '        [key in HealthKey]?: HealthDetails;\n' +
                    '    };\n' +
                    '}'
            );
        });
    });

    describe('React tests', () => {
        before(buildClientGeneratorContext({ clientFramework: 'react' }));

        it('React health check files contain expected content', () => {
            assert.fileContent(`${ANGULAR_DIR}modules/administration/health/health.tsx`, '<td>{data[configPropKey].name}</td>');
        });
    });
});
