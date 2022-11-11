module.exports = {
    askForTestOpts,
};

async function askForTestOpts() {
    if (this.existingProject) return;

    const choices = [];
    const defaultChoice = [];

    if (!this.skipServer) {
        choices.push({ name: 'Cypress', value: 'cypress' });
    }

    const PROMPT = {
        type: 'checkbox',
        name: 'testFrameworks',
        message: 'Besides Junit, which testing frameworks would you like to use?',
        choices,
        default: defaultChoice,
    };

    const answers = choices.length ? await this.prompt(PROMPT) : { testFrameworks: [] };

    this.testFrameworks = this.jhipsterConfig.testFrameworks = answers.testFrameworks;
}
