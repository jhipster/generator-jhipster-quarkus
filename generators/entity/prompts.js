module.exports = {
    askForRepository
};

function askForRepository() {
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
            name: 'repository',
            message: 'Do you want to use separate repository class for your data access layer?',
            choices: [
                {
                    value: 'no',
                    name: 'No, the Entity will be used as an Active Record'
                },
                {
                    value: 'yes',
                    name: 'Yes, generate a separate repository class'
                }
            ],
            default: 0
        }
    ];
    this.prompt(prompts).then(props => {
        context.repository = props.repository;
        done();
    });
}
