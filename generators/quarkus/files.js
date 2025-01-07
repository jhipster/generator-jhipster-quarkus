/**
 * Copyright 2020-2025 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { TEMPLATES_MAIN_RESOURCES_DIR } from 'generator-jhipster';
import {
    javaMainPackageTemplatesBlock,
    javaMainResourceTemplatesBlock,
    javaTestPackageTemplatesBlock,
} from 'generator-jhipster/generators/java/support';

export const serverFiles = {
    serverBuild: [
        {
            templates: ['README.md.jhi.quarkus', 'checkstyle.xml'],
        },
        {
            condition: generator => generator.buildToolMaven,
            templates: ['pom.xml'],
        },
        {
            condition: generator => generator.buildToolGradle,
            templates: [
                'build.gradle',
                'settings.gradle',
                'gradle.properties',
                'gradle/sonar.gradle',
                'gradle/docker.gradle',
                'gradle/profile_dev.gradle',
                'gradle/profile_prod.gradle',
            ],
        },
    ],
    serverResource: [
        {
            path: TEMPLATES_MAIN_RESOURCES_DIR,
            transform: false,
            templates: ['default_banner.txt'],
        },
        javaMainResourceTemplatesBlock({
            templates: ['application.properties'],
        }),
        javaMainResourceTemplatesBlock({
            condition: generator => generator.authenticationTypeJwt,
            templates: [
                { file: 'jwt/privateKey.pem', method: 'copy', noEjs: true },
                { file: 'META-INF/resources/publicKey.pem', method: 'copy', noEjs: true },
                'resources-config.json',
            ],
        }),
    ],
    serverTestSupport: [
        javaTestPackageTemplatesBlock({
            templates: ['ArchTest.java', 'TestUtil.java'],
        }),
    ],
    serverJavaCache: [
        javaMainPackageTemplatesBlock({
            condition: generator => !['no', 'caffeine'].includes(generator.cacheProvider),
            templates: ['cache/CacheErrorException.java'],
        }),
        javaMainPackageTemplatesBlock({
            condition: generator => generator.cacheProvider === 'redis',
            templates: ['cache/redis/RedisCache.java'],
        }),
        javaMainPackageTemplatesBlock({
            condition: generator => generator.cacheProvider === 'redis' && generator.authenticationTypeJwt,
            templates: ['cache/redis/UserRedisCache.java'],
        }),
        javaTestPackageTemplatesBlock({
            condition: generator => generator.cacheProvider === 'redis',
            templates: ['cache/redis/Foo.java', 'cache/redis/FooRedisCache.java', 'cache/redis/RedisCacheTest.java'],
        }),
    ],
    serverJavaConfig: [
        javaMainPackageTemplatesBlock({
            templates: [
                'config/Constants.java',
                'config/JHipsterProperties.java',
                'config/JsonbConfiguration.java',
                'config/LocalDateProvider.java',
            ],
        }),
        javaTestPackageTemplatesBlock({
            templates: ['config/mock/JHipsterPropertiesMock.java', 'config/LocalDateProviderTest.java'],
        }),
    ],
    databaseConfig: [
        javaMainPackageTemplatesBlock({
            condition: generator => generator.databaseTypeSql,
            templates: [
                'config/hibernate/JHipsterCompatibleImplicitNamingStrategy.java',
                'config/hibernate/JHipsterCompatiblePhysicalNamingStrategy.java',
            ],
        }),
        javaMainPackageTemplatesBlock({
            condition: ctx => ctx.databaseTypeMongodb,
            templates: ['service/IdGenerator.java', 'service/StringIdGenerator.java'],
        }),
        javaMainPackageTemplatesBlock({
            condition: ctx => ctx.databaseTypeMongodb && (ctx.generateUserManagement || ctx.authenticationTypeOauth2),
            templates: [
                'config/dbmigrations/InitialSetupMigration.java',
                'config/dbmigrations/ChangeUnitsList.java',
                'config/MongockConfiguration.java',
            ],
        }),
        javaMainResourceTemplatesBlock({
            condition: ctx => ctx.databaseTypeMongodb,
            templates: ['reflect-config-mongo.json'],
        }),
    ],
    userEntity: [
        javaMainPackageTemplatesBlock({
            condition: generator => generator.generateBuiltInUserEntity,
            templates: [
                'domain/User.java',
                'service/mapper/UserMapper.java',
                'service/dto/UserDTO.java',
                'service/UserService.java',
                'web/rest/UserResource.java',
            ],
        }),
        javaTestPackageTemplatesBlock({
            condition: generator => generator.generateBuiltInUserEntity,
            templates: [
                'domain/UserTest.java',
                'web/rest/UserResourceTest.java',
                'service/mapper/UserMapperTest.java',
                'domain/UserTest.java',
            ],
        }),
    ],
    authorityEntity: [
        javaMainPackageTemplatesBlock({
            condition: generator => generator.generateBuiltInAuthorityEntity,
            templates: ['domain/Authority.java', 'web/rest/AuthorityResource.java'],
        }),
        javaTestPackageTemplatesBlock({
            condition: generator => generator.generateBuiltInAuthorityEntity,
            templates: ['domain/AuthorityTest.java', 'web/rest/AuthorityResourceTest.java'],
        }),
    ],
    userManagement: [
        javaMainPackageTemplatesBlock({
            condition: ctx => ctx.generateUserManagement,
            templates: [
                'service/dto/PasswordChangeDTO.java',
                'service/dto/ManagementInfoDTO.java',
                'service/AuthenticationService.java',
                'service/EmailAlreadyUsedException.java',
                'service/InvalidPasswordException.java',
                'service/MailService.java',
                'service/ManagementInfoService.java',
                'service/UsernameAlreadyUsedException.java',
                'security/BCryptPasswordHasher.java',
                'security/UsernameNotFoundException.java',
                'security/UserNotActivatedException.java',
                'security/RandomUtil.java',
                'web/rest/vm/KeyAndPasswordVM.java',
                'web/rest/vm/LoginVM.java',
                'web/rest/vm/ManagedUserVM.java',
                'web/rest/errors/EmailAlreadyUsedException.java',
                'web/rest/errors/EmailNotFoundException.java',
                'web/rest/errors/LoginAlreadyUsedException.java',
                'web/rest/errors/InvalidPasswordWebException.java',
            ],
        }),
        javaMainPackageTemplatesBlock({
            condition: ctx => ctx.authenticationTypeJwt && ctx.generateUserManagement,
            templates: ['security/RandomUtil.java'],
        }),
        javaTestPackageTemplatesBlock({
            condition: ctx => ctx.generateUserManagement,
            templates: ['service/MailServiceTest.java'],
        }),
        javaMainResourceTemplatesBlock({
            condition: ctx => ctx.generateUserManagement,
            templates: [
                'templates/mail/activationEmail.html',
                'templates/mail/creationEmail.html',
                'templates/mail/passwordResetEmail.html',
            ],
        }),
    ],
    security: [
        javaMainPackageTemplatesBlock({
            templates: ['security/AuthoritiesConstants.java'],
        }),
    ],
    serverJavaService: [
        javaMainPackageTemplatesBlock({
            condition: ctx => ctx.generateAuthenticationApi,
            templates: ['service/dto/ManagementInfoDTO.java', 'service/ManagementInfoService.java'],
        }),
    ],
    serverJavaWebRestError: [
        javaMainPackageTemplatesBlock({
            templates: [
                'web/rest/errors/BadRequestAlertException.java',
                'web/rest/errors/ErrorConstants.java',
                'web/rest/errors/ConstraintViolationExceptionMapper.java',
                'web/rest/errors/FieldErrorVM.java',
            ],
        }),
    ],
    authenticationApi: [
        javaMainPackageTemplatesBlock({
            condition: ctx => ctx.generateAuthenticationApi,
            templates: ['web/rest/AccountResource.java'],
        }),
        javaMainPackageTemplatesBlock({
            condition: generator => generator.generateAuthenticationApi,
            templates: ['web/rest/ManagementInfoResource.java'],
        }),
        javaTestPackageTemplatesBlock({
            condition: generator => generator.generateAuthenticationApi,
            templates: ['web/rest/ManagementInfoResourceTest.java'],
        }),
    ],
    jwt: [
        javaMainPackageTemplatesBlock({
            condition: ctx => ctx.authenticationTypeJwt,
            templates: ['security/jwt/TokenProvider.java'],
        }),
        javaMainPackageTemplatesBlock({
            condition: ctx => ctx.authenticationTypeJwt && ctx.generateUserManagement,
            templates: ['web/rest/UserJWTController.java'],
        }),
        javaTestPackageTemplatesBlock({
            condition: ctx => ctx.authenticationTypeJwt && !ctx.generateUserManagement,
            templates: ['TestTokenProvider.java'],
        }),
        javaTestPackageTemplatesBlock({
            condition: ctx => ctx.authenticationTypeJwt && ctx.generateUserManagement,
            templates: [
                'web/rest/AccountResourceTest_jwt.java',
                'builder/UserBuilder.java',
                'infrastructure/EmailServerResource.java',
                'infrastructure/InjectMailServer.java',
                'utility/IntegrationTestBase.java',
                'web/rest/AccountResourceIT.java',
                'web/rest/UserJWTControllerTest.java',
            ],
        }),
    ],
    oauth2: [
        javaMainPackageTemplatesBlock({
            condition: ctx => ctx.authenticationTypeOauth2 && ctx.generateAuthenticationApi,
            templates: [
                'web/rest/vm/UserVM.java',
                'web/rest/AuthInfoResource.java',
                'web/rest/LogoutResource.java',
                'web/rest/UserOauth2Controller.java',
            ],
        }),
        javaTestPackageTemplatesBlock({
            condition: ctx => ctx.authenticationTypeOauth2,
            templates: ['infrastructure/MockOidcServerTestResource.java'],
        }),
        javaTestPackageTemplatesBlock({
            condition: ctx => ctx.authenticationTypeOauth2 && ctx.generateAuthenticationApi,
            templates: [
                'web/rest/AccountResourceTest_oauth2.java',
                'web/rest/AccountResourceIT_oauth2.java',
                'web/rest/LogoutResourceTest.java',
                'infrastructure/KeycloakServerResource.java',
                'infrastructure/InjectKeycloakServer.java',
                'utility/IntegrationTestBase_oauth2.java',
            ],
        }),
    ],
    serverJavaWeb: [
        javaMainPackageTemplatesBlock({
            templates: [
                'web/rest/JHipsterMetricsEndpoint.java',
                'web/rest/JHipsterConfigurationEndpoint.java',
                'web/rest/vm/ConfigPropsVM.java',
                'web/rest/vm/EnvVM.java',
                'web/util/HeaderUtil.java',
                'web/util/ResponseUtil.java',
                'web/rest/JHipsterLoggersEndpoint.java',
                'web/rest/vm/LoggerVM.java',
            ],
        }),
        javaMainPackageTemplatesBlock({
            condition: generator => !generator.skipClient,
            templates: ['web/rest/SpaFilter.java'],
        }),
    ],
};
