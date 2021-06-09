#!/bin/bash

set -e

trap ctrl_c INT

function ctrl_c() {
    exit 1
}

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$CURRENT_DIR"

JHI_SAMPLES="$CURRENT_DIR/samples"

if [[ "$1" == "" ]]; then
    JHI_WORKSPACE=/tmp/smoke-test
else
    JHI_WORKSPACE="$1"
fi

rm -rf "$JHI_WORKSPACE" && mkdir -p "$JHI_WORKSPACE"

for sample in $(ls -1 "$JHI_SAMPLES"); do
        JHI_APP=${sample%.*}
        echo "*********************** Generating project $JHI_APP"
        JHI_FOLDER_APP="$JHI_WORKSPACE/$JHI_APP"
        $CURRENT_DIR/generate-sample.sh generate "$JHI_FOLDER_APP" "$JHI_APP"

        pushd scripts/
        echo "*********************** Testing project $JHI_APP"
        source $CURRENT_DIR/scripts/03-run-server-tests.sh

        if [ $? -ne 0 ]; then
            exit 1
        fi
        popd
    done
done

