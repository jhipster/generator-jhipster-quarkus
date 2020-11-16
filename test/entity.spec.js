const assert = require('yeoman-assert');
const constants = require('generator-jhipster/generators/generator-constants');
const expectedFiles = require('./utils/expected-files').entity;
const { buildEntityGeneratorContext } = require('./utils/generator-testing-api');

const { SERVER_MAIN_SRC_DIR } = constants;

describe('Subgenerator entity of quarkus JHipster blueprint', () => {
    describe('with default options (no repository, no service, no dto, no pagination)', () => {
        before(buildEntityGeneratorContext());

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
        it('contains javax persistence cache annotation', () => {
            assert.fileContent(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Foo.java`, '@Cacheable');
        });
    });
    describe('with repository and no hibernate second level cache', () => {
        before(buildEntityGeneratorContext({ dataAccess: 'repository' }, {}, 'ngx-nocache'));

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
        it('not contains javax persistence cache annotation', () => {
            assert.noFileContent(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Foo.java`, '@Cacheable');
        });
    });

    describe('with dto', () => {
        before(buildEntityGeneratorContext({ dto: 'mapstruct', service: 'serviceClass', pagination: 'no' }, {}));

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
        before(buildEntityGeneratorContext({ dto: 'mapstruct', service: 'serviceImpl', pagination: 'no' }, {}));

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
    describe('with pagination and readOnly', () => {
        before(buildEntityGeneratorContext({ pagination: 'pagination', readOnly: true }, {}));

        it('creates expected pagination file', () => {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.fakeData);
            assert.file(expectedFiles.serverLiquibase);

            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/Paged.java`);
            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/vm/PageRequestVM.java`);
            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/vm/SortRequestVM.java`);
            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/util/PaginationUtil.java`);
        });
        it('update Web finder signature', () => {
            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/FooResource.java`,
                'public Response getAllFoos(@BeanParam PageRequestVM pageRequest, @BeanParam SortRequestVM sortRequest, @Context UriInfo uriInfo)'
            );
        });
        it('contains READ_ONLY Hibernate cache annotation', () => {
            assert.noFileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Foo.java`,
                '@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)'
            );
        });
    });
    describe('with pagination(infinite-scroll), service and dto', () => {
        before(buildEntityGeneratorContext({ dto: 'mapstruct', service: 'serviceClass', pagination: 'infinite-scroll' }, {}));

        it('creates expected infinite-scroll file', () => {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.fakeData);
            assert.file(expectedFiles.serverLiquibase);

            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/Paged.java`);
            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/vm/PageRequestVM.java`);
            assert.file(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/vm/SortRequestVM.java`);
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
