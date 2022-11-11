const { defaultConfig } = require('generator-jhipster/generators/generator-defaults');

const DEFAULT_ENTITY_ANSWERS = {
    fieldAdd: false,
    relationshipAdd: false,
    dataAccess: 'activeRecord',
    dto: 'no',
    service: 'no',
    pagination: 'no',
};

const DEFAULT_SERVER_ANSWERS = {
    baseName: 'sample',
    packageName: 'com.mycompany.myapp',
    applicationType: 'monolith',
    databaseType: 'sql',
    devDatabaseType: 'h2Disk',
    prodDatabaseType: 'mysql',
    cacheProvider: 'caffeine',
    authenticationType: 'jwt',
    enableTranslation: true,
    nativeLanguage: 'en',
    languages: ['fr', 'de'],
    buildTool: 'maven',
    enableHibernateCache: true,
    rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5',
};

const DEFAULT_CLIENT_ANSWERS = {
    baseName: 'jhipster',
    clientFramework: 'angularX',
    enableTranslation: true,
    nativeLanguage: 'en',
    languages: ['fr'],
};

const DEFAULT_QUARKUS_BP_OPTIONS = {
    fromCli: true,
    skipInstall: true,
    blueprint: 'quarkus',
    skipChecks: true,
    creationTimestamp: '2019-11-06',
};

const DEFAULT_QUARKUS_ENTITY_BP_OPTIONS = {
    ...DEFAULT_QUARKUS_BP_OPTIONS,
    defaultLocalConfig: {
        ...defaultConfig,
    },
};

const DEFAULT_YORC_FILENAME = 'ngx-blueprint';

module.exports = {
    DEFAULT_ENTITY_ANSWERS,
    DEFAULT_SERVER_ANSWERS,
    DEFAULT_CLIENT_ANSWERS,
    DEFAULT_QUARKUS_BP_OPTIONS,
    DEFAULT_QUARKUS_ENTITY_BP_OPTIONS,
    DEFAULT_YORC_FILENAME,
};
