const constants = require('generator-jhipster/generators/generator-constants');

const SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;
const SERVER_MAIN_RES_DIR = constants.SERVER_MAIN_RES_DIR;
const SERVER_TEST_SRC_DIR = constants.SERVER_TEST_SRC_DIR;
// const SERVER_TEST_RES_DIR = constants.SERVER_TEST_RES_DIR;

const expectedFiles = {
    maven: ['pom.xml', 'mvnw', 'mvnw.cmd', '.mvn/wrapper/maven-wrapper.jar', '.mvn/wrapper/maven-wrapper.properties'],

    server: [
        `${SERVER_MAIN_RES_DIR}application.properties`,
        `${SERVER_MAIN_RES_DIR}db/migration/V1_00000000000000__Initial_schema.sql`,
        `${SERVER_MAIN_RES_DIR}META-INF/resources/privateKey.pem`,
        `${SERVER_MAIN_RES_DIR}META-INF/resources/publicKey.pem`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/config/Constants.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/config/JHipsterProperties.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/AbstractAuditingEntity.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Authority.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/User.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/repository/AuthorityRepository.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/repository/UserRepository.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/security/jwt/TokenProvider.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/security/BCryptPasswordHasher.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/security/UsernameNotFoundException.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/security/UserNotActivatedException.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/dto/UserDTO.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/AuthenticationService.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/UserService.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/vm/LoginVM.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/AccountResource.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/UserJWTController.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/util/HeaderUtil.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/util/ResponseUtil.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/util/ResponseUtil.java`,
        `${SERVER_TEST_SRC_DIR}com/mycompany/myapp/web/rest/TestUserJWTControllerIT.java`,
        `${SERVER_TEST_SRC_DIR}com/mycompany/myapp//TestResources.java`
    ]
};

module.exports = expectedFiles;
