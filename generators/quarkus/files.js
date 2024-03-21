/**
 * Copyright 2020-2024 the original author or authors from the JHipster project.
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
    javaTestPackageTemplatesBlock,
    javaMainResourceTemplatesBlock,
} from 'generator-jhipster/generators/java/support';

export const serverFiles = {
    serverBuild: [
        {
            templates: ['README.md.jhi.quarkus', 'checkstyle.xml'],
        },
        {
            condition: generator => generator.buildTool === 'maven',
            templates: ['pom.xml'],
        },
        {
            condition: generator => generator.buildTool === 'gradle',
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
            condition: generator => generator.authenticationType === 'jwt',
            templates: [
                { file: 'jwt/privateKey.pem', method: 'copy', noEjs: true },
                { file: 'META-INF/resources/publicKey.pem', method: 'copy', noEjs: true },
                'resources-config.json',
            ],
        }),
        javaMainResourceTemplatesBlock({
            condition: generator => generator.databaseType === 'mongodb',
            templates: ['reflect-config-mongo.json'],
        }),
        javaMainResourceTemplatesBlock({
            condition: generator => !generator.skipUserManagement,
            templates: [
                'templates/mail/activationEmail.html',
                'templates/mail/creationEmail.html',
                'templates/mail/passwordResetEmail.html',
            ],
        }),
    ],
    serverTestSupport: [
        javaTestPackageTemplatesBlock({
            templates: ['ArchTest.java', 'TestUtil.java'],
        }),
        javaTestPackageTemplatesBlock({
            condition: generator => generator.authenticationType === 'oauth2',
            templates: [
                'infrastructure/MockOidcServerTestResource.java',
                'infrastructure/KeycloakServerResource.java',
                'infrastructure/InjectKeycloakServer.java',
                'utility/IntegrationTestBase_oauth2.java',
                'web/rest/AccountResourceIT_oauth2.java',
            ],
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
            condition: generator => generator.cacheProvider === 'redis' && generator.authenticationType === 'jwt',
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
        javaMainPackageTemplatesBlock({
            condition: generator => generator.databaseType === 'sql',
            templates: [
                'config/hibernate/JHipsterCompatibleImplicitNamingStrategy.java',
                'config/hibernate/JHipsterCompatiblePhysicalNamingStrategy.java',
            ],
        }),
        javaMainPackageTemplatesBlock({
            condition: generator =>
                generator.databaseType === 'mongodb' &&
                (!generator.skipUserManagement || (generator.skipUserManagement && generator.authenticationType === 'oauth2')),
            templates: ['config/dbmigrations/InitialSetupMigration.java', 'config/MongockConfiguration.java'],
        }),
        javaTestPackageTemplatesBlock({
            templates: ['config/mock/JHipsterPropertiesMock.java', 'config/LocalDateProviderTest.java'],
        }),
    ],
    serverJavaDomain: [
        javaMainPackageTemplatesBlock({
            condition: generator => !generator.skipUserManagement,
            templates: ['domain/Authority.java', 'domain/User.java'],
        }),
        javaTestPackageTemplatesBlock({
            condition: generator => !generator.skipUserManagement,
            templates: ['domain/AuthorityTest.java', 'domain/UserTest.java'],
        }),
    ],
    serverJavaSecurity: [
        javaMainPackageTemplatesBlock({
            condition: generator => generator.authenticationType === 'jwt',
            templates: ['security/jwt/TokenProvider.java'],
        }),
        javaMainPackageTemplatesBlock({
            condition: generator => !generator.skipUserManagement,
            templates: [
                'security/BCryptPasswordHasher.java',
                'security/UsernameNotFoundException.java',
                'security/UserNotActivatedException.java',
                'security/RandomUtil.java',
            ],
        }),
        javaMainPackageTemplatesBlock({
            templates: ['security/AuthoritiesConstants.java'],
        }),
    ],
    serverJavaService: [
        javaMainPackageTemplatesBlock({
            templates: ['service/dto/ManagementInfoDTO.java', 'service/ManagementInfoService.java'],
        }),
        javaMainPackageTemplatesBlock({
            condition: generator => generator.databaseType === 'mongodb',
            templates: ['service/IdGenerator.java', 'service/StringIdGenerator.java'],
        }),

        javaMainPackageTemplatesBlock({
            condition: generator => !generator.skipUserManagement,
            templates: [
                'service/mapper/UserMapper.java',
                'service/dto/PasswordChangeDTO.java',
                'service/dto/UserDTO.java',
                'service/dto/ManagementInfoDTO.java',
                'service/AuthenticationService.java',
                'service/EmailAlreadyUsedException.java',
                'service/InvalidPasswordException.java',
                'service/MailService.java',
                'service/ManagementInfoService.java',
                'service/UsernameAlreadyUsedException.java',
                'service/UserService.java',
                'service/MailService.java',
            ],
        }),
        javaTestPackageTemplatesBlock({
            condition: generator => !generator.skipUserManagement,
            templates: ['service/MailServiceTest.java', 'service/mapper/UserMapperTest.java', 'domain/UserTest.java'],
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
        javaMainPackageTemplatesBlock({
            condition: generator => !generator.skipUserManagement,
            templates: [
                'web/rest/errors/EmailAlreadyUsedException.java',
                'web/rest/errors/EmailNotFoundException.java',
                'web/rest/errors/LoginAlreadyUsedException.java',
                'web/rest/errors/InvalidPasswordWebException.java',
            ],
        }),
    ],
    serverJavaWeb: [
        javaMainPackageTemplatesBlock({
            condition: generator => generator.databaseType !== 'no',
            templates: ['web/rest/AccountResource.java'],
        }),
        javaTestPackageTemplatesBlock({
            condition: generator => generator.databaseType !== 'no' && generator.authenticationType === 'jwt',
            templates: [
                'web/rest/AccountResourceTest_jwt.java',
                'builder/UserBuilder.java',
                'infrastructure/EmailServerResource.java',
                'infrastructure/InjectMailServer.java',
                'utility/IntegrationTestBase.java',
                'web/rest/AccountResourceIT.java',
            ],
        }),
        javaTestPackageTemplatesBlock({
            condition: generator => generator.authenticationType === 'oauth2',
            templates: ['web/rest/AccountResourceTest_oauth2.java', 'web/rest/LogoutResourceTest.java'],
        }),
        javaMainPackageTemplatesBlock({
            templates: [
                'web/rest/ManagementInfoResource.java',
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
        javaTestPackageTemplatesBlock({
            templates: ['web/rest/ManagementInfoResourceTest.java'],
        }),
        javaMainPackageTemplatesBlock({
            condition: generator => generator.authenticationType === 'jwt' && generator.databaseType !== 'no',
            templates: ['web/rest/UserJWTController.java'],
        }),
        javaTestPackageTemplatesBlock({
            condition: generator => generator.authenticationType === 'jwt' && generator.databaseType !== 'no',
            templates: ['web/rest/UserJWTControllerTest.java'],
        }),
        javaMainPackageTemplatesBlock({
            condition: generator => generator.authenticationType === 'oauth2',
            templates: [
                'web/rest/vm/UserVM.java',
                'web/rest/AuthInfoResource.java',
                'web/rest/LogoutResource.java',
                'web/rest/UserOauth2Controller.java',
            ],
        }),
        javaMainPackageTemplatesBlock({
            condition: generator => !generator.skipUserManagement,
            templates: [
                'web/rest/vm/KeyAndPasswordVM.java',
                'web/rest/vm/LoginVM.java',
                'web/rest/vm/ManagedUserVM.java',
                'web/rest/ManagementInfoResource.java',
                'web/rest/UserResource.java',
                'web/rest/AuthorityResource.java',
            ],
        }),
        javaMainPackageTemplatesBlock({
            condition: generator => !generator.skipClient,
            templates: ['web/rest/SpaFilter.java'],
        }),
        javaTestPackageTemplatesBlock({
            condition: generator => !generator.skipUserManagement,
            templates: ['web/rest/UserResourceTest.java', 'web/rest/AuthorityResourceTest.java'],
        }),
    ],
};
