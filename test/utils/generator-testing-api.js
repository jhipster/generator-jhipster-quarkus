const GeneratorTestBuilder = require('./generator-builder');
const { DEFAULT_ENTITY_ANSWERS, DEFAULT_QUARKUS_ENTITY_BP_OPTIONS, DEFAULT_YORC_FILENAME } = require('./constants');

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

module.exports = {
    buildEntityGeneratorContext
};
