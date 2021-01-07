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
const constants = require('generator-jhipster/generators/generator-constants');

const { ANGULAR_DIR, CLIENT_TEST_SRC_DIR } = constants;

const filesAngular = {
    angularAdminModule: [
        {
            path: ANGULAR_DIR,
            templates: [{ file: 'admin/health/health.component.html', method: 'processHtml' }, 'admin/health/health.service.ts'],
        },
    ],
    clientTestFw: [
        {
            path: CLIENT_TEST_SRC_DIR,
            templates: ['spec/app/admin/health/health.component.spec.ts'],
        },
    ],
};

function writeFiles() {
    this.writeFilesToDisk(filesAngular, this, false, 'angular');
}

module.exports = {
    writeFiles,
    files: filesAngular,
};
