const assert = require('yeoman-assert');
const constants = require('generator-jhipster/generators/generator-constants');

const { buildServerGeneratorContext } = require('./utils/generator-testing-api');
const expectedFiles = require('./utils/expected-files');

const { SERVER_MAIN_SRC_DIR, SERVER_MAIN_RES_DIR, DOCKER_DIR } = constants;

describe('Subgenerator server of quarkus JHipster blueprint', () => {
    describe('With monolith Maven Mysql', () => {
        before(buildServerGeneratorContext());

        it('creates expected files for default configuration for server generator', () => {
            assert.file(expectedFiles.server.common);
            assert.file(expectedFiles.server.userManagement);
            assert.file(expectedFiles.server.hibernate);
            assert.file(expectedFiles.server.h2);
            assert.file(expectedFiles.maven);
            assert.noFile(expectedFiles.cache.common);
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
            assert.fileContent(
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
            assert.file(expectedFiles.server.common);
            assert.file(expectedFiles.gradle);
        });

        it('build.gradle contains health check dependency', () => {
            assert.fileContent('build.gradle', "implementation 'io.quarkus:quarkus-cache'");
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
            assert.file(expectedFiles.server.common);
            assert.file(expectedFiles.gradle);
        });

        it('build.gradle contains health check dependency', () => {
            assert.fileContent('build.gradle', "implementation 'io.quarkus:quarkus-cache'");
        });
    });

    describe('With monolith Maven no db', () => {
        before(
            buildServerGeneratorContext({
                databaseType: 'no',
                devDatabaseType: 'no',
                prodDatabaseType: 'no',
                skipUserManagement: true
            })
        );

        it('creates expected files for default configuration for server generator', () => {
            assert.file(expectedFiles.server.common);
            assert.noFile(expectedFiles.server.userManagement);
            assert.noFile(expectedFiles.server.hibernate);
            assert.noFile(expectedFiles.server.h2);
            assert.file(expectedFiles.maven);
        });
    });

    describe('With maven Mysql no second cache level', () => {
        before(
            buildServerGeneratorContext({
                enableHibernateCache: false
            })
        );

        it('creates expected files for default configuration for server generator', () => {
            assert.file(expectedFiles.server.common);
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

        it("don't create cache files", () => {
            assert.noFile(expectedFiles.cache.common);
        });

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

    describe('With maven Mysql and Redis cache', () => {
        before(
            buildServerGeneratorContext({
                cacheProvider: 'redis'
            })
        );

        it('should contains redis file', () => {
            assert.file(expectedFiles.cache.common);
            assert.file(expectedFiles.cache.redis);
        });

        it('should contains docker compose redis file from JHipster', () => {
            assert.file(`${DOCKER_DIR}redis.yml`);
            assert.file(`${DOCKER_DIR}redis-cluster.yml`);
            assert.file(`${DOCKER_DIR}redis/connectRedisCluster.sh`);
            assert.file(`${DOCKER_DIR}redis/Redis-Cluster.Dockerfile`);
        });

        it('should contains redis code in UserService', () => {
            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/UserService.java`,
                '        List <Object> keys = new ArrayList<>();\n' +
                    '        keys.add(user.login);\n' +
                    '\n' +
                    '        if (user.email != null) {\n' +
                    '            keys.add(user.email);\n' +
                    '        }\n' +
                    '\n' +
                    '        userRedisCache.evict(keys);'
            );

            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/UserService.java`,
                'return userRedisCache.get(login, () -> User.findOneWithAuthoritiesByLogin(login));'
            );

            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/UserService.java`,
                '    @Inject\n    UserRedisCache userRedisCache;'
            );
        });

        it('should contains redis code in UserService', () => {
            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/AuthenticationService.java`,
                '    @Inject\n    UserRedisCache userRedisCache;'
            );

            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/AuthenticationService.java`,
                '    @Inject\n    UserRedisCache userRedisCache;'
            );

            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/AuthenticationService.java`,
                '            return userRedisCache.get(login, () -> User.findOneWithAuthoritiesByEmailIgnoreCase(login))\n' +
                    '                .orElseThrow(() -> new UsernameNotFoundException("User with email " + login + " was not found in the database"));'
            );

            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/AuthenticationService.java`,
                '        return userRedisCache.get(lowercaseLogin, () -> User.findOneWithAuthoritiesByLogin(lowercaseLogin))\n' +
                    '            .orElseThrow(() -> new UsernameNotFoundException("User " + lowercaseLogin + " was not found in the database"));'
            );
        });

        it('should contains redis code in User', () => {
            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/User.java`,
                'return find("FROM User u LEFT JOIN FETCH u.authorities WHERE u.login = ?1", login)\n            .firstResult();'
            );
            assert.fileContent(
                `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/User.java`,
                'return find("FROM User u LEFT JOIN FETCH u.authorities WHERE LOWER(u.login) = LOWER(?1)", email)\n' +
                    '            .firstResult();'
            );
        });
    });
});
