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
import { javaMainPackageTemplatesBlock, javaTestPackageTemplatesBlock } from 'generator-jhipster/generators/java/support';

export const entityQuarkusFiles = {
    server: [
        javaMainPackageTemplatesBlock({
            templates: ['_entityPackage_/domain/_persistClass_.java', '_entityPackage_/web/rest/_entityClass_Resource.java'],
        }),
        javaMainPackageTemplatesBlock({
            condition: generator => generator.dataAccess === 'repository',
            templates: ['_entityPackage_/repository/_entityClass_Repository.java'],
        }),
        javaMainPackageTemplatesBlock({
            condition: generator => generator.paginationAny,
            templates: ['_entityPackage_/service/Paged.java'],
        }),
        javaMainPackageTemplatesBlock({
            condition: generator => generator.paginationAny,
            templates: ['web/rest/vm/PageRequestVM.java', 'web/rest/vm/SortRequestVM.java', 'web/util/PaginationUtil.java'],
        }),
        javaTestPackageTemplatesBlock({
            templates: ['_entityPackage_/web/rest/_entityClass_ResourceTest.java'],
        }),
        javaTestPackageTemplatesBlock({
            condition: generator =>
                generator.dtoMapstruct &&
                (generator.databaseType === 'sql' || generator.databaseType === 'mongodb' || generator.databaseType === 'couchbase'),
            templates: ['_entityPackage_/service/mapper/_entityClass_MapperTest.java'],
        }),
        javaMainPackageTemplatesBlock({
            condition: generator => generator.service === 'serviceImpl' && !generator.embedded,
            templates: ['_entityPackage_/service/_entityClass_Service.java', '_entityPackage_/service/impl/_entityClass_ServiceImpl.java'],
        }),
        javaMainPackageTemplatesBlock({
            condition: generator => generator.service === 'serviceClass' && !generator.embedded,
            renameTo: (_data, file) => file.replace('service/impl', 'service').replace('Impl.java', '.java'),
            templates: ['_entityPackage_/service/impl/_entityClass_ServiceImpl.java'],
        }),
        javaMainPackageTemplatesBlock({
            condition: generator => generator.dtoMapstruct,
            templates: ['_entityPackage_/service/dto/_dtoClass_.java', '_entityPackage_/service/mapper/_entityClass_Mapper.java'],
        }),
    ],
};

export const entityServerFilesFromJHipster = {
    dto: [
        javaMainPackageTemplatesBlock({
            condition: generator => generator.dtoMapstruct,
            templates: ['_entityPackage_/service/mapper/EntityMapper.java'],
        }),
        javaTestPackageTemplatesBlock({
            condition: generator => generator.dtoMapstruct,
            templates: ['_entityPackage_/service/dto/_dtoClass_Test.java'],
        }),
    ],
};
