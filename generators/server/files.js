/**
 * Copyright 2013-2020 the original author or authors from the JHipster project.
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
const mkdirp = require('mkdirp');
const cleanup = require('generator-jhipster/generators/cleanup');
const constants = require('generator-jhipster/generators/generator-constants');
const jhipsterFiles = require('generator-jhipster/generators/server/files').serverFiles;

/* Constants use throughout */
const INTERPOLATE_REGEX = constants.INTERPOLATE_REGEX;
const DOCKER_DIR = constants.DOCKER_DIR;
// const TEST_DIR = constants.TEST_DIR;
const SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;
const SERVER_MAIN_RES_DIR = constants.SERVER_MAIN_RES_DIR;
const SERVER_TEST_SRC_DIR = constants.SERVER_TEST_SRC_DIR;
const SERVER_TEST_RES_DIR = constants.SERVER_TEST_RES_DIR;

const serverFiles = {
    serverBuild: [
        {
            templates: [{ file: 'checkstyle.xml', options: { interpolate: INTERPOLATE_REGEX } }]
        },
        {
            condition: generator => generator.buildTool === 'maven',
            templates: [
                { file: 'mvnw', method: 'copy', noEjs: true },
                { file: 'mvnw.cmd', method: 'copy', noEjs: true },
                { file: '.mvn/wrapper/maven-wrapper.jar', method: 'copy', noEjs: true },
                { file: '.mvn/wrapper/maven-wrapper.properties', method: 'copy', noEjs: true },
                { file: '.mvn/wrapper/MavenWrapperDownloader.java', method: 'copy', noEjs: true },
                { file: 'pom.xml', options: { interpolate: INTERPOLATE_REGEX } }
            ]
        },
        {
            condition: generator => generator.buildTool === 'gradle',
            templates: [
                'build.gradle',
                'settings.gradle',
                'gradle.properties',
                'gradle/sonar.gradle',
                'gradle/docker.gradle',
                { file: 'gradle/profile_dev.gradle', options: { interpolate: INTERPOLATE_REGEX } },
                { file: 'gradle/profile_prod.gradle', options: { interpolate: INTERPOLATE_REGEX } },
                { file: 'gradlew', method: 'copy', noEjs: true },
                { file: 'gradlew.bat', method: 'copy', noEjs: true },
                { file: 'gradle/wrapper/gradle-wrapper.jar', method: 'copy', noEjs: true },
                'gradle/wrapper/gradle-wrapper.properties'
            ]
        }
    ],
    serverResource: [
        {
            path: SERVER_MAIN_RES_DIR,
            templates: [
                { file: 'default_banner.txt', method: 'copy', noEjs: true },
                { file: 'jwt/privateKey.pem', method: 'copy', noEjs: true },
                { file: 'META-INF/resources/publicKey.pem', method: 'copy', noEjs: true },
                'templates/mail/activationEmail.html',
                'templates/mail/creationEmail.html',
                'templates/mail/passwordResetEmail.html',
                'application.properties',
                'resources-config.json'
            ]
        }
    ],
    serverTestSupport: [
        {
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/ArchTest.java',
                    renameTo: generator => `${generator.javaDir}/ArchTest.java`
                },
                {
                    file: 'package/TestResources.java',
                    renameTo: generator => `${generator.javaDir}/TestResources.java`
                },
                {
                    file: 'package/TestUtil.java',
                    renameTo: generator => `${generator.javaDir}/TestUtil.java`
                }
            ]
        }
    ],
    serverJavaConfig: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/Constants.java',
                    renameTo: generator => `${generator.javaDir}config/Constants.java`
                },
                {
                    file: 'package/config/JHipsterProperties.java',
                    renameTo: generator => `${generator.javaDir}config/JHipsterProperties.java`
                },
                {
                    file: 'package/config/JsonbConfiguration.java',
                    renameTo: generator => `${generator.javaDir}config/JsonbConfiguration.java`
                },
                {
                    file: 'package/config/JHipsterInfo.java',
                    renameTo: generator => `${generator.javaDir}config/JHipsterInfo.java`
                },
                {
                    file: 'package/config/LocalDateProvider.java',
                    renameTo: generator => `${generator.javaDir}config/LocalDateProvider.java`
                }
            ]
        },
        {
            path: SERVER_MAIN_SRC_DIR,
            condition: generator => generator.databaseType === 'sql',
            templates: [
                {
                    file: 'package/config/hibernate/JHipsterCompatibleImplicitNamingStrategy.java',
                    renameTo: generator => `${generator.javaDir}config/hibernate/JHipsterCompatibleImplicitNamingStrategy.java`
                },
                {
                    file: 'package/config/hibernate/JHipsterCompatiblePhysicalNamingStrategy.java',
                    renameTo: generator => `${generator.javaDir}config/hibernate/JHipsterCompatiblePhysicalNamingStrategy.java`
                }
            ]
        },
        {
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/config/mock/JHipsterInfoMock.java',
                    renameTo: generator => `${generator.javaDir}/config/mock/JHipsterInfoMock.java`
                },
                {
                    file: 'package/config/LocalDateProviderTest.java',
                    renameTo: generator => `${generator.javaDir}/config/LocalDateProviderTest.java`
                }
            ]
        }
    ],
    serverJavaDomain: [
        {
            condition: generator => !generator.skipUserManagement,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/domain/Authority.java',
                    renameTo: generator => `${generator.javaDir}domain/Authority.java`
                },
                {
                    file: 'package/domain/User.java',
                    renameTo: generator => `${generator.javaDir}domain/User.java`
                }
            ]
        },
        {
            condition: generator => !generator.skipUserManagement,
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/domain/AuthorityTest.java',
                    renameTo: generator => `${generator.javaDir}/domain/AuthorityTest.java`
                },
                {
                    file: 'package/domain/UserTest.java',
                    renameTo: generator => `${generator.javaDir}/domain/UserTest.java`
                }
            ]
        }
    ],
    serverJavaSecurity: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/security/jwt/TokenProvider.java',
                    renameTo: generator => `${generator.javaDir}security/jwt/TokenProvider.java`
                }
            ]
        },
        {
            condition: generator => !generator.skipUserManagement,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/security/AuthoritiesConstants.java',
                    renameTo: generator => `${generator.javaDir}security/AuthoritiesConstants.java`
                },
                {
                    file: 'package/security/BCryptPasswordHasher.java',
                    renameTo: generator => `${generator.javaDir}security/BCryptPasswordHasher.java`
                },
                {
                    file: 'package/security/UsernameNotFoundException.java',
                    renameTo: generator => `${generator.javaDir}security/UsernameNotFoundException.java`
                },
                {
                    file: 'package/security/UserNotActivatedException.java',
                    renameTo: generator => `${generator.javaDir}security/UserNotActivatedException.java`
                },
                {
                    file: 'package/security/RandomUtil.java',
                    renameTo: generator => `${generator.javaDir}security/RandomUtil.java`
                }
            ]
        }
    ],
    serverJavaService: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/service/dto/ManagementInfoDTO.java',
                    renameTo: generator => `${generator.javaDir}service/dto/ManagementInfoDTO.java`
                },

                {
                    file: 'package/service/ManagementInfoService.java',
                    renameTo: generator => `${generator.javaDir}service/ManagementInfoService.java`
                }
            ]
        },
        {
            condition: generator => !generator.skipUserManagement,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/service/mapper/UserMapper.java',
                    renameTo: generator => `${generator.javaDir}service/mapper/UserMapper.java`
                },
                {
                    file: 'package/service/dto/PasswordChangeDTO.java',
                    renameTo: generator => `${generator.javaDir}service/dto/PasswordChangeDTO.java`
                },
                {
                    file: 'package/service/dto/UserDTO.java',
                    renameTo: generator => `${generator.javaDir}service/dto/UserDTO.java`
                },
                {
                    file: 'package/service/dto/ManagementInfoDTO.java',
                    renameTo: generator => `${generator.javaDir}service/dto/ManagementInfoDTO.java`
                },
                {
                    file: 'package/service/AuthenticationService.java',
                    renameTo: generator => `${generator.javaDir}service/AuthenticationService.java`
                },
                {
                    file: 'package/service/EmailAlreadyUsedException.java',
                    renameTo: generator => `${generator.javaDir}service/EmailAlreadyUsedException.java`
                },
                {
                    file: 'package/service/InvalidPasswordException.java',
                    renameTo: generator => `${generator.javaDir}service/InvalidPasswordException.java`
                },
                {
                    file: 'package/service/MailService.java',
                    renameTo: generator => `${generator.javaDir}service/MailService.java`
                },
                {
                    file: 'package/service/ManagementInfoService.java',
                    renameTo: generator => `${generator.javaDir}service/ManagementInfoService.java`
                },
                {
                    file: 'package/service/UsernameAlreadyUsedException.java',
                    renameTo: generator => `${generator.javaDir}service/UsernameAlreadyUsedException.java`
                },
                {
                    file: 'package/service/UserService.java',
                    renameTo: generator => `${generator.javaDir}service/UserService.java`
                },
                {
                    file: 'package/service/MailService.java',
                    renameTo: generator => `${generator.javaDir}service/MailService.java`
                }
            ]
        },
        {
            condition: generator => !generator.skipUserManagement,
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/service/mapper/UserMapperTest.java',
                    renameTo: generator => `${generator.javaDir}/service/mapper/UserMapperTest.java`
                },
                {
                    file: 'package/domain/UserTest.java',
                    renameTo: generator => `${generator.javaDir}/domain/UserTest.java`
                }
            ]
        }
    ],
    serverJavaWebRestError: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/errors/BadRequestAlertException.java',
                    renameTo: generator => `${generator.javaDir}web/rest/errors/BadRequestAlertException.java`
                }
            ]
        },
        {
            condition: generator => !generator.skipUserManagement,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/errors/EmailAlreadyUsedException.java',
                    renameTo: generator => `${generator.javaDir}web/rest/errors/EmailAlreadyUsedException.java`
                },
                {
                    file: 'package/web/rest/errors/EmailNotFoundException.java',
                    renameTo: generator => `${generator.javaDir}web/rest/errors/EmailNotFoundException.java`
                },
                {
                    file: 'package/web/rest/errors/LoginAlreadyUsedException.java',
                    renameTo: generator => `${generator.javaDir}web/rest/errors/LoginAlreadyUsedException.java`
                },
                {
                    file: 'package/web/rest/errors/UserNotAuthenticatedException.java',
                    renameTo: generator => `${generator.javaDir}web/rest/errors/UserNotAuthenticatedException.java`
                }
            ]
        }
    ],
    serverJavaWeb: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/ManagementInfoResource.java',
                    renameTo: generator => `${generator.javaDir}web/rest/ManagementInfoResource.java`
                },
                {
                    file: 'package/web/rest/SpaFilter.java',
                    renameTo: generator => `${generator.javaDir}web/rest/SpaFilter.java`
                },
                {
                    file: 'package/web/util/HeaderUtil.java',
                    renameTo: generator => `${generator.javaDir}web/util/HeaderUtil.java`
                },
                {
                    file: 'package/web/util/ResponseUtil.java',
                    renameTo: generator => `${generator.javaDir}web/util/ResponseUtil.java`
                }
            ]
        },
        {
            condition: generator => !generator.skipUserManagement,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/vm/KeyAndPasswordVM.java',
                    renameTo: generator => `${generator.javaDir}web/rest/vm/KeyAndPasswordVM.java`
                },
                {
                    file: 'package/web/rest/vm/LoginVM.java',
                    renameTo: generator => `${generator.javaDir}web/rest/vm/LoginVM.java`
                },
                {
                    file: 'package/web/rest/vm/ManagedUserVM.java',
                    renameTo: generator => `${generator.javaDir}web/rest/vm/ManagedUserVM.java`
                },
                {
                    file: 'package/web/rest/AccountResource.java',
                    renameTo: generator => `${generator.javaDir}web/rest/AccountResource.java`
                },
                {
                    file: 'package/web/rest/UserJWTController.java',
                    renameTo: generator => `${generator.javaDir}web/rest/UserJWTController.java`
                },
                {
                    file: 'package/web/rest/UserResource.java',
                    renameTo: generator => `${generator.javaDir}web/rest/UserResource.java`
                }
            ]
        },
        {
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/ManagementInfoResourceTest.java',
                    renameTo: generator => `${generator.javaDir}web/rest/ManagementInfoResourceTest.java`
                }
            ]
        },
        {
            condition: generator => !generator.skipUserManagement,
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/AccountResourceTest.java',
                    renameTo: generator => `${generator.javaDir}web/rest/AccountResourceTest.java`
                },
                {
                    file: 'package/web/rest/UserJWTControllerTest.java',
                    renameTo: generator => `${generator.javaDir}web/rest/UserJWTControllerTest.java`
                },
                {
                    file: 'package/web/rest/UserResourceTest.java',
                    renameTo: generator => `${generator.javaDir}web/rest/UserResourceTest.java`
                }
            ]
        }
    ],
    docker: [
        {
            path: DOCKER_DIR,
            condition: generator => generator.buildTool === 'maven',
            templates: ['Dockerfile.jvm', 'Dockerfile.native']
        }
    ]
};

