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
cp -f "$JHI_SAMPLES"/"$JHI_APP"/.yo-rc.json "$JHI_FOLDER_APP"/
cd "$JHI_FOLDER_APP"

runOptions="--blueprints quarkus --skip-checks --force --no-insight --skip-install"

jhipster $runOptions

#-------------------------------------------------------------------------------
# Check folder where the app is generated
#-------------------------------------------------------------------------------
ls -al "$JHI_FOLDER_APP"
git --no-pager log -n 10 --graph --pretty='%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
