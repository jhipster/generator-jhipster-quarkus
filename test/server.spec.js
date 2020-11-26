const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const constants = require('generator-jhipster/generators/generator-constants');

const expectedFiles = require('./utils/expected-files');

const { SERVER_MAIN_RES_DIR } = constants;

describe('Subgenerator server of quarkus JHipster blueprint', () => {
    describe('With monolith Maven Mysql', () => {
        before(buildGeneratorContext());

        it('creates expected files for default configuration for server generator', () => {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.hibernateServer);
            assert.file(expectedFiles.maven);
        });

        it('pom.xml contains health check dependency', () => {
            assert.fileContent(
                'pom.xml',
                '        <dependency>\n' +
                    '            <groupId>io.quarkus</groupId>\n' +
                    '            <artifactId>quarkus-smallrye-health</artifactId>\n' +
                    '        </dependency>'
            );
        });

        it('second cache level property is true', () => {
            assert.fileContent(`${SERVER_MAIN_RES_DIR}application.properties`, 'quarkus.hibernate-orm.second-level-caching-enabled=true');
        });
    });

    describe('With monolith Maven no db', () => {
        before(
            buildGeneratorContext({
                databaseType: 'no',
                devDatabaseType: 'no',
                prodDatabaseType: 'no'
            })
        );

        it('creates expected files for default configuration for server generator', () => {
            assert.file(expectedFiles.server);
            assert.noFile(expectedFiles.hibernateServer);
            assert.file(expectedFiles.maven);
        });
    });

    describe('With maven Mysql no second cache level', () => {
        before(
            buildGeneratorContext({
                enableHibernateCache: false
            })
        );

        it('creates expected files for default configuration for server generator', () => {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.maven);
        });

        it('second cache level property is false', () => {
            assert.fileContent(`${SERVER_MAIN_RES_DIR}application.properties`, 'quarkus.hibernate-orm.second-level-caching-enabled=false');
        });
    });
});

function buildGeneratorContext(prompts) {
    return done => {
        helpers
            .run('generator-jhipster/generators/server')
            .withOptions({
                'from-cli': true,
                skipInstall: true,
                blueprint: 'quarkus',
                skipChecks: true
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
                enableHibernateCache: true,
                rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5',
                ...prompts
            })
            .on('end', done);
    };
}