const serverFilesFromJHipster = {
    docker: jhipsterFiles.docker,
    serverResource: [
        {
            condition: generator => generator.databaseType === 'sql',
            path: SERVER_MAIN_RES_DIR,
            templates: [
                {
                    file: 'config/liquibase/changelog/initial_schema.xml',
                    renameTo: () => 'config/liquibase/changelog/00000000000000_initial_schema.xml',
                    options: { interpolate: INTERPOLATE_REGEX }
                },
                'config/liquibase/master.xml'
            ]
        }
    ],
    serverJavaUserManagement: [
        {
            condition: generator =>
                (generator.authenticationType === 'oauth2' && generator.applicationType !== 'microservice') ||
                (!generator.skipUserManagement && generator.databaseType === 'sql'),
            path: SERVER_MAIN_RES_DIR,
            templates: ['config/liquibase/data/user.csv']
        },
        {
            condition: generator =>
                (generator.authenticationType === 'oauth2' &&
                    generator.applicationType !== 'microservice' &&
                    generator.databaseType === 'sql') ||
                (!generator.skipUserManagement && generator.databaseType === 'sql'),
            path: SERVER_MAIN_RES_DIR,
            templates: ['config/liquibase/data/authority.csv', 'config/liquibase/data/user_authority.csv']
        }
    ]
};

function writeFiles() {
    return {
        setUp() {
            this.javaDir = `${this.packageFolder}/`;
            this.testDir = `${this.packageFolder}/`;

            // Create Java resource files
            mkdirp(SERVER_MAIN_RES_DIR);
            mkdirp(`${SERVER_TEST_SRC_DIR}/${this.testDir}`);
        },

        cleanupOldServerFiles() {
            cleanup.cleanupOldServerFiles(
                this,
                `${SERVER_MAIN_SRC_DIR}/${this.javaDir}`,
                `${SERVER_TEST_SRC_DIR}/${this.testDir}`,
                SERVER_MAIN_RES_DIR,
                SERVER_TEST_RES_DIR
            );
        },

        writeFiles() {
            this.writeFilesToDisk(serverFiles, this, false, 'quarkus');
            this.writeFilesToDisk(serverFilesFromJHipster, this, false, this.fetchFromInstalledJHipster('server/templates'));
        }
    };
}

module.exports = {
    writeFiles,
    serverFiles
};
