const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const constants = require('generator-jhipster/generators/generator-constants');
const expectedFiles = require('./utils/expected-files');

const SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;

describe('Subgenerator server of quarkus JHipster blueprint', () => {
    describe('Sample test', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/server')
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'quarkus',
                    skipChecks: true,
                    skipClient: false
                })
                .withGenerators([
                    [
                        require('../generators/server'), // eslint-disable-line global-require
                        'jhipster-quarkus:server',
                        path.join(__dirname, '../generators/server/index.js')
                    ]
                ])
                .withPrompts({
                    baseName: 'sampleMysql',
                    packageName: 'com.mycompany.myapp',
                    applicationType: 'monolith',
                    databaseType: 'sql',
                    devDatabaseType: 'h2Disk',
                    prodDatabaseType: 'mysql',
                    cacheProvider: 'ehcache',
                    authenticationType: 'session',
                    enableTranslation: true,
                    nativeLanguage: 'en',
                    languages: ['fr', 'de'],
                    buildTool: 'maven',
                    skipClient: false,
                    rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5'
                })
                .on('end', done);
        });

        it('creates expected files for default configuration for server generator', () => {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.maven);
        });
    });

    describe('SkipClient test', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/server')
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'quarkus',
                    skipChecks: true,
                    skipClient: true
                })
                .withGenerators([
                    [
                        require('../generators/server'), // eslint-disable-line global-require
                        'jhipster-quarkus:server',
                        path.join(__dirname, '../generators/server/index.js')
                    ]
                ])
                .withPrompts({
                    baseName: 'sampleMysql',
                    packageName: 'com.mycompany.myapp',
                    applicationType: 'monolith',
                    databaseType: 'sql',
                    devDatabaseType: 'h2Disk',
                    prodDatabaseType: 'mysql',
                    cacheProvider: 'ehcache',
                    authenticationType: 'session',
                    enableTranslation: true,
                    nativeLanguage: 'en',
                    languages: ['fr', 'de'],
                    buildTool: 'maven',
                    skipClient: true,
                    rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5'
                })
                .on('end', done);
        });

        it('doesnt generate skipped server files', () => {
            assert.noFile(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/SpaFilter.java`);
        });
    });
});
