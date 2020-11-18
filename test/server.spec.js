const assert = require('yeoman-assert');
const constants = require('generator-jhipster/generators/generator-constants');

const { buildServerGeneratorContext } = require('./utils/generator-testing-api');
const expectedFiles = require('./utils/expected-files');

const { SERVER_MAIN_SRC_DIR, SERVER_MAIN_RES_DIR } = constants;

describe('Subgenerator server of quarkus JHipster blueprint', () => {
    describe('With monolith Maven Mysql', () => {
        before(buildServerGeneratorContext());

        it('creates expected files for default configuration for server generator', () => {
            assert.file(expectedFiles.server);
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

        it('User and Authority cache properties are set', () => {
            assert.noFileContent(
                `${SERVER_MAIN_RES_DIR}application.properties`,
                'quarkus.cache.caffeine."usersByEmail".maximum-size=100\n' +
                    'quarkus.cache.caffeine."usersByEmail".expire-after-write=3600S\n' +
                    'quarkus.cache.caffeine."usersByLogin".maximum-size=100\n' +
                    'quarkus.cache.caffeine."usersByLogin".expire-after-write=3600S'
            );
        });

        it('contains hibernate second level cache needle', () => {
            assert.fileContent(`${SERVER_MAIN_RES_DIR}application.properties`, '# jhipster-quarkus-needle-hibernate-cache-add-entry');
        });
    });

    describe('With monolith Gradle Mysql', () => {
        before(
            buildServerGeneratorContext({
                buildTool: 'gradle',
                cacheProvider: 'caffeine'
            })
        );

        it('creates expected files for default configuration for server generator', () => {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.gradle);
        });

        it('build.gradle contains health check dependency', () => {
            assert.fileContent('build.gradle', "implementation 'io.quarkus:quarkus-cache'");
        });
    });

    describe('With maven Mysql no second cache level', () => {
        before(
            buildServerGeneratorContext({
                enableHibernateCache: false
            })
        );

        it('creates expected files for default configuration for server generator', () => {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.maven);
            assert.file(expectedFiles.docker);
        });

        it('second cache level property is false', () => {
            assert.fileContent(`${SERVER_MAIN_RES_DIR}application.properties`, 'quarkus.hibernate-orm.second-level-caching-enabled=false');
        });
    });

    describe('With maven Mysql and caffeine cache', () => {
        before(
            buildServerGeneratorContext({
                cacheProvider: 'caffeine'
            })
        );

        it('should pom.xml contains Quarkus cache dependency', () => {
            assert.fileContent(
                'pom.xml',
                '        <dependency>\n' +
                    '            <groupId>io.quarkus</groupId>\n' +
                    '            <artifactId>quarkus-cache</artifactId>\n' +
                    '        </dependency>'
            );
        });

        it('should UserService contains cache implementation', () => {
            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/UserService.java`,
                'import io.quarkus.cache.CacheInvalidate;'
            );

            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/UserService.java`,
                '@CacheInvalidate(cacheName = User.USERS_BY_EMAIL_CACHE)'
            );

            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/UserService.java`,
                '@CacheInvalidate(cacheName = User.USERS_BY_LOGIN_CACHE)'
            );
        });

        it('Quarkus caffeine cache is enabled', () => {
            assert.fileContent(`${SERVER_MAIN_RES_DIR}application.properties`, 'quarkus.cache.enabled=true');
            assert.fileContent(`${SERVER_MAIN_RES_DIR}application.properties`, 'quarkus.cache.type=caffeine');
        });

        it('User and Authority cache properties are set', () => {
            assert.fileContent(
                `${SERVER_MAIN_RES_DIR}application.properties`,
                'quarkus.cache.caffeine."usersByEmail".maximum-size=100\n' +
                    'quarkus.cache.caffeine."usersByEmail".expire-after-write=3600S\n' +
                    'quarkus.cache.caffeine."usersByLogin".maximum-size=100\n' +
                    'quarkus.cache.caffeine."usersByLogin".expire-after-write=3600S'
            );
        });
    });

    describe('With maven Mysql and no cache', () => {
        before(
            buildServerGeneratorContext({
                cacheProvider: 'no'
            })
        );

        it('should pom.xml not contains Quarkus cache dependency', () => {
            assert.noFileContent(
                'pom.xml',
                '        <dependency>\n' +
                    '            <groupId>io.quarkus</groupId>\n' +
                    '            <artifactId>quarkus-cache</artifactId>\n' +
                    '        </dependency>'
            );
        });

        it('should UserService not contains cache implementation', () => {
            assert.noFileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/UserService.java`,
                'import io.quarkus.cache.CacheInvalidate;'
            );

            assert.noFileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/UserService.java`,
                '@CacheInvalidate(cacheName = User.USERS_BY_EMAIL_CACHE)'
            );

            assert.noFileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/UserService.java`,
                '@CacheInvalidate(cacheName = User.USERS_BY_LOGIN_CACHE)'
            );
        });
    });
});
