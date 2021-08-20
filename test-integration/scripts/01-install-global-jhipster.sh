#!/bin/bash

set -e
if [[ -a $(dirname $0)/00-init-env.sh ]]; then
    source $(dirname $0)/00-init-env.sh
else
    echo "*** 00-init-env.sh not found, relying on JHI_* en vars"
fi

#-------------------------------------------------------------------------------
# Install JHipster Generator
#-------------------------------------------------------------------------------
echo "*** generator-jhipster: use the $JHI_VERSION version"
npm install -g generator-jhipster@"$JHI_VERSION"

#-------------------------------------------------------------------------------
# Install JHipster Quarkus
#-------------------------------------------------------------------------------
echo "*** generator-jhipster-quarkus: use current branch version"
npm ci
npm link

