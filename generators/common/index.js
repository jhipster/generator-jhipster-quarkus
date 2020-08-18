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
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint quarkus')}`);
        }

        this.configOptions = jhContext.configOptions || {};

        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupServerOptions(this, jhContext);
        jhContext.setupClientOptions(this, jhContext);
    }

    get initializing() {
        /**
         * Any method beginning with _ can be reused from the superclass `CommonGenerator`
         *
         * There are multiple ways to customize a phase from JHipster.
         *
         * 1. Let JHipster handle a phase, blueprint doesnt override anything.
         * ```
         *      return super._initializing();
         * ```
         *
         * 2. Override the entire phase, this is when the blueprint takes control of a phase
         * ```
         *      return {
         *          myCustomInitPhaseStep() {
         *              // Do all your stuff here
         *          },
         *          myAnotherCustomInitPhaseStep(){
         *              // Do all your stuff here
         *          }
         *      };
         * ```
         *
         * 3. Partially override a phase, this is when the blueprint gets the phase from JHipster and customizes it.
         * ```
         *      const phaseFromJHipster = super._initializing();
         *      const myCustomPhaseSteps = {
         *          displayLogo() {
         *              // override the displayLogo method from the _initializing phase of JHipster
         *          },
         *          myCustomInitPhaseStep() {
         *              // Do all your stuff here
         *          },
         *      }
         *      return Object.assign(phaseFromJHipster, myCustomPhaseSteps);
         * ```
         */
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._initializing();
    }

    get prompting() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._prompting();
    }

    get configuring() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._configuring();
    }

    get default() {
        const phaseFromJHipster = super._default();
        const phaseFromQuarkus = {
            defineJHipsterQuarkusVersion() {
                this.jhipsterQuarkusVersion = jhipsterQuarkusVersion;
            },
            setupSharedOptions() {
                this.BUILD_DIR = this.getBuildDirectoryForBuildTool(this.buildTool);
                this.CLIENT_DIST_DIR = this.getResourceBuildDirectoryForBuildToolQuarkus(this.buildTool);
            }
        };
        return Object.assign(phaseFromJHipster, phaseFromQuarkus);
    }

    /**
     * Get resource build directory used by buildTool
     * @param {string} buildTool - buildTool
     */
    getResourceBuildDirectoryForBuildToolQuarkus(buildTool) {
        return buildTool === 'maven' ? 'target/classes/' : 'build/resources/main/META-INF/resources';
    }

    get writing() {
        const phaseFromJHipster = super._writing();
        const phaseFromQuarkus = writeFiles();
        return Object.assign(phaseFromJHipster, phaseFromQuarkus);
    }

    get install() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._install();
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }
};
