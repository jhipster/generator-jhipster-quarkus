/* eslint-disable consistent-return */
const chalk = require('chalk');
const os = require('os');
const ServerGenerator = require('generator-jhipster/generators/server');
const prompts = require('./prompts');
const writeFiles = require('./files').writeFiles;
const { QUARKUS_VERSION, CACHE_MAXIMUM_SIZE, CACHE_EXPIRE_AFTER_WRITE } = require('../generator-quarkus-constants');

module.exports = class extends ServerGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints quarkus')}`);
        }
    }

    get initializing() {
        const phaseFromJHipster = super._initializing();
        const phaseFromQuarkus = {
            defineQuarkusConstants() {
                this.quarkusVersion = QUARKUS_VERSION;
                this.CACHE_MAXIMUM_SIZE = CACHE_MAXIMUM_SIZE;
                this.CACHE_EXPIRE_AFTER_WRITE = CACHE_EXPIRE_AFTER_WRITE;
            },
            setupServerConsts() {
                this.serviceDiscoveryType = this.jhipsterConfig.serviceDiscoveryType;
                this.authenticationType = this.jhipsterConfig.authenticationType;
                this.jwtSecretKey = this.jhipsterConfig.jwtSecretKey;
                this.skipUserManagement = this.jhipsterConfig.skipUserManagement;
                this.packageName = this.jhipsterConfig.packageName;
                this.serverPort = this.jhipsterConfig.serverPort;
                this.cacheProvider = this.jhipsterConfig.cacheProvider;
                this.enableHibernateCache = this.jhipsterConfig.enableHibernateCache;
                this.databaseType = this.jhipsterConfig.databaseType;
                this.devDatabaseType = this.jhipsterConfig.devDatabaseType;
                this.prodDatabaseType = this.jhipsterConfig.prodDatabaseType;
                this.searchEngine = this.jhipsterConfig.searchEngine;
                this.buildTool = this.jhipsterConfig.buildTool;
                this.enableHibernateCache = this.jhipsterConfig.enableHibernateCache;
            },
        };
        return { ...phaseFromJHipster, ...phaseFromQuarkus };
    }

    get prompting() {
        const phaseFromJHipster = super._prompting();
        const phaseFromQuarkus = {
            askForServerSideOpts: prompts.askForServerSideOpts,
            askForOptionalItems: undefined,
            setSharedQuarkusConfigOptions() {
                this.jhipsterConfig.serviceDiscoveryType = this.serviceDiscoveryType;
                this.jhipsterConfig.authenticationType = this.authenticationType;
                this.jhipsterConfig.jwtSecretKey = this.jwtSecretKey;
                this.jhipsterConfig.skipUserManagement = this.skipUserManagement;
                this.jhipsterConfig.packageName = this.packageName;
                this.jhipsterConfig.serverPort = this.serverPort;
                this.jhipsterConfig.cacheProvider = this.cacheProvider;
                this.jhipsterConfig.enableHibernateCache = this.enableHibernateCache;
                this.jhipsterConfig.databaseType = this.databaseType;
                this.jhipsterConfig.devDatabaseType = this.devDatabaseType;
                this.jhipsterConfig.prodDatabaseType = this.prodDatabaseType;
                this.jhipsterConfig.searchEngine = this.searchEngine;
                this.jhipsterConfig.buildTool = this.buildTool;
            },
        };
        return { ...phaseFromJHipster, ...phaseFromQuarkus };
    }

    get configuring() {
        const phaseFromJHipster = super._configuring();
        const phaseFromQuarkus = {
            configureGlobalQuarkus() {
                // Override JHipster cacheManagerIsAvailable property to only handle Quarkus caches
                this.cacheManagerIsAvailable = ['caffeine', 'redis'].includes(this.cacheProvider);
            },
        };

        return { ...phaseFromJHipster, ...phaseFromQuarkus };
    }

    get composing() {
        return super._composing();
    }

    get loading() {
        return super._loading();
    }

    get preparing() {
        return super._preparing();
    }

    get default() {
        return super._default();
    }

    get writing() {
        return writeFiles(this.buildTool);
    }

    get postWriting() {
        return super._postWriting();
    }

    get install() {
        return super._install();
    }

    get end() {
        return {
            end() {
                this.log(chalk.green.bold('\nServer application generated successfully.\n'));

                let executable = 'mvnw';
                if (this.buildTool === 'gradle') {
                    executable = 'gradlew';
                }
                let logMsgComment = '';
                if (os.platform() === 'win32') {
                    logMsgComment = ` (${chalk.yellow.bold(executable)} if using Windows Command Prompt)`;
                }
                this.log(chalk.green(`Run your Quarkus application:\n${chalk.yellow.bold(`./${executable}`)}${logMsgComment}`));
            },
        };
    }
};
