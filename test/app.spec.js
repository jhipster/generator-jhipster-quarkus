const assert = require('yeoman-assert');

const { buildAppGeneratorContext } = require('./utils/generator-testing-api');

describe(' Subgenerator app of quarkus JHipster blueprint', () => {
    describe('Application with custom configuration', () => {
        describe('OAuth2 authentication', () => {
            before(
                buildAppGeneratorContext({
                    authenticationType: 'oauth2'
                })
            );

            it('should README.md references OAuth2/OIDC with Keycloak and Okta', () => {
                assert.fileContent(
                    'README.md',
                    'quarkus.oidc.enabled=true\n' +
                        'quarkus.oidc.auth-server-url=http://localhost:9080/auth/realms/jhipster/\n' +
                        'quarkus.oidc.client-id=web_app\n' +
                        'quarkus.oidc.credentials.secret=web_app\n' +
                        'quarkus.oidc.authentication.scopes=profile\n' +
                        'quarkus.oidc.application-type=web-app'
                );
                assert.fileContent(
                    'README.md',
                    'quarkus.oidc.auth-server-url=https://{yourOktaDomain}/oauth2/default\n' +
                        'quarkus.oidc.client-id={clientId}\n' +
                        'quarkus.oidc.credentials.secret={clientSecret}'
                );
            });
        });
    });
});
