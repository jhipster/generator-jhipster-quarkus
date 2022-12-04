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
    ./mvnw verify -Pprod,native -DskipTests
elif [ -f "gradlew" ]; then
    ./gradlew build -Dquarkus.package.type=native -x webapp -PskipTests
fi
