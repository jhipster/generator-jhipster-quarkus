const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('Subgenerator languages of quarkus JHipster blueprint', () => {
    describe('Sample test', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/languages')
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, '../test/templates/ngx-blueprint'), dir);
                })
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'quarkus',
                    skipChecks: true
                })
                .withGenerators([
                    [
                        require('../generators/languages'), // eslint-disable-line global-require
                        'jhipster-quarkus:languages',
                        path.join(__dirname, '../generators/languages/index.js')
                    ]
                ])
                .withPrompts({
                    baseName: 'sampleMysql',
                    packageName: '<%=packageName%>',
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
                    rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5'
                })
                .on('end', done);
        });

        it('it works', () => {
            // Adds your tests here
            assert.textEqual('Write your own tests!', 'Write your own tests!');
        });
    });
});
