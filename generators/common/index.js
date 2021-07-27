/* eslint-disable consistent-return */
const chalk = require('chalk');
const CommonGenerator = require('generator-jhipster/generators/common');
const writeFiles = require('./files').writeFiles;
const jhipsterQuarkusVersion = require('../../package.json').version;

module.exports = class extends CommonGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints quarkus')}`);
        }
    }

    get initializing() {
        return super._initializing();
    }

    get prompting() {
        return super._prompting();
    }

    get configuring() {
        return super._configuring();
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
        const phaseFromJHipster = super._default();
        const phaseFromQuarkus = {
            defineJHipsterQuarkusVersion() {
                this.jhipsterQuarkusVersion = jhipsterQuarkusVersion;
            },
        };
        return { ...phaseFromJHipster, ...phaseFromQuarkus };
    }

    get writing() {
        const phaseFromJHipster = super._writing();
        const phaseFromQuarkus = writeFiles();
        return { ...phaseFromJHipster, ...phaseFromQuarkus };
    }

    get postWriting() {
        return super._postWriting();
    }

    get install() {
        return super._install();
    }

    get end() {
        return super._end();
    }
};
