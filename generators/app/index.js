const chalk = require('chalk');
const AppGenerator = require('generator-jhipster/generators/app');
const packagejs = require('../../package.json');

module.exports = class extends AppGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint quarkus')}`);
        }

        this.configOptions = jhContext.configOptions || {};
    }

    get initializing() {
        const phaseFromJHipster = super._initializing();
        const phaseFromQuarkus = {
            displayLogo() {
                this.log('\n');
                this.log(`${chalk.green('        ██╗')}${chalk.red(' ██╗   ██╗ ████████╗ ███████╗   ██████╗ ████████╗ ████████╗ ███████╗')}`);
                this.log(`${chalk.green('        ██║')}${chalk.red(' ██║   ██║ ╚══██╔══╝ ██╔═══██╗ ██╔════╝ ╚══██╔══╝ ██╔═════╝ ██╔═══██╗')}`);
                this.log(`${chalk.green('        ██║')}${chalk.red(' ████████║    ██║    ███████╔╝ ╚█████╗     ██║    ██████╗   ███████╔╝')}`);
                this.log(`${chalk.green('  ██╗   ██║')}${chalk.red(' ██╔═══██║    ██║    ██╔════╝   ╚═══██╗    ██║    ██╔═══╝   ██╔══██║')}`);
                this.log(`${chalk.green('  ╚██████╔╝')}${chalk.red(' ██║   ██║ ████████╗ ██║       ██████╔╝    ██║    ████████╗ ██║  ╚██╗')}`);
                this.log(`${chalk.green('   ╚═════╝ ')}${chalk.red(' ╚═╝   ╚═╝ ╚═══════╝ ╚═╝       ╚═════╝     ╚═╝    ╚═══════╝ ╚═╝   ╚═╝')}`);
                this.log('\n');
                this.log(`${chalk.cyan('             ██████╗ ')}${chalk.red('██╗   ██╗ █████╗ ██████╗ ██╗  ██╗██╗   ██╗███████╗')}`);
                this.log(`${chalk.cyan('            ██╔═══██╗')}${chalk.red('██║   ██║██╔══██╗██╔══██╗██║ ██╔╝██║   ██║██╔════╝')}`);
                this.log(`${chalk.cyan('            ██║   ██║')}${chalk.red('██║   ██║███████║██████╔╝█████╔╝ ██║   ██║███████╗')}`);
                this.log(`${chalk.cyan('            ██║▄▄ ██║')}${chalk.red('██║   ██║██╔══██║██╔══██╗██╔═██╗ ██║   ██║╚════██║')}`);
                this.log(`${chalk.cyan('            ╚██████╔╝')}${chalk.red('╚██████╔╝██║  ██║██║  ██║██║  ██╗╚██████╔╝███████║')}`);
                this.log(`${chalk.cyan('             ╚══▀▀═╝ ')}${chalk.red(' ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝')}`);
                this.log(chalk.white.bold('                            https://www.jhipster.tech - https://quarkus.io\n'));
                this.log(chalk.white('Welcome to JHipster Quarkus ') + chalk.yellow(`v${packagejs.version}`));
                this.log(chalk.white(`Application files will be generated in folder: ${chalk.yellow(process.cwd())}`));
                if (process.cwd() === this.getUserHome()) {
                    this.log(chalk.red.bold('\n️⚠️  WARNING ⚠️  You are in your HOME folder!'));
                    this.log(
                        chalk.red('This can cause problems, you should always create a new directory and run the jhipster command from here.')
                    );
                    this.log(chalk.white(`See the troubleshooting section at ${chalk.yellow('https://www.jhipster.tech/installation/')}`));
                }
                this.log(
                    chalk.green(
                        ' _______________________________________________________________________________________________________________\n'
                    )
                );
                this.log(
                    chalk.white(`  Documentation for creating an application is at ${chalk.yellow('https://github.com/jhipster/jhipster-quarkus')}`)
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
            }
        };

        return { ...phaseFromJHipster, ...phaseFromQuarkus };
    }

    get prompting() {
        const phaseFromJHipster = super._prompting();
        const phaseFromQuarkus = {
            askForModuleName: phaseFromJHipster.askForModuleName
        };
        return phaseFromQuarkus;
    }

    get configuring() {
        return super._configuring();
    }

    get default() {
        const phaseFromJHipster = super._default();
        const phaseFromQuarkus = {
            askForTestOpts: undefined,
            askForMoreModules: undefined
        };
        return { ...phaseFromJHipster, ...phaseFromQuarkus };
    }

    get writing() {
        return super._writing();
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }
};
