/**
 * Overriding server prompt from official: https://raw.githubusercontent.com/jhipster/generator-jhipster/master/generators/server/prompts.js
 */
const chalk = require('chalk');

const constants = require('generator-jhipster/generators/generator-constants');

module.exports = {
    askForServerSideOpts,
};

async function askForServerSideOpts() {
    if (this.existingProject) return;

    const applicationType = this.jhipsterConfig.applicationType;
    const reactive = this.jhipsterConfig.reactive;
    const defaultPort = applicationType === 'gateway' ? '8080' : '8081';

    const prompts = [
        {
            when: response => applicationType === 'gateway' || applicationType === 'microservice',
            type: 'input',
            name: 'serverPort',
            validate: input => (/^([0-9]*)$/.test(input) ? true : 'This is not a valid port number.'),
            message:
                'As you are running in a microservice architecture, on which port would like your server to run? It should be unique to avoid port conflicts.',
            default: defaultPort,
        },
        {
            type: 'input',
            name: 'packageName',
            validate: input =>
                /^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input)
                    ? true
                    : 'The package name you have provided is not a valid Java package name.',
            message: 'What is your default Java package name?',
            default: 'com.mycompany.myapp',
            store: true,
        },
        //     when: response => applicationType === 'gateway' || applicationType === 'microservice',
        //     type: 'list',
        //     name: 'serviceDiscoveryType',
        //     message: 'Which service discovery server do you want to use?',
        //     choices: [
        //         {
        //             value: 'eureka',
        //             name: 'JHipster Registry (uses Eureka, provides Spring Cloud Config support and monitoring dashboards)'
        //         },
        //         {
        //             value: 'consul',
        //             name: 'Consul'
        //         },
        //         {
        //             value: false,
        //             name: 'No service discovery'
        //         }
        //     ],
        //     default: 'eureka'
        // },
        // {
        //     when: applicationType === 'monolith',
        //     type: 'list',
        //     name: 'serviceDiscoveryType',
        //     message: 'Do you want to use the JHipster Registry to configure, monitor and scale your application?',
        //     choices: [
        //         {
        //             value: false,
        //             name: 'No'
        //         },
        //         {
        //             value: 'eureka',
        //             name: 'Yes'
        //         }
        //     ],
        //     default: false
        // },
        {
            when: response =>
                (applicationType === 'monolith' && response.serviceDiscoveryType !== 'eureka') ||
                ['gateway', 'microservice'].includes(applicationType),
            type: 'list',
            name: 'authenticationType',
            message: `Which ${chalk.yellow('*type*')} of authentication would you like to use?`,
            choices: response => {
                const opts = [
                    {
                        value: 'jwt',
                        name: 'JWT authentication (stateless, with a token)',
                    },
                ];
                /* if (applicationType === 'monolith' && response.serviceDiscoveryType !== 'eureka') {
                    opts.push({
                        value: 'session',
                        name: 'HTTP Session Authentication (stateful, default Quarkus mechanism)'
                    });
                } */
                opts.push({
                    value: 'oauth2',
                    name: 'OAuth 2.0 / OIDC Authentication (stateful, works with Keycloak and Okta)',
                });
                return opts;
            },
            default: 0,
        },
        {
            type: 'list',
            name: 'databaseType',
            message: `Which ${chalk.yellow('*type*')} of database would you like to use?`,
            choices: response => {
                const opts = [];
                if (!reactive) {
                    opts.push({
                        value: 'sql',
                        name: 'SQL (H2, MySQL, MariaDB, PostgreSQL, Oracle, MSSQL)',
                    });
                } else {
                    opts.push({
                        value: 'sql',
                        name: 'SQL (H2, MySQL, PostgreSQL, MSSQL)',
                    });
                }
                opts.push({
                    value: 'mongodb',
                    name: 'MongoDB [WARNING: broken with Gradle]',
                });
                /*
                if (response.authenticationType !== 'oauth2') {
                    opts.push({
                        value: 'cassandra',
                        name: 'Cassandra'
                    });
                }
                opts.push({
                    value: 'couchbase',
                    name: 'Couchbase'
                });
                opts.push({
                    value: 'neo4j',
                    name: '[BETA] Neo4j'
                });
                */
                opts.push({
                    value: 'no',
                    name: 'No database',
                });
                return opts;
            },
            default: 0,
        },
        {
            when: response => response.databaseType === 'sql',
            type: 'list',
            name: 'prodDatabaseType',
            message: `Which ${chalk.yellow('*production*')} database would you like to use?`,
            choices: reactive ? constants.R2DBC_DB_OPTIONS : constants.SQL_DB_OPTIONS,
            default: 0,
        },
        {
            when: response => response.databaseType === 'sql',
            type: 'list',
            name: 'devDatabaseType',
            message: `Which ${chalk.yellow('*development*')} database would you like to use?`,
            choices: response =>
                [
                    {
                        value: 'h2Disk',
                        name: 'H2 with disk-based persistence',
                    },
                    {
                        value: 'h2Memory',
                        name: 'H2 with in-memory persistence',
                    },
                ].concat(constants.SQL_DB_OPTIONS.find(it => it.value === response.prodDatabaseType)),
            default: 0,
        },
        {
            when: () => !reactive,
            type: 'list',
            name: 'cacheProvider',
            message: 'Do you want to use the Quarkus cache abstraction?',
            choices: [
                /*
                {
                    value: 'ehcache',
                    name: 'Yes, with the Ehcache implementation (local cache, for a single node)'
                },
                */
                {
                    value: 'caffeine',
                    name: 'Yes, with the Caffeine implementation (local cache, for a single node)',
                },
                /*
                {
                    value: 'hazelcast',
                    name:
                        'Yes, with the Hazelcast implementation (distributed cache, for multiple nodes, supports rate-limiting for gateway applications)'
                },
                {
                    value: 'infinispan',
                    name: '[BETA] Yes, with the Infinispan implementation (hybrid cache, for multiple nodes)'
                },
                {
                    value: 'memcached',
                    name:
                        'Yes, with Memcached (distributed cache) - Warning, when using an SQL database, this will disable the Hibernate 2nd level cache!'
                },
                */
                {
                    value: 'redis',
                    name: 'Yes, with the Redis implementation - Warning, this will disable the Hibernate 2nd level cache!',
                },
                {
                    value: 'no',
                    name: 'No',
                },
            ],
        },
        {
            when: response => response.databaseType === 'sql' && !reactive && !['redis'].includes(response.cacheProvider),
            type: 'confirm',
            name: 'enableHibernateCache',
            message: 'Do you want to use Hibernate 2nd level cache?',
            default: true,
        },
        {
            type: 'list',
            name: 'buildTool',
            message: 'Would you like to use Maven or Gradle for building the backend?',
            choices: [
                {
                    value: 'maven',
                    name: 'Maven',
                },
                {
                    value: 'gradle',
                    name: 'Gradle',
                },
            ],
            default: 'maven',
        },
    ];

    // eslint-disable-next-line consistent-return
    return this.prompt(prompts).then(answers => {
        this.jhipsterConfig.serviceDiscoveryType = answers.serviceDiscoveryType;

        this.jhipsterConfig.authenticationType = answers.authenticationType;

        this.jhipsterConfig.packageName = answers.packageName;
        this.jhipsterConfig.serverPort = answers.serverPort || '8080';
        this.jhipsterConfig.cacheProvider = !answers.reactive ? answers.cacheProvider : 'no';
        this.jhipsterConfig.enableHibernateCache = !!answers.enableHibernateCache;
        this.jhipsterConfig.databaseType = answers.databaseType;
        this.jhipsterConfig.devDatabaseType = answers.devDatabaseType;
        this.jhipsterConfig.prodDatabaseType = answers.prodDatabaseType;
        this.jhipsterConfig.searchEngine = answers.searchEngine;
        this.jhipsterConfig.buildTool = answers.buildTool;

        if (this.jhipsterConfig.databaseType === 'no') {
            this.jhipsterConfig.devDatabaseType = 'no';
            this.jhipsterConfig.prodDatabaseType = 'no';
            this.jhipsterConfig.enableHibernateCache = false;
        } else if (['mongodb', 'neo4j', 'couchbase', 'cassandra'].includes(this.jhipsterConfig.databaseType)) {
            this.jhipsterConfig.devDatabaseType = this.databaseType;
            this.jhipsterConfig.prodDatabaseType = this.databaseType;
            this.jhipsterConfig.enableHibernateCache = false;
        }

        if (['redis'].includes(this.jhipsterConfig.cacheProvider)) {
            this.jhipsterConfig.enableHibernateCache = false;
        }

        // oauth expects users to be managed in IpP
        if (answers.authenticationType === 'oauth2') {
            this.jhipsterConfig.skipUserManagement = true;
        }
    });
}
