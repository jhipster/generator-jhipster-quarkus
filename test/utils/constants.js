const DEFAULT_ENTITY_ANSWERS = {
    fieldAdd: false,
    relationshipAdd: false,
    dataAccess: 'activeRecord',
    dto: 'no',
    service: 'no',
    pagination: 'no'
};

const DEFAULT_QUARKUS_BP_OPTIONS = {
    'from-cli': true,
    skipInstall: true,
    blueprint: 'quarkus',
    skipChecks: true
};

const DEFAULT_QUARKUS_ENTITY_BP_OPTIONS = {
    ...DEFAULT_QUARKUS_BP_OPTIONS,
    creationTimestamp: '2019-11-06'
};

const DEFAULT_YORC_FILENAME = 'ngx-blueprint';

module.exports = {
    DEFAULT_ENTITY_ANSWERS,
    DEFAULT_QUARKUS_BP_OPTIONS,
    DEFAULT_QUARKUS_ENTITY_BP_OPTIONS,
    DEFAULT_YORC_FILENAME
};
