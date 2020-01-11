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
const mkdirp = require('mkdirp');
const cleanup = require('generator-jhipster/generators/cleanup');
const constants = require('generator-jhipster/generators/generator-constants');

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
            templates: [
                { file: 'mvnw', method: 'copy', noEjs: true },
                { file: 'mvnw.cmd', method: 'copy', noEjs: true },
                { file: '.mvn/wrapper/maven-wrapper.jar', method: 'copy', noEjs: true },
                { file: '.mvn/wrapper/maven-wrapper.properties', method: 'copy', noEjs: true },
                { file: '.mvn/wrapper/MavenWrapperDownloader.java', method: 'copy', noEjs: true },
                { file: 'pom.xml', options: { interpolate: INTERPOLATE_REGEX } }
            ]
        }
    ],
    serverResource: [
        {
            path: SERVER_MAIN_RES_DIR,
            templates: ['application.properties']
        }
    ],
    //  serverJavaWebError: [
    //     {
    //         path: SERVER_MAIN_SRC_DIR,
    //         templates: [
    //             {
    //                 file: 'package/web/rest/errors/BadRequestAlertException.java',
    //                 renameTo: generator => `${generator.javaDir}web/rest/errors/BadRequestAlertException.java`
    //             }
    //         ]
    //     }
    //  ],
    serverJavaWebUtil: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/web/util/HeaderUtil.java',
                    renameTo: generator => `${generator.javaDir}web/util/HeaderUtil.java`
                },
                {
                    file: 'package/web/util/ResponseUtil.java',
                    renameTo: generator => `${generator.javaDir}web/util/ResponseUtil.java`
                }
            ]
        }
    ],
    docker: [
        {
            path: DOCKER_DIR,
            templates: ['Dockerfile.jvm', 'Dockerfile.native']
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
        }
    };
}

module.exports = {
    writeFiles,
    serverFiles
};
