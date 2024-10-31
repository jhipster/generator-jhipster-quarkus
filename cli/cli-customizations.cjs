// This file will not be overwritten by generate-blueprint
module.exports = {
    printLogo: async () => {
        const { getLogo } = await import('./logo.mjs');
        console.log(getLogo());
    },
};
