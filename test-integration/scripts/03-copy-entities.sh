#!/bin/bash

set -e
if [[ -a $(dirname $0)/00-init-env.sh ]]; then
    source $(dirname $0)/00-init-env.sh
else
    echo "*** 00-init-env.sh not found, relying on JHI_* en vars"
fi

rm -rf "$JHI_FOLDER_APP"/.jhipster
mkdir -p "$JHI_FOLDER_APP"/.jhipster

echo "===="
echo "$JHI_SAMPLES"
echo "===="
ls .
ls "$JHI_SAMPLES"/.jhipster/"$JHI_ENTITY"/*.json

cp -f "$JHI_SAMPLES"/.jhipster/"$JHI_ENTITY"/*.json "$JHI_FOLDER_APP"/.jhipster/

#-------------------------------------------------------------------------------
# Check the entities copied
#-------------------------------------------------------------------------------
ls -al "$JHI_FOLDER_APP"/.jhipster
