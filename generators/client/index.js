/* eslint-disable consistent-return */
const chalk = require('chalk');
const ClientGenerator = require('generator-jhipster/generators/client');
const constants = require('generator-jhipster/generators/generator-constants');
const writeAngularFiles = require('./files-angular').writeFiles;
const writeReactFiles = require('./files-react').writeFiles;

const { ANGULAR, REACT } = constants.SUPPORTED_CLIENT_FRAMEWORKS;

module.exports = class extends ClientGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint quarkus')}`);
        }

        this.configOptions = jhContext.configOptions || {};

        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupClientOptions(this, jhContext);
    }

    get initializing() {
        return super._initializing();
    }

    get prompting() {
        return super._prompting();
    }

    get configuring() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._configuring();
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        const phaseFromJHipster = super._writing();
        const phaseFromQuarkus = {
            writeQuarkusFiles() {
                if (this.skipClient) return;
                if (this.clientFramework === ANGULAR) {
                    return writeAngularFiles.call(this);
                }
                if (this.clientFramework === REACT) {
                    return writeReactFiles.call(this);
                }
            }
        };
        return { ...phaseFromJHipster, ...phaseFromQuarkus };
    }

    get install() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._install();
    }

    get end() {
        return super._end();
    }
};
