const helpers = require('yeoman-test');
const fse = require('fs-extra');
const path = require('path');

module.exports = class {
    constructor(generatorName) {
        this.runContext = helpers.run(`generator-jhipster/generators/${generatorName}`).withGenerators([
            [
                // eslint-disable-next-line import/no-dynamic-require
                require(`../../generators/${generatorName}/index.js`), // eslint-disable-line global-require
                `jhipster-quarkus:${generatorName}`,
                path.join(__dirname, `../../generators/${generatorName}/index.js`)
            ]
        ]);
    }

    withPrompts(answers) {
        this.runContext.withPrompts(answers);
        return this;
    }

    withYoRc(fileName) {
        this.runContext.inTmpDir(dir => {
            fse.copySync(path.join(__dirname, `../templates/${fileName}`), dir);
        });
        return this;
    }

    withOptions(options) {
        this.runContext.withOptions(options);
        return this;
    }

    withArguments(args) {
        this.runContext.withArguments(args);
        return this;
    }

    build(callBack) {
        return this.runContext.on('end', callBack);
    }
};
