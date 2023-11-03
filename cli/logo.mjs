import chalk from 'chalk';
import { packageJson } from '../generators/constants.js';

export const getLogo = () => `
${chalk.cyan('             ██████╗ ')}${chalk.red(' ██╗   ██╗  █████╗  ██████╗  ██╗  ██╗ ██╗   ██╗ ███████╗')}
${chalk.cyan('            ██╔═══██╗')}${chalk.red(' ██║   ██║ ██╔══██╗ ██╔══██╗ ██║ ██╔╝ ██║   ██║ ██╔════╝')}
${chalk.cyan('            ██║   ██║')}${chalk.red(' ██║   ██║ ███████║ ██████╔╝ █████╔╝  ██║   ██║ ███████╗')}
${chalk.cyan('            ██║▄▄ ██║')}${chalk.red(' ██║   ██║ ██╔══██║ ██╔══██╗ ██╔═██╗  ██║   ██║ ╚════██║')}
${chalk.cyan('            ╚██████╔╝')}${chalk.red(' ╚██████╔╝ ██║  ██║ ██║  ██║ ██║  ██╗ ╚██████╔╝ ███████║')}
${chalk.cyan('             ╚══▀▀═╝ ')}${chalk.red('  ╚═════╝  ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝  ╚═════╝  ╚══════╝')}
${chalk.white.bold('                            https://www.jhipster.tech - https://quarkus.io\n')}
${chalk.white('Welcome to JHipster Quarkus ') + chalk.yellow(`v${packageJson.version}`)}
`;
/*
${chalk.white(`Application files will be generated in folder: ${chalk.yellow(process.cwd())}`)}
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
*/
