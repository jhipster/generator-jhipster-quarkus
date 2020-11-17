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
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint quarkus')}`);
        }

        this.configOptions = jhContext.configOptions || {};

        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupServerOptions(this, jhContext);
    }

    get initializing() {
        const phaseFromJHipster = super._initializing();
        const phaseFromQuarkus = {
            defineQuarkusConstants() {
                this.quarkusVersion = QUARKUS_VERSION;
                this.CACHE_MAXIMUM_SIZE = CACHE_MAXIMUM_SIZE;
                this.CACHE_EXPIRE_AFTER_WRITE = CACHE_EXPIRE_AFTER_WRITE;
            }
        };
        return { ...phaseFromJHipster, ...phaseFromQuarkus };
    }

    get prompting() {
        const phaseFromJHipster = super._prompting();
        const phaseFromQuarkus = {
            askForServerSideOpts: prompts.askForServerSideOpts,
            askForOptionalItems: undefined
        };
        return { ...phaseFromJHipster, ...phaseFromQuarkus };
    }

    get configuring() {
        const phaseFromJHipster = super._configuring();
        const phaseFromQuarkus = {
            configureGlobalQuarkus() {
                // Override JHipster cacheManagerIsAvailable property to only handle Quarkus caches
                this.cacheManagerIsAvailable = ['caffeine'].includes(this.cacheProvider);
            }
        };

        return { ...phaseFromJHipster, ...phaseFromQuarkus };
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        return writeFiles(this.buildTool);
    }

    get install() {
        // Here we are not overriding this phase and hence its being handled by JHipster
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
            }
        };
    }
};
