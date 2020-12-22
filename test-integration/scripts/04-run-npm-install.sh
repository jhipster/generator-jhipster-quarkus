#!/bin/bash

set -e
source $(dirname $0)/00-init-env.sh

#-------------------------------------------------------------------------------
# Launch frontend tests
#-------------------------------------------------------------------------------
cd "$JHI_FOLDER_APP"
    JHI_CLIENT_PACKAGE_MANAGER=npm

if [ -f "tsconfig.json" ]; then
    $JHI_CLIENT_PACKAGE_MANAGER install
fi
