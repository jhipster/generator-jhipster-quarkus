/**
 * Copyright 2020-2021 the original author or authors from the JHipster project.
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
const jhipsterUtils = require('generator-jhipster/generators/utils');

const NeedleApi = require('../needle-api');

/* Constants use throughout */
const SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;
const SERVER_MAIN_RES_DIR = constants.SERVER_MAIN_RES_DIR;
const SERVER_TEST_SRC_DIR = constants.SERVER_TEST_SRC_DIR;
/*

const DOCKER_DIR = constants.DOCKER_DIR;
const TEST_DIR = constants.TEST_DIR;

const SERVER_TEST_RES_DIR = constants.SERVER_TEST_RES_DIR;
*/

const serverFiles = {
    server: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/domain/Entity.java',
                    renameTo: generator => `${generator.packageFolder}/domain/${generator.asEntity(generator.entityClass)}.java`,
                    useBluePrint: true,
                },
                {
                    file: 'package/web/rest/EntityResource.java',
                    renameTo: generator => `${generator.packageFolder}/web/rest/${generator.entityClass}Resource.java`,
                    useBluePrint: true,
                },
            ],
        },
        {
            condition: generator => generator.dataAccess === 'repository',
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/repository/EntityRepository.java',
                    renameTo: generator => `${generator.packageFolder}/repository/${generator.entityClass}Repository.java`,
                    useBluePrint: true,
                },
            ],
        },
        {
            condition: generator => generator.hasPagination,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/service/Paged.java',
                    renameTo: generator => `${generator.packageFolder}/service/Paged.java`,
                    useBluePrint: true,
                },
            ],
        },
        {
            condition: generator => generator.hasPagination,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/vm/PageRequestVM.java',
                    renameTo: generator => `${generator.packageFolder}/web/rest/vm/PageRequestVM.java`,
                    useBluePrint: true,
                },
                {
                    file: 'package/web/rest/vm/SortRequestVM.java',
                    renameTo: generator => `${generator.packageFolder}/web/rest/vm/SortRequestVM.java`,
                    useBluePrint: true,
                },
            ],
        },
        {
            condition: generator => generator.hasPagination,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/web/util/PaginationUtil.java',
                    renameTo: generator => `${generator.packageFolder}/web/util/PaginationUtil.java`,
                    useBluePrint: true,
                },
            ],
        },
        {
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/domain/EntityTest.java',
                    renameTo: generator => `${generator.packageFolder}/domain/${generator.entityClass}Test.java`,
                    useBluePrint: true,
                },
                {
                    file: 'package/web/rest/EntityResourceTest.java',
                    renameTo: generator => `${generator.packageFolder}/web/rest/${generator.entityClass}ResourceTest.java`,
                    useBluePrint: true,
                },
            ],
        },
        {
            condition: generator => generator.service === 'serviceImpl' && !generator.embedded,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/service/EntityService.java',
                    renameTo: generator => `${generator.packageFolder}/service/${generator.entityClass}Service.java`,
                },
                {
                    file: 'package/service/impl/EntityServiceImpl.java',
                    renameTo: generator => `${generator.packageFolder}/service/impl/${generator.entityClass}ServiceImpl.java`,
                },
            ],
        },
        {
            condition: generator => generator.service === 'serviceClass' && !generator.embedded,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/service/impl/EntityServiceImpl.java',
                    renameTo: generator => `${generator.packageFolder}/service/${generator.entityClass}Service.java`,
                },
            ],
        },
        {
            condition: generator => generator.hasDto,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/service/dto/EntityDTO.java',
                    renameTo: generator => `${generator.packageFolder}/service/dto/${generator.asDto(generator.entityClass)}.java`,
                },
                {
                    file: 'package/service/mapper/EntityMapper.java',
                    renameTo: generator => `${generator.packageFolder}/service/mapper/${generator.entityClass}Mapper.java`,
                },
            ],
        },
    ],
};

