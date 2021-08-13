const GeneratorTestBuilder = require('./generator-builder');
const {
    DEFAULT_ENTITY_ANSWERS,
    DEFAULT_SERVER_ANSWERS,
    DEFAULT_CLIENT_ANSWERS,
    DEFAULT_QUARKUS_ENTITY_BP_OPTIONS,
    DEFAULT_QUARKUS_BP_OPTIONS,
    DEFAULT_YORC_FILENAME,
} = require('./constants');

function buildEntityGeneratorContext(
    answers = DEFAULT_ENTITY_ANSWERS,
    options = DEFAULT_QUARKUS_ENTITY_BP_OPTIONS,
    yoRcFileName = DEFAULT_YORC_FILENAME
) {
    return () =>
        new GeneratorTestBuilder('entity')
            .withPrompts({ ...DEFAULT_ENTITY_ANSWERS, ...answers })
            .withYoRc(yoRcFileName)
            .withOptions({ ...DEFAULT_QUARKUS_ENTITY_BP_OPTIONS, ...options })
            .withArguments(['foo']).runContext;
}

function buildServerGeneratorContext(answers = DEFAULT_SERVER_ANSWERS, options = DEFAULT_QUARKUS_BP_OPTIONS) {
    return () =>
        new GeneratorTestBuilder('server')
            .withPrompts({ ...DEFAULT_SERVER_ANSWERS, ...answers })
            .withOptions({ ...DEFAULT_QUARKUS_ENTITY_BP_OPTIONS, ...options }).runContext;
}

function buildClientGeneratorContext(answers = DEFAULT_CLIENT_ANSWERS, options = DEFAULT_QUARKUS_BP_OPTIONS) {
    return () =>
        new GeneratorTestBuilder('client')
            .withPrompts({ ...DEFAULT_CLIENT_ANSWERS, ...answers })
            .withOptions({ ...DEFAULT_QUARKUS_ENTITY_BP_OPTIONS, ...options }).runContext;
}

function buildCommonGeneratorContext(options = DEFAULT_QUARKUS_BP_OPTIONS) {
    return () => new GeneratorTestBuilder('common').withOptions({ ...DEFAULT_QUARKUS_ENTITY_BP_OPTIONS, ...options }).runContext;
}
function buildAppGeneratorContext(answers = DEFAULT_SERVER_ANSWERS, options = DEFAULT_QUARKUS_BP_OPTIONS) {
    return () =>
        new GeneratorTestBuilder('app')
            .withPrompts({ ...DEFAULT_SERVER_ANSWERS, ...answers })
            .withOptions({ ...DEFAULT_QUARKUS_ENTITY_BP_OPTIONS, ...options }).runContext;
}

module.exports = {
    buildEntityGeneratorContext,
    buildServerGeneratorContext,
    buildClientGeneratorContext,
    buildCommonGeneratorContext,
    buildAppGeneratorContext,
};
