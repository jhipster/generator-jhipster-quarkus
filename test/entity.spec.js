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

describe('Subgenerator entity of quarkus JHipster blueprint', () => {
    describe('with default options (no repository, no service, no dto, no pagination)', () => {
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
                        require('../generators/entity'), // eslint-disable-line global-require
                        'jhipster-quarkus:entity',
                        path.join(__dirname, '../generators/entity/index.js')
                    ]
                ])
                .withArguments(['foo'])
                .withPrompts({
                    fieldAdd: false,
                    relationshipAdd: false,
                    dataAccess: 'activeRecord',
                    dto: 'no',
                    service: 'no',
                    pagination: 'no'
                })
                .on('end', done);
        });

        it('creates expected entity as active record and resources files', () => {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.fakeData);
            assert.file(expectedFiles.serverLiquibase);

            assert.noFile(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/repository/FooRepository.java`);
            assert.noFile(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/dto/FooDTO.java`);
            assert.noFile(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/dto/FooMapper.java`);
            assert.noFile(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/FooService.java`);
            assert.noFile(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/impl/FooServiceImpl.java`);

            assert.noFile(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/Paged.java`);
            assert.noFile(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/vm/PageRequest.java`);
            assert.noFile(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/util/PaginationUtil.java`);
        });
        it('generates an active record extending PanacheEntityBase', () => {
            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Foo.java`,
                'public class Foo extends PanacheEntityBase implements Serializable'
            );
        });
        it('stores the Active Record pattern choice', () => {
            assert.file('.jhipster/Foo.json');
            assert.fileContent('.jhipster/Foo.json', '"dataAccess": "activeRecord"');
        });
    });
    describe('with repository', () => {
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
                        require('../generators/entity'), // eslint-disable-line global-require
                        'jhipster-quarkus:entity',
                        path.join(__dirname, '../generators/entity/index.js')
                    ]
                ])
                .withArguments(['foo'])
                .withPrompts({
                    fieldAdd: false,
                    relationshipAdd: false,
                    dataAccess: 'repository',
                    dto: 'no',
                    service: 'no',
                    pagination: 'no'
                })
                .on('end', done);
        });

        it('creates expected entity with the corresponding repository', () => {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.fakeData);
            assert.file(expectedFiles.serverLiquibase);

            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/repository/FooRepository.java`);
        });
        it('generates a repository extending PanacheRepository', () => {
            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/repository/FooRepository.java`,
                'public class FooRepository implements PanacheRepository<Foo>'
            );
        });
        it('stores the Repository pattern choice', () => {
            assert.file('.jhipster/Foo.json');
            assert.fileContent('.jhipster/Foo.json', '"dataAccess": "repository"');
        });
    });

    describe('with dto', () => {
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
                        require('../generators/entity'), // eslint-disable-line global-require
                        'jhipster-quarkus:entity',
                        path.join(__dirname, '../generators/entity/index.js')
                    ]
                ])
                .withArguments(['foo'])
                .withPrompts({
                    fieldAdd: false,
                    relationshipAdd: false,
                    dataAccess: 'activeRecord',
                    dto: 'mapstruct',
                    service: 'serviceClass',
                    pagination: 'no'
                })
                .on('end', done);
        });

        it('creates expected entity with the corresponding dto', () => {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.fakeData);
            assert.file(expectedFiles.serverLiquibase);

            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/dto/FooDTO.java`);
            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/mapper/FooMapper.java`);
        });
        it('generate a proper DTO class and mapper', () => {
            assert.fileContent(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/dto/FooDTO.java`, 'public class FooDTO');
            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/mapper/FooMapper.java`,
                'public interface FooMapper extends EntityMapper<FooDTO, Foo>'
            );
        });
    });
    describe('with dto and service interface and service implementation', () => {
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
                        require('../generators/entity'), // eslint-disable-line global-require
                        'jhipster-quarkus:entity',
                        path.join(__dirname, '../generators/entity/index.js')
                    ]
                ])
                .withArguments(['foo'])
                .withPrompts({
                    fieldAdd: false,
                    relationshipAdd: false,
                    dataAccess: 'activeRecord',
                    dto: 'mapstruct',
                    service: 'serviceImpl',
                    pagination: 'no'
                })
                .on('end', done);
        });

        it('creates expected entity with the corresponding dto', () => {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.fakeData);
            assert.file(expectedFiles.serverLiquibase);

            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/FooService.java`);
            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/impl/FooServiceImpl.java`);
        });
        it('generate service interface and implementation', () => {
            assert.fileContent(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/FooService.java`, 'public interface FooService');
            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/impl/FooServiceImpl.java`,
                'public class FooServiceImpl implements FooService'
            );
        });
    });
    describe('with pagination', () => {
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
                        require('../generators/entity'), // eslint-disable-line global-require
                        'jhipster-quarkus:entity',
                        path.join(__dirname, '../generators/entity/index.js')
                    ]
                ])
                .withArguments(['foo'])
                .withPrompts({
                    fieldAdd: false,
                    relationshipAdd: false,
                    dataAccess: 'activeRecord',
                    dto: 'no',
                    service: 'no',
                    pagination: 'pagination'
                })
                .on('end', done);
        });

        it('creates expected pagination file', () => {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.fakeData);
            assert.file(expectedFiles.serverLiquibase);

            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/Paged.java`);
            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/vm/PageRequestVM.java`);
            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/util/PaginationUtil.java`);
        });
        it('update Web finder signature', () => {
            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/FooResource.java`,
                'public Response getAllFoos(@BeanParam PageRequestVM pageRequest, @Context UriInfo uriInfo)'
            );
        });
    });
    describe('with pagination(infinite-scroll), service and dto', () => {
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
                        require('../generators/entity'), // eslint-disable-line global-require
                        'jhipster-quarkus:entity',
                        path.join(__dirname, '../generators/entity/index.js')
                    ]
                ])
                .withArguments(['foo'])
                .withPrompts({
                    fieldAdd: false,
                    relationshipAdd: false,
                    dataAccess: 'activeRecord',
                    dto: 'mapstruct',
                    service: 'serviceClass',
                    pagination: 'infinite-scroll'
                })
                .on('end', done);
        });

        it('creates expected pagination file', () => {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.fakeData);
            assert.file(expectedFiles.serverLiquibase);

            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/Paged.java`);
            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/vm/PageRequestVM.java`);
            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/util/PaginationUtil.java`);
        });
        it('update service finder signature', () => {
            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/FooService.java`,
                'public Paged<FooDTO> findAll(Page page)'
            );
        });
    });
});
