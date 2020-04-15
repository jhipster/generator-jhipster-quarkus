const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const constants = require('generator-jhipster/generators/generator-constants');
const expectedFiles = require('./utils/expected-files').entity;

// const CLIENT_MAIN_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR;
const SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;
// const SERVER_MAIN_RES_DIR = constants.SERVER_MAIN_RES_DIR;
// const SERVER_TEST_SRC_DIR = constants.SERVER_TEST_SRC_DIR;

describe('Subgenerator entity-server of quarkus JHipster blueprint', () => {
    describe('With no repository, no service, no dto', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/entity')
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, '../test/templates/ngx-blueprint'), dir);
                })
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'quarkus',
                    skipChecks: true,
                    creationTimestamp: '2019-11-06'
                })
                .withGenerators([
                    [
                        require('../generators/entity-server'), // eslint-disable-line global-require
                        'generator-jhipster-quarkus:entity-server',
                        path.join(__dirname, '../generators/entity-server/index.js')
                    ]
                ])
                .withArguments(['foo'])
                .withPrompts({
                    fieldAdd: false,
                    relationshipAdd: false,
                    repository: 'no',
                    dto: 'no',
                    service: 'no',
                    pagination: 'infinite-scroll'
                })
                .on('end', done);
        });

        it('creates expected entity as active record and resources files', () => {
            // Adds your tests here
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.fakeData);
            assert.file(expectedFiles.serverLiquibase);

            assert.noFile(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/repository/FooRepository.java`);

            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Foo.java`,
                'public class Foo extends PanacheEntityBase implements Serializable'
            );
        });
    });
    describe('With repository, no service, no dto', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/entity')
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, '../test/templates/ngx-blueprint'), dir);
                })
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'quarkus',
                    skipChecks: true,
                    creationTimestamp: '2019-11-06'
                })
                .withGenerators([
                    [
                        require('../generators/entity-server'), // eslint-disable-line global-require
                        'generator-jhipster-quarkus:entity-server',
                        path.join(__dirname, '../generators/entity-server/index.js')
                    ]
                ])
                .withArguments(['foo'])
                .withPrompts({
                    fieldAdd: false,
                    relationshipAdd: false,
                    repository: 'yes',
                    dto: 'no',
                    service: 'no',
                    pagination: 'infinite-scroll'
                })
                .on('end', done);
        });

        it('creates expected entity with the corresponding repository', () => {
            // Adds your tests here
            assert.file([`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/repository/FooRepository.java`, ...expectedFiles.server]);

            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/repository/FooRepository.java`,
                'public class FooRepository implements PanacheRepository<Foo>'
            );
        });
    });
});
