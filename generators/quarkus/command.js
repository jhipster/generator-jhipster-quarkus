import chalk from 'chalk';
import { GENERATOR_JAVA, GENERATOR_LIQUIBASE, GENERATOR_SPRING_DATA_RELATIONAL } from 'generator-jhipster/generators';
import { command as serverCommand } from 'generator-jhipster/generators/server';
import { command as springBootCommand } from 'generator-jhipster/generators/spring-boot';

const { applicationType } = serverCommand.configs;
const { defaultPackaging } = springBootCommand.configs;

import { asCommand } from 'generator-jhipster';

export default asCommand({
    options: {},
    configs: {
        applicationType,
        defaultPackaging,
        serverPort: {
            prompt: gen => ({
                when: answers =>
                    ['gateway', 'microservice'].includes(answers.applicationType ?? gen.jhipsterConfigWithDefaults.applicationType),
                type: 'input',
                validate: input => (/^([0-9]*)$/.test(input) ? true : 'This is not a valid port number.'),
                message:
                    'As you are running in a microservice architecture, on which port would like your server to run? It should be unique to avoid port conflicts.',
                default: answers =>
                    (answers.applicationType ?? gen.jhipsterConfigWithDefaults.applicationType) === 'microservice' ? 8081 : 8080,
            }),
            scope: 'storage',
        },
        packageName: {
            prompt: {
                type: 'input',
                validate: input =>
                    /^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input)
                        ? true
                        : 'The package name you have provided is not a valid Java package name.',
                message: 'What is your default Java package name?',
                default: 'com.mycompany.myapp',
            },
            scope: 'storage',
        },
        authenticationType: {
            description: 'Provide authentication type for the application when skipping server side generation',
            cli: {
                name: 'auth',
                type: String,
            },
            prompt: {
                type: 'list',
                message: `Which ${chalk.yellow('*type*')} of authentication would you like to use?`,
            },
            choices: [
                { value: 'jwt', name: 'JWT authentication (stateless, with a token)' },
                { value: 'oauth2', name: 'OAuth 2.0 / OIDC Authentication (stateful, generated with Keycloak)' },
            ],
            scope: 'storage',
        },
        buildTool: {
            description: 'Provide build tool for the application when skipping server side generation',
            cli: {
                name: 'build',
                type: String,
            },
            prompt: {
                type: 'list',
                message: 'Would you like to use Maven or Gradle for building the backend?',
            },
            choices: [
                { value: 'maven', name: 'Maven' },
                { value: 'gradle', name: 'Gradle' },
            ],
            scope: 'storage',
        },
        databaseType: {
            prompt: {
                type: 'list',
                message: `Which ${chalk.yellow('*type*')} of database would you like to use?`,
                default: 'sql',
            },
            choices: [
                { value: 'sql', name: 'SQL (SQL databases)' },
                { value: 'mongodb', name: 'MongoDB' },
            ],
            scope: 'storage',
        },
        prodDatabaseType: {
            prompt: gen => ({
                when: answers => (answers.databaseType ?? gen.jhipsterConfigWithDefaults.databaseType) === 'sql',
                type: 'list',
                message: `Which ${chalk.yellow('*production*')} database would you like to use?`,
            }),
            choices: [
                { value: 'postgresql', name: 'PostgreSQL' },
                { value: 'mysql', name: 'MySQL' },
                { value: 'mariadb', name: 'MariaDB' },
                { value: 'oracle', name: 'Oracle' },
                { value: 'mssql', name: 'Microsoft SQL Server' },
            ],
            scope: 'storage',
        },
        devDatabaseType: {
            cli: {
                type: String,
            },
            prompt: gen => ({
                when: answers => (answers.databaseType ?? gen.jhipsterConfigWithDefaults.databaseType) === 'sql',
                type: 'list',
                default: null,
                message: `Which ${chalk.yellow('*development*')} database would you like to use?`,
            }),
            choices: [
                { value: 'h2Disk', name: 'H2 with disk-based persistence' },
                { value: 'h2Memory', name: 'H2 with in-memory persistence' },
                // Drop null value due to jhipster issue
                // { value: null, name: 'Same as production' },
            ],
            scope: 'storage',
        },
        cacheProvider: {
            description: 'Cache provider',
            cli: {
                type: String,
            },
            prompt: {
                type: 'list',
                message: 'Do you want to use the Quarkus cache abstraction?',
            },
            choices: [
                { value: 'caffeine', name: 'Yes, with the Caffeine implementation (local cache, for a single node)' },
                { value: 'redis', name: 'Yes, with the Redis implementation - Warning, this will disable the Hibernate 2nd level cache!' },
                { value: 'no', name: 'No' },
            ],
            scope: 'storage',
        },
        enableHibernateCache: {
            description: 'Enable hibernate cache',
            cli: {
                type: Boolean,
            },
            prompt: gen => ({
                when: answers =>
                    (answers.databaseType ?? gen.jhipsterConfigWithDefaults.databaseType) === 'sql' &&
                    !['redis'].includes(answers.cacheProvider ?? gen.jhipsterConfigWithDefaults.cacheProvider),
                type: 'confirm',
                message: 'Do you want to use Hibernate 2nd level cache?',
                default: true,
            }),
            scope: 'storage',
        },
    },
    import: [GENERATOR_JAVA, GENERATOR_LIQUIBASE, GENERATOR_SPRING_DATA_RELATIONAL],
});
