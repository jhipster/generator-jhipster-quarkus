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
                    name: 'Active Record. The entity encapsulates the DB access.'
                },
                {
                    value: 'repository',
                    name: 'Repository. The DB access is delegated to a dedicated application layer. '
                }
            ],
            default: 'activeRecord'
        }
    ];
    this.prompt(prompts).then(props => {
        context.dataAccessPattern = props.dataAccessPattern;
        done();
    });
}
