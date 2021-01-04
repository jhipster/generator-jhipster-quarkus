const assert = require('yeoman-assert');
const constants = require('generator-jhipster/generators/generator-constants');

const { buildServerGeneratorContext } = require('./utils/generator-testing-api');
const expectedFiles = require('./utils/expected-files');

const { SERVER_MAIN_SRC_DIR, SERVER_MAIN_RES_DIR, DOCKER_DIR, SERVER_TEST_SRC_DIR } = constants;

describe('Subgenerator server of quarkus JHipster blueprint', () => {
    describe('With monolith Maven Mysql', () => {
        before(buildServerGeneratorContext());

        it('creates expected files for default configuration for server generator', () => {
            assert.file(expectedFiles.server.common);
            assert.file(expectedFiles.server.jwt);
            assert.file(expectedFiles.server.userManagement);
            assert.file(expectedFiles.server.hibernate);
            assert.file(expectedFiles.server.h2);
            assert.file(expectedFiles.maven);
            assert.noFile(expectedFiles.cache.common);
            assert.noFile(expectedFiles.server.mongoDb);
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

        it('contains h2 servlet data in web.xml', () => {
            assert.fileContent(
                `${SERVER_MAIN_RES_DIR}META-INF/web.xml`,
                '    <servlet>\n' +
                    '        <servlet-name>h2-console</servlet-name>\n' +
                    '        <servlet-class>org.h2.server.web.WebServlet</servlet-class>\n' +
                    '    </servlet>\n' +
                    '\n' +
                    '    <servlet-mapping>\n' +
                    '        <servlet-name>h2-console</servlet-name>\n' +
                    '        <url-pattern>/h2-console/*</url-pattern>\n' +
                    '    </servlet-mapping>'
            );
        });
    });

    describe('With monolith Gradle Mysql', () => {
        before(
            buildServerGeneratorContext({
                buildTool: 'gradle',
                cacheProvider: 'caffeine',
            })
        );

        it('creates expected files for default configuration for server generator', () => {
            assert.file(expectedFiles.server.common);
            assert.file(expectedFiles.gradle);
            assert.noFile(expectedFiles.server.mongoDb);
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
                skipUserManagement: true,
            })
        );

        it('creates expected files for default configuration for server generator', () => {
            assert.file(expectedFiles.server.common);
            assert.noFile(expectedFiles.server.userManagement);
            assert.noFile(expectedFiles.server.hibernate);
            assert.noFile(expectedFiles.server.h2);
            assert.noFile(expectedFiles.server.mongoDb);
            assert.file(expectedFiles.maven);
        });
    });

    describe('With maven Mysql no second cache level', () => {
        before(
            buildServerGeneratorContext({
                enableHibernateCache: false,
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
                cacheProvider: 'caffeine',
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
                cacheProvider: 'no',
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
                cacheProvider: 'redis',
            })
        );

        it('should contains redis file', () => {
            assert.file(expectedFiles.cache.common);
            assert.file(expectedFiles.cache.redis);
            assert.noFile(expectedFiles.server.mongoDb);
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

    describe('With Maven OAuth2', () => {
        before(
            buildServerGeneratorContext({
                authenticationType: 'oauth2',
            })
        );

        it('should creates OAuth2 files', () => {
            assert.file(expectedFiles.server.oauth2);
        });

        it('should not creates JWT files', () => {
            assert.noFile(expectedFiles.server.jwt);
        });

        it('should not creates user management', () => {
            assert.noFile(expectedFiles.server.userManagement);
        });

        it('should pom.xml contains Quarkus OIDC dependency', () => {
            assert.fileContent(
                'pom.xml',
                '        <dependency>\n' +
                    '            <groupId>io.quarkus</groupId>\n' +
                    '            <artifactId>quarkus-oidc</artifactId>\n' +
                    '        </dependency>'
            );
            assert.noFileContent(
                'pom.xml',
                '        <dependency>\n' +
                    '            <groupId>io.quarkus</groupId>\n' +
                    '            <artifactId>quarkus-jwt</artifactId>\n' +
                    '        </dependency>'
            );
        });

        it('should applications.properties has Quarkus OIDC is enabled', () => {
            assert.fileContent(`${SERVER_MAIN_RES_DIR}application.properties`, 'quarkus.oidc.enabled=true');
        });

        it('should JHipster properties contains OIDC logout url', () => {
            assert.fileContent(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/config/JHipsterProperties.java`, 'public String logoutUrl;');

            assert.fileContent(
                `${SERVER_MAIN_RES_DIR}application.properties`,
                'jhipster.oidc.logout-url=http://localhost:9080/auth/realms/jhipster/protocol/openid-connect/logout'
            );
        });

        it('should AccountResource uses JsonWebToken to build UserDTO', () => {
            assert.fileContent(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/AccountResource.java`, 'JsonWebToken accessToken;');
        });
    });

    describe('With Gradle OAuth2', () => {
        before(
            buildServerGeneratorContext({
                buildTool: 'gradle',
                authenticationType: 'oauth2',
            })
        );

        it('should creates OAuth2 files', () => {
            assert.file(expectedFiles.server.oauth2);
        });

        it('should build.gradle contains Quarkus OIDC dependency', () => {
            assert.fileContent('build.gradle', 'implementation "io.quarkus:quarkus-oidc"');
            assert.noFileContent('build.gradle', 'implementation "io.quarkus:quarkus-smallrye-jwt"');
        });
    });

    describe('With maven MongoDb', () => {
        before(
            buildServerGeneratorContext({
                databaseType: 'mongodb',
                devDatabaseType: 'mongodb',
                prodDatabaseType: 'mongodb',
                enableHibernateCache: false
            })
        );

        it('should contains MongoDb files', () => {
            assert.file(expectedFiles.server.mongoDb);
        });

        it('pom.xml contains Mongo dependencies', () => {
            assert.fileContent(
                'pom.xml',
                '        <dependency>\n' +
                    '            <groupId>io.quarkus</groupId>\n' +
                    '            <artifactId>quarkus-mongodb-panache</artifactId>\n' +
                    '        </dependency>'
            );
        });

        it('pom.xml contains Mongock dependencies', () => {
            assert.fileContent(
                'pom.xml',
                '        <dependency>\n' +
                    '            <groupId>com.github.cloudyrock.mongock</groupId>\n' +
                    '            <artifactId>mongock-standalone</artifactId>\n' +
                    '        </dependency>\n' +
                    '        <dependency>\n' +
                    '            <groupId>com.github.cloudyrock.mongock</groupId>\n' +
                    '            <artifactId>mongodb-sync-v4-driver</artifactId>\n' +
                    '        </dependency>\n' +
                    '        <dependency>\n' +
                    '            <groupId>org.mongodb</groupId>\n' +
                    '            <artifactId>mongodb-driver-sync</artifactId>\n' +
                    // eslint-disable-next-line no-template-curly-in-string
                    '            <version>${mongodb-driver-sync.version}</version>\n' +
                    '        </dependency>'
            );
            assert.fileContent(
                'pom.xml',
                '            <dependency>\n' +
                    '                <groupId>com.github.cloudyrock.mongock</groupId>\n' +
                    '                <artifactId>mongock-bom</artifactId>\n' +
                    // eslint-disable-next-line no-template-curly-in-string
                    '                <version>${mongock-bom.version}</version>\n' +
                    '                <type>pom</type>\n' +
                    '                <scope>import</scope>\n' +
                    '            </dependency>'
            );
        });

        it('application.properties contains MongoDb entries', () => {
            assert.fileContent(
                `${SERVER_MAIN_RES_DIR}application.properties`,
                'jhi.mongodb.port=27017\n' +
                    '%test.jhi.mongodb.port=37017\n' +
                    'jhi.mongodb.host=localhost\n' +
                    '%prod.jhi.mongodb.host=localhost\n' +
                    // eslint-disable-next-line no-template-curly-in-string
                    'quarkus.mongodb.connection-string=mongodb://${jhi.mongodb.host}:${jhi.mongodb.port}\n' +
                    'quarkus.mongodb.database=sample'
            );
        });

        it('TestResource contains MongoDbTestResource', () => {
            assert.fileContent(
                `${SERVER_TEST_SRC_DIR}com/mycompany/myapp/TestResources.java`,
                '@QuarkusTestResource(MongoDbTestResource.class)'
            );
        });
    });
});