const serverFilesFromJHipster = {
    fakeData: [
        {
            condition: generator =>
                generator.databaseType === 'sql' &&
                !generator.skipFakeData &&
                !generator.skipDbChangelog &&
                (generator.fieldsContainImageBlob === true || generator.fieldsContainBlob === true),
            path: SERVER_MAIN_RES_DIR,
            templates: [{ file: 'config/liquibase/fake-data/blob/hipster.png', method: 'copy', noEjs: true }],
        },
        {
            condition: generator =>
                generator.databaseType === 'sql' &&
                !generator.skipFakeData &&
                !generator.skipDbChangelog &&
                generator.fieldsContainTextBlob === true,
            path: SERVER_MAIN_RES_DIR,
            templates: [{ file: 'config/liquibase/fake-data/blob/hipster.txt', method: 'copy' }],
        },
    ],
    dto: [
        {
            condition: generator => generator.hasDto,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/service/mapper/BaseEntityMapper.java',
                    renameTo: generator => `${generator.packageFolder}/service/mapper/EntityMapper.java`,
                },
            ],
        },
        {
            condition: generator => generator.hasDto,
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/service/dto/EntityDTOTest.java',
                    renameTo: generator => `${generator.packageFolder}/service/dto/${generator.asDto(generator.entityClass)}Test.java`,
                },
            ],
        },
        {
            condition: generator =>
                generator.hasDto &&
                (generator.databaseType === 'sql' || generator.databaseType === 'mongodb' || generator.databaseType === 'couchbase'),
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/service/mapper/EntityMapperTest.java',
                    renameTo: generator => `${generator.packageFolder}/service/mapper/${generator.entityClass}MapperTest.java`,
                },
            ],
        },
    ],
};

function updateDtoTest() {
    this.replaceContent(
        `${SERVER_TEST_SRC_DIR}/${this.packageFolder}/service/dto/${this.asDto(this.entityClass)}Test.java`,
        'web.rest.TestUtil',
        'TestUtil'
    );

    this.replaceContent(
        `${SERVER_TEST_SRC_DIR}/${this.packageFolder}/service/dto/${this.asDto(this.entityClass)}Test.java`,
        'getId()',
        'id'
    );

    this.replaceContent(
        `${SERVER_TEST_SRC_DIR}/${this.packageFolder}/service/dto/${this.asDto(this.entityClass)}Test.java`,
        'setId\\((.+)\\)',
        'id = $1',
        true
    );

    this.replaceContent(`${SERVER_TEST_SRC_DIR}/${this.packageFolder}/service/mapper/${this.entityClass}MapperTest.java`, 'getId()', 'id');
}

function writeFiles() {
    return {
        async writeServerFiles() {
            if (this.skipServer) return;

            // write server side files
            await this.writeFilesToDisk(serverFiles, this, false, 'quarkus');
            await this.writeFilesToDisk(serverFilesFromJHipster, this, false, this.fetchFromInstalledJHipster('entity-server/templates'));
            if (this.hasDto) {
                updateDtoTest.call(this);
            }

            if (this.databaseType === 'sql') {
                if (!this.skipDbChangelog) {
                    if (this.fieldsContainOwnerManyToMany || this.fieldsContainOwnerOneToOne || this.fieldsContainManyToOne) {
                        this.addConstraintsChangelogToLiquibase(`${this.changelogDate}_added_entity_constraints_${this.entityClass}`);
                    }
                    this.addChangelogToLiquibase(`${this.changelogDate}_added_entity_${this.entityClass}`);
                }
            }
        },

        updateCacheConfiguration() {
            if (this.enableHibernateCache) {
                new NeedleApi(this).quarkusServerCache.addEntityConfigurationToPropertiesFile(
                    this.asEntity(this.entityClass),
                    this.relationships,
                    this.packageName
                );
            }
        },

        async writeEnumFiles() {
            // TODO replace this with proper function.
            // const fetchFromInstalledKHipster = subpath => path.join(__dirname, subpath);
            for (const field of this.fields) {
                if (!field.fieldIsEnum) {
                    return;
                }

                const fieldType = field.fieldType;
                const enumInfo = {
                    ...jhipsterUtils.getEnumInfo(field, this.clientRootFolder),
                    angularAppName: this.angularAppName,
                    packageName: this.packageName,
                };
                // eslint-disable-next-line no-console
                if (!this.skipServer) {
                    const pathToTemplateFile = `${this.fetchFromInstalledJHipster(
                        'entity-server/templates'
                    )}/${SERVER_MAIN_SRC_DIR}package/domain/enumeration/Enum.java.ejs`;
                    await this.template(
                        pathToTemplateFile,
                        `${SERVER_MAIN_SRC_DIR}${this.packageFolder}/domain/enumeration/${fieldType}.java`,
                        this,
                        {},
                        enumInfo
                    );
                }
            }
        },
    };
}

module.exports = {
    writeFiles,
    serverFiles,
};
