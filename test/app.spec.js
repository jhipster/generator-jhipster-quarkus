const assert = require('yeoman-assert');

const { buildAppGeneratorContext } = require('./utils/generator-testing-api');

describe(' Subgenerator app of quarkus JHipster blueprint', () => {
    describe('Application with custom configuration', () => {
        describe('OAuth2 authentication', () => {
            before(
                buildAppGeneratorContext({
                    authenticationType: 'oauth2',
                })
            );

            it('should README.md references OAuth2/OIDC with Keycloak and Okta', () => {
                assert.fileContent(
                    'README.md',
                    'quarkus.oidc.enabled=true\n' +
                        'quarkus.oidc.auth-server-url=http://localhost:9080/auth/realms/jhipster/\n' +
                        'quarkus.oidc.client-id=web_app\n' +
                        'quarkus.oidc.credentials.secret=web_app\n' +
                        'quarkus.oidc.authentication.scopes=profile,address,email,address,phone,offline_access\n' +
                        'quarkus.oidc.application-type=hybrid\n' +
                        'quarkus.oidc.authentication.cookie-path=/\n' +
                        'quarkus.oidc.authentication.redirect-path=/login/oauth2/code/oidc\n' +
                        'quarkus.oidc.authentication.restore-path-after-redirect=false\n' +
                        '\n' +
                        'jhipster.oidc.logout-url=http://localhost:9080/auth/realms/jhipster/protocol/openid-connect/logout\n'
                );
                assert.fileContent(
                    'README.md',
                    'quarkus.oidc.auth-server-url=https://{yourOktaDomain}/oauth2/default\n' +
                        'quarkus.oidc.client-id={clientId}\n' +
                        'quarkus.oidc.credentials.secret={clientSecret}\n' +
                        '\n' +
                        'jhipster.oidc.logout-url=https://{yourOktaDomain}/oauth2/default/v1/logout\n'
                );
            });
        });
    });
});
