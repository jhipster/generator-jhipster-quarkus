module.exports = {
    askForDataAccessPattern
};

function askForDataAccessPattern() {
    const context = this.context;
    // don't prompt if data are imported from a file
    if (context.useConfigurationFile) {
        return;
    }
    const databaseType = context.databaseType;
    const done = this.async();
    const prompts = [
        {
            when: () => databaseType !== 'no',
            type: 'list',
            name: 'dataAccessPattern',
            message: 'Which data access pattern to use?',
            choices: [
                {
                    value: 'activeRecord',
                    name: 'Active Record'
                },
                {
                    value: 'repository',
                    name: 'Repository'
                },
            ],
            default: 'activeRecord'
        }
    ];
    this.prompt(prompts).then(props => {
        context.dataAccessPattern = props.dataAccessPattern;
        done();
    });
}
