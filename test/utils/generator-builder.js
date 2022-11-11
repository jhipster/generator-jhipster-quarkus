const helpers = require('yeoman-test');
const fse = require('fs-extra');
const path = require('path');

const packagePath = path.join(__dirname, '../..');

module.exports = class {
    constructor(generatorName) {
        this.runContext = helpers.run(`generator-jhipster/generators/${generatorName}`).withEnvironment(env => {
            env.lookup({ packagePaths: [packagePath] });
        });
    }

    withPrompts(answers) {
        this.runContext.withPrompts(answers);
        return this;
    }

    withYoRc(fileName) {
        this.runContext.doInDir(dir => {
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
};
