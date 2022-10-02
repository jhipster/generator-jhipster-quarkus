/* eslint-disable consistent-return */
const chalk = require('chalk');
const AppGenerator = require('generator-jhipster/generators/app');
const constants = require('generator-jhipster/generators/generator-constants');
const packagejs = require('../../package.json');
const { askForTestOpts } = require("./prompts");

module.exports = class extends AppGenerator {
    constructor(args, options, features) {
        delete options.applicationWithEntities;
        super(args, options, features);

        if (this.options.help) return;

        if (!this.options.jhipsterContext) {
            throw new Error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints quarkus')}`);
        }
    }

    get initializing() {
        constants.CLIENT_DIST_DIR = 'META-INF/resources';
        const phaseFromJHipster = super._initializing();
        const phaseFromQuarkus = {
            displayLogo() {
                this.log('\n');
                this.log(`${chalk.cyan('             ██████╗ ')}${chalk.red(' ██╗   ██╗  █████╗  ██████╗  ██╗  ██╗ ██╗   ██╗ ███████╗')}`);
                this.log(`${chalk.cyan('            ██╔═══██╗')}${chalk.red(' ██║   ██║ ██╔══██╗ ██╔══██╗ ██║ ██╔╝ ██║   ██║ ██╔════╝')}`);
                this.log(`${chalk.cyan('            ██║   ██║')}${chalk.red(' ██║   ██║ ███████║ ██████╔╝ █████╔╝  ██║   ██║ ███████╗')}`);
                this.log(`${chalk.cyan('            ██║▄▄ ██║')}${chalk.red(' ██║   ██║ ██╔══██║ ██╔══██╗ ██╔═██╗  ██║   ██║ ╚════██║')}`);
                this.log(`${chalk.cyan('            ╚██████╔╝')}${chalk.red(' ╚██████╔╝ ██║  ██║ ██║  ██║ ██║  ██╗ ╚██████╔╝ ███████║')}`);
                this.log(`${chalk.cyan('             ╚══▀▀═╝ ')}${chalk.red('  ╚═════╝  ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝  ╚═════╝  ╚══════╝')}`);
                this.log(chalk.white.bold('                            https://www.jhipster.tech - https://quarkus.io\n'));
                this.log(chalk.white('Welcome to JHipster Quarkus ') + chalk.yellow(`v${packagejs.version}`));
                this.log(chalk.white(`Application files will be generated in folder: ${chalk.yellow(process.cwd())}`));
                if (process.cwd() === this.getUserHome()) {
                    this.log(chalk.red.bold('\n️⚠️  WARNING ⚠️  You are in your HOME folder!'));
                    this.log(
                        chalk.red(
                            'This can cause problems, you should always create a new directory and run the jhipster command from here.'
                        )
                    );
                    this.log(chalk.white(`See the troubleshooting section at ${chalk.yellow('https://www.jhipster.tech/installation/')}`));
                }
                this.log(
                    chalk.green(
                        ' _______________________________________________________________________________________________________________\n'
                    )
                );
                this.log(
                    chalk.white(
                        `  Documentation for creating an application is at ${chalk.yellow('https://github.com/jhipster/jhipster-quarkus')}`
                    )
                );
                this.log(
                    chalk.white(
                        `  If you find JHipster useful, consider sponsoring the project at ${chalk.yellow(
                            'https://opencollective.com/generator-jhipster'
                        )}`
                    )
                );
                this.log(
                    chalk.green(
                        ' _______________________________________________________________________________________________________________\n'
                    )
                );
            },
        };

        return { ...phaseFromJHipster, ...phaseFromQuarkus };
    }

    get prompting() {
        const phaseFromJHipster = super._prompting();
        return {
            askForModuleName: phaseFromJHipster.askForModuleName,
        };
    }

    get configuring() {
        return super._configuring();
    }

    get composing() {
        return {
            ...super._composing(),
            askForTestOpts: askForTestOpts,
            askForMoreModules: undefined,
        };
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
        return super._writing();
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
