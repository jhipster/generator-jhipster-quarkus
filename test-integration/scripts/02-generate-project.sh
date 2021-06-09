#!/bin/bash

set -e
if [[ -a $(dirname $0)/00-init-env.sh ]]; then
    source $(dirname $0)/00-init-env.sh
else
    echo "*** 00-init-env.sh not found, relying on JHI_* en vars"
fi

#-------------------------------------------------------------------------------
# Generate project with jhipster
#-------------------------------------------------------------------------------
rm -rf "$JHI_FOLDER_APP"
mkdir -p "$JHI_FOLDER_APP"
cp -f "$JHI_SAMPLES"/"$JHI_APP".jh "$JHI_FOLDER_APP"/project.jh
cd "$JHI_FOLDER_APP"
ls -al .


runOptions="--blueprints quarkus --skip-checks --force --no-insight --skip-install"

echo "*** Executing import-jdl project.jh $runOptions"
jhipster import-jdl project.jh $runOptions
