module.exports = {
    askForDataAccess,
};

async function askForDataAccess() {
    const context = this.context;
    // don't prompt if data are imported from a file
    if (context.useConfigurationFile) {
        return;
    }
    const databaseType = context.databaseType || this.jhipsterConfig.databaseType;
    const prompts = [
        {
            when: () => databaseType !== 'no',
            type: 'list',
            name: 'dataAccess',
            message: 'Do you want to use separate repository class for your data access?',
            choices: [
                {
                    value: 'activeRecord',
                    name: 'No, the Entity will be used as an Active Record',
                },
                {
                    value: 'repository',
                    name: 'Yes, generate a separate Repository class',
                },
            ],
            default: 0,
        },
    ];
    const answers = await this.prompt(prompts);
    this.entityConfig.dataAccess = answers.dataAccess;
}
