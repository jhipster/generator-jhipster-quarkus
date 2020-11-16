const GeneratorTestBuilder = require('./generator-builder');
const {
    DEFAULT_ENTITY_ANSWERS,
    DEFAULT_SERVER_ANSWERS,
    DEFAULT_CLIENT_ANSWERS,
    DEFAULT_QUARKUS_ENTITY_BP_OPTIONS,
    DEFAULT_QUARKUS_BP_OPTIONS,
    DEFAULT_YORC_FILENAME
} = require('./constants');

function buildEntityGeneratorContext(
    answers = DEFAULT_ENTITY_ANSWERS,
    options = DEFAULT_QUARKUS_ENTITY_BP_OPTIONS,
    yoRcFileName = DEFAULT_YORC_FILENAME
) {
    return done => {
        new GeneratorTestBuilder('entity')
            .withPrompts({ ...DEFAULT_ENTITY_ANSWERS, ...answers })
            .withYoRc(yoRcFileName)
            .withOptions({ ...DEFAULT_QUARKUS_ENTITY_BP_OPTIONS, ...options })
            .withArguments(['foo'])
            .build(done);
    };
}

function buildServerGeneratorContext(answers = DEFAULT_SERVER_ANSWERS, options = DEFAULT_QUARKUS_BP_OPTIONS) {
    return done => {
        new GeneratorTestBuilder('server')
            .withPrompts({ ...DEFAULT_SERVER_ANSWERS, ...answers })
            .withOptions({ ...DEFAULT_QUARKUS_ENTITY_BP_OPTIONS, ...options })
            .build(done);
    };
}

function buildClientGeneratorContext(answers = DEFAULT_CLIENT_ANSWERS, options = DEFAULT_QUARKUS_BP_OPTIONS) {
    return done => {
        new GeneratorTestBuilder('client')
            .withPrompts({ ...DEFAULT_CLIENT_ANSWERS, ...answers })
            .withOptions({ ...DEFAULT_QUARKUS_ENTITY_BP_OPTIONS, ...options })
            .build(done);
    };
}

module.exports = {
    buildEntityGeneratorContext,
    buildServerGeneratorContext,
    buildClientGeneratorContext
};
