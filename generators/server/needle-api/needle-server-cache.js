const chalk = require('chalk');
const needleServerCache = require('generator-jhipster/generators/server/needle-api/needle-server-cache');
const constants = require('generator-jhipster/generators/generator-constants');
const { CACHE_MAXIMUM_SIZE, CACHE_EXPIRE_AFTER_WRITE } = require('../../generator-quarkus-constants');

const { SERVER_MAIN_RES_DIR } = constants;

module.exports = class extends needleServerCache {
    addEntityConfigurationToPropertiesFile(entityClass, relationships, packageName) {
        const errorMessage = chalk.yellow(`\nUnable to add ${entityClass} to application.properties file.`);
        const cacheName = `${packageName}.domain.${entityClass}`;
        const applicationPropertiesFileName = `${SERVER_MAIN_RES_DIR}application.properties`;
        const needle = 'jhipster-quarkus-needle-hibernate-cache-add-entry';
        const rewriteFileModel = this.generateFileModel(
            applicationPropertiesFileName,
            needle,
            `quarkus.hibernate-orm.cache."${cacheName}".expiration.max-idle=${CACHE_EXPIRE_AFTER_WRITE}\n` +
                `quarkus.hibernate-orm.cache."${cacheName}".memory.object-count=${CACHE_MAXIMUM_SIZE}`
        );

        this.addBlockContentToFile(rewriteFileModel, errorMessage);

        relationships.forEach(relationship => {
            const relationshipType = relationship.relationshipType;
            if (relationshipType === 'one-to-many' || relationshipType === 'many-to-many') {
                const rewriteFileModelWithRelationships = this.generateFileModel(
                    applicationPropertiesFileName,
                    needle,
                    `quarkus.hibernate-orm.cache."${cacheName}.${relationship.relationshipFieldNamePlural}".expiration.max-idle=${CACHE_EXPIRE_AFTER_WRITE}\n` +
                        `quarkus.hibernate-orm.cache."${cacheName}.${relationship.relationshipFieldNamePlural}".memory.object-count=${CACHE_MAXIMUM_SIZE}`
                );
                this.addBlockContentToFile(rewriteFileModelWithRelationships, errorMessage);
            }
        });
    }
};
