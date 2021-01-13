const assert = require('assert');
const ejslint = require('ejs-lint');
const fs = require('fs');
const glob = require('glob');

describe('EJS Lint', () => {
    const opts = {
        delimiter: '%',
    };
    it('EJS templates are valid', () => {
        const files = glob.sync('generators/**/*.ejs');
        files.forEach(file => {
            if (fs.statSync(file).isFile()) {
                const content = fs.readFileSync(file, 'utf8');
                const err = ejslint(content, opts);
                const errorMessage = err !== undefined ? `${err.message} at (${err.line}:${err.column}) in ${file}` : '';

                assert.strictEqual(err, undefined, errorMessage);
            }
        });
    });
});
