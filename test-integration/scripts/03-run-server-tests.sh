#!/bin/bash

set -e
if [[ -a $(dirname $0)/00-init-env.sh ]]; then
    source $(dirname $0)/00-init-env.sh
else
    echo "*** 00-init-env.sh not found, relying on JHI_* en vars"
fi

#-------------------------------------------------------------------------------
# Run server test
#-------------------------------------------------------------------------------
cd "$JHI_FOLDER_APP"
if [ -f "mvnw" ]; then
    ./mvnw -ntp -P-webapp verify --batch-mode
        # -Dlogging.level.ROOT=OFF \
        # -Dlogging.level.org.zalando=OFF \
        # -Dlogging.level.io.github.jhipster=OFF \
        # -Dlogging.level.io.github.jhipster.sample=OFF \
        # -Dlogging.level.org.springframework=OFF \
        # -Dlogging.level.org.springframework.web=OFF \
        # -Dlogging.level.org.springframework.security=OFF
elif [ -f "gradlew" ]; then
    ./gradlew test integrationTest -x webapp
        # -Dlogging.level.ROOT=OFF \
        # -Dlogging.level.org.zalando=OFF \
        # -Dlogging.level.io.github.jhipster=OFF \
        # -Dlogging.level.io.github.jhipster.sample=OFF \
        # -Dlogging.level.org.springframework=OFF \
        # -Dlogging.level.org.springframework.web=OFF \
        # -Dlogging.level.org.springframework.security=OFF
fi
