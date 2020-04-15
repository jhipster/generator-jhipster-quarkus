const constants = require('generator-jhipster/generators/generator-constants');

const SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;
const SERVER_MAIN_RES_DIR = constants.SERVER_MAIN_RES_DIR;
const SERVER_TEST_SRC_DIR = constants.SERVER_TEST_SRC_DIR;
// const SERVER_TEST_RES_DIR = constants.SERVER_TEST_RES_DIR;

const expectedFiles = {
    maven: ['pom.xml', 'mvnw', 'mvnw.cmd', '.mvn/wrapper/maven-wrapper.jar', '.mvn/wrapper/maven-wrapper.properties'],

    server: [
        `${SERVER_MAIN_RES_DIR}application.properties`,
        `${SERVER_MAIN_RES_DIR}config/liquibase/master.xml`,
        `${SERVER_MAIN_RES_DIR}config/liquibase/changelog/00000000000000_initial_schema.xml`,
        `${SERVER_MAIN_RES_DIR}META-INF/resources/privateKey.pem`,
        `${SERVER_MAIN_RES_DIR}META-INF/resources/publicKey.pem`,
        `${SERVER_MAIN_RES_DIR}templates/mail/activationEmail.html`,
        `${SERVER_MAIN_RES_DIR}templates/mail/activationEmail.html`,
        `${SERVER_MAIN_RES_DIR}templates/mail/creationEmail.html`,
        `${SERVER_MAIN_RES_DIR}templates/mail/passwordResetEmail.html`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/config/Constants.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/config/JHipsterProperties.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Authority.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/User.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/security/jwt/TokenProvider.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/security/BCryptPasswordHasher.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/security/UsernameNotFoundException.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/security/UserNotActivatedException.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/dto/UserDTO.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/dto/PasswordChangeDTO.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/AuthenticationService.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/EmailAlreadyUsedException.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/InvalidPasswordException.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/MailService.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/UsernameAlreadyUsedException.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/UserService.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/errors/BadRequestAlertException.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/errors/EmailAlreadyUsedException.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/errors/EmailNotFoundException.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/errors/LoginAlreadyUsedException.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/vm/KeyAndPasswordVM.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/vm/LoginVM.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/vm/ManagedUserVM.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/AccountResource.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/SpaFilter.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/UserJWTController.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/UserResource.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/util/HeaderUtil.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/util/ResponseUtil.java`,
        `${SERVER_TEST_SRC_DIR}com/mycompany/myapp/domain/AuthorityTest.java`,
        `${SERVER_TEST_SRC_DIR}com/mycompany/myapp/domain/UserTest.java`,
        `${SERVER_TEST_SRC_DIR}com/mycompany/myapp/web/rest/AccountResourceTest.java`,
        `${SERVER_TEST_SRC_DIR}com/mycompany/myapp/web/rest/UserJWTControllerTest.java`,
        `${SERVER_TEST_SRC_DIR}com/mycompany/myapp/web/rest/UserResourceTest.java`,
        `${SERVER_TEST_SRC_DIR}com/mycompany/myapp/ArchTest.java`,
        `${SERVER_TEST_SRC_DIR}com/mycompany/myapp/TestResources.java`,
        `${SERVER_TEST_SRC_DIR}com/mycompany/myapp/TestUtil.java`
    ],
    entity: {
        server: [
            '.jhipster/Foo.json',
            `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Foo.java`,
            `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/FooResource.java`,
            `${SERVER_TEST_SRC_DIR}com/mycompany/myapp/domain/FooTest.java`
            // `${SERVER_TEST_SRC_DIR}com/mycompany/myapp/web/rest/FooResourceIT.java`
        ],
        fakeData: [`${SERVER_MAIN_RES_DIR}config/liquibase/fake-data/foo.csv`],
        serverLiquibase: [`${SERVER_MAIN_RES_DIR}config/liquibase/changelog/20191106000100_added_entity_Foo.xml`]
    }
};

module.exports = expectedFiles;
