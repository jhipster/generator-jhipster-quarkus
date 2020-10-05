const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const constants = require('generator-jhipster/generators/generator-constants');

const ANGULAR_DIR = constants.ANGULAR_DIR;

describe('Subgenerator client of quarkus JHipster blueprint', () => {
    describe('Angular tests', () => {
        before(initTests('angularX'));

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
        before(initTests('react'));

        it('React health check files contain expected content', () => {
            assert.fileContent(`${ANGULAR_DIR}modules/administration/health/health.tsx`, '<td>{data[configPropKey].name}</td>');
        });
    });

    function initTests(framework) {
        return done => {
            helpers
                .run('generator-jhipster/generators/client')
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'quarkus',
                    skipChecks: true
                })
                .withGenerators([
                    [
                        require('../generators/client/index.js'), // eslint-disable-line global-require
                        'jhipster-quarkus:client',
                        path.join(__dirname, '../generators/client/index.js')
                    ]
                ])
                .withPrompts({
                    baseName: 'jhipster',
                    clientFramework: framework,
                    enableTranslation: true,
                    nativeLanguage: 'en',
                    languages: ['fr']
                })
                .on('end', done);
        };
    }
});
