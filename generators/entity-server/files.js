/**
 * Copyright 2013-2019 the original author or authors from the JHipster project.
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

const constants = require('generator-jhipster/generators/generator-constants');
const faker = require('faker');
const utils = require('../utils');

const randexp = utils.RandexpWithFaker;
/* Constants use throughout */
const SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;
const INTERPOLATE_REGEX = constants.INTERPOLATE_REGEX;
const SERVER_MAIN_RES_DIR = constants.SERVER_MAIN_RES_DIR;

/*

const DOCKER_DIR = constants.DOCKER_DIR;
const TEST_DIR = constants.TEST_DIR;

const SERVER_TEST_SRC_DIR = constants.SERVER_TEST_SRC_DIR;
const SERVER_TEST_RES_DIR = constants.SERVER_TEST_RES_DIR;
*/

/*
  faker, randExp, getRecentDate and getRecentForLiquibase are copied from the upstream JHipster generator.
  This permits to use the `serverFilesFromJHipster` as is and not redevelop them.
  FIXME, the blueprint should not have to re-import these elements...
*/
/*
 * Current faker version is 4.1.0 and was release in 2017
 * It is outdated
 * https://github.com/Marak/faker.js/blob/10bfb9f467b0ac2b8912ffc15690b50ef3244f09/lib/date.js#L73-L96
 * Needed for reproducible builds
 */
const getRecentDate = function(days, refDate) {
    let date = new Date();
    if (refDate !== undefined) {
        date = new Date(Date.parse(refDate));
    }

    const range = {
        min: 1000,
        max: (days || 1) * 24 * 3600 * 1000
    };

    let future = date.getTime();
    future -= faker.random.number(range); // some time from now to N days ago, in milliseconds
    date.setTime(future);

    return date;
};

const getRecentForLiquibase = function(days, changelogDate) {
    let formatedDate;
    if (changelogDate !== undefined) {
        formatedDate = `${changelogDate.substring(0, 4)}-${changelogDate.substring(4, 6)}-${changelogDate.substring(
            6,
            8
        )}T${changelogDate.substring(8, 10)}:${changelogDate.substring(10, 12)}:${changelogDate.substring(12, 14)}+00:00`;
    }
    return getRecentDate(1, formatedDate);
};

const serverFiles = {
    server: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/domain/Entity.java',
                    renameTo: generator => `${generator.packageFolder}/domain/${generator.asEntity(generator.entityClass)}.java`,
                    useBluePrint: true
                },
                {
                    file: 'package/repository/EntityRepository.java',
                    renameTo: generator => `${generator.packageFolder}/repository/${generator.entityClass}Repository.java`,
                    useBluePrint: true
                },
                {
                    file: 'package/web/rest/EntityResource.java',
                    renameTo: generator => `${generator.packageFolder}/web/rest/${generator.entityClass}Resource.java`,
                    useBluePrint: true
                }
            ]
        }
    ]
    // ,
    // test: [
    //     {
    //         path: SERVER_TEST_SRC_DIR,
    //         templates: [
    //             {
    //                 file: 'package/web/rest/EntityResourceIT.java',
    //                 options: {
    //                     context: {
    //                         randexp, <-- not defined
    //                         _,
    //                         chalkRed: chalk.red,
    //                         fs,
    //                         SERVER_TEST_SRC_DIR
    //                     }
    //                 },
    //                 renameTo: generator => `${generator.packageFolder}/web/rest/${generator.entityClass}ResourceIT.kt`,
    //                 useBluePrint: true
    //             }
    //         ]
    //     }
    // ]
};

const serverFilesFromJHipster = {
    dbChangelog: [
        {
            condition: generator => generator.databaseType === 'sql' && !generator.skipDbChangelog,
            path: SERVER_MAIN_RES_DIR,
            templates: [
                {
                    file: 'config/liquibase/changelog/added_entity.xml',
                    options: { interpolate: INTERPOLATE_REGEX },
                    renameTo: generator => `config/liquibase/changelog/${generator.changelogDate}_added_entity_${generator.entityClass}.xml`
                }
            ]
        },
        {
            condition: generator =>
                generator.databaseType === 'sql' &&
                !generator.skipDbChangelog &&
                (generator.fieldsContainOwnerManyToMany || generator.fieldsContainOwnerOneToOne || generator.fieldsContainManyToOne),
            path: SERVER_MAIN_RES_DIR,
            templates: [
                {
                    file: 'config/liquibase/changelog/added_entity_constraints.xml',
                    options: { interpolate: INTERPOLATE_REGEX },
                    renameTo: generator =>
                        `config/liquibase/changelog/${generator.changelogDate}_added_entity_constraints_${generator.entityClass}.xml`
                }
            ]
        },
        {
            condition: generator => generator.databaseType === 'cassandra' && !generator.skipDbChangelog,
            path: SERVER_MAIN_RES_DIR,
            templates: [
                {
                    file: 'config/cql/changelog/added_entity.cql',
                    renameTo: generator => `config/cql/changelog/${generator.changelogDate}_added_entity_${generator.entityClass}.cql`
                }
            ]
        }
    ],
    fakeData: [
        {
            condition: generator => generator.databaseType === 'sql' && !generator.skipFakeData && !generator.skipDbChangelog,
            path: SERVER_MAIN_RES_DIR,
            templates: [
                {
                    file: 'config/liquibase/fake-data/table.csv',
                    options: {
                        interpolate: INTERPOLATE_REGEX,
                        context: {
                            getRecentForLiquibase,
                            faker,
                            randexp
                        }
                    },
                    renameTo: generator => `config/liquibase/fake-data/${generator.entityTableName}.csv`
                }
            ]
        },
        {
            condition: generator =>
                generator.databaseType === 'sql' &&
                !generator.skipFakeData &&
                !generator.skipDbChangelog &&
                (generator.fieldsContainImageBlob === true || generator.fieldsContainBlob === true),
            path: SERVER_MAIN_RES_DIR,
            templates: [{ file: 'config/liquibase/fake-data/blob/hipster.png', method: 'copy', noEjs: true }]
        },
        {
            condition: generator =>
                generator.databaseType === 'sql' &&
                !generator.skipFakeData &&
                !generator.skipDbChangelog &&
                generator.fieldsContainTextBlob === true,
            path: SERVER_MAIN_RES_DIR,
            templates: [{ file: 'config/liquibase/fake-data/blob/hipster.txt', method: 'copy' }]
        }
    ]
};

function writeFiles() {
    return {
        writeServerFiles() {
            if (this.skipServer) return;

            // write server side files
            this.writeFilesToDisk(serverFiles, this, false, 'quarkus');
            this.writeFilesToDisk(serverFilesFromJHipster, this, false, this.fetchFromInstalledJHipster('entity-server/templates'));
        },

        writeEnumFiles() {
            this.fields.forEach(field => {
                if (field.fieldIsEnum === true) {
                    const fieldType = field.fieldType;
                    const enumInfo = utils.buildEnumInfo(field, this.angularAppName, this.packageName, this.clientRootFolder);
                    if (!this.skipServer) {
                        this.template(
                            `${this.fetchFromInstalledJHipster(
                                'entity-server/templates'
                            )}/${SERVER_MAIN_SRC_DIR}package/domain/enumeration/Enum.java.ejs`,
                            `${SERVER_MAIN_SRC_DIR}${this.packageFolder}/domain/enumeration/${fieldType}.java`,
                            this,
                            {},
                            enumInfo
                        );
                    }
                }
            });
        }
    };
}

module.exports = {
    writeFiles,
    serverFiles
};
