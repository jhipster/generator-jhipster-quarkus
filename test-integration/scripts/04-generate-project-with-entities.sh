#!/bin/bash

set -e
if [[ -a $(dirname $0)/00-init-env.sh ]]; then
    source $(dirname $0)/00-init-env.sh
else
    echo "*** 00-init-env.sh not found, relying on JHI_* en vars"
fi

#-------------------------------------------------------------------------------
# Regenerate project with entities
#-------------------------------------------------------------------------------
cd "$JHI_FOLDER_APP"

runOptions="--blueprints quarkus --skip-checks --force --no-insight --skip-install --with-entities"

jhipster $runOptions
