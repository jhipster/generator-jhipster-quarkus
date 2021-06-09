#!/bin/bash

set -e

trap ctrl_c INT

function ctrl_c() {
    exit 1
}

function usage() {
    me=$(basename "$0")
    echo
    echo "Usage: $me generate <destination> <sample_name> | list-sample"
    echo
    echo "Examples:"
    echo "$me generate list-sample"
    echo "$me generate /tmp/sample-app/ sample-app"
    echo
    exit 2
}

function generateProject() {
    cd "$CURRENT_DIR"

    echo "JHI_FOLDER_APP=$JHI_FOLDER_APP"
    echo "JHI_APP=$JHI_APP"

    if [ ! -d "$JHI_FOLDER_APP" ]; then
        echo "*** Create $JHI_FOLDER_APP"
        mkdir -p "$JHI_FOLDER_APP"
    fi
    if [ ! -z "$(ls -A $JHI_FOLDER_APP)" ]; then
        echo "*** The folder is not empty: $JHI_FOLDER_APP"
        exit 1
    else
        mkdir -p "$JHI_FOLDER_APP"
        echo "*** Empty folder, let's generate JHipster project in: $JHI_FOLDER_APP"
    fi

    pushd scripts/
    echo "*********************** Generating project  $JHI_APP"
    source $CURRENT_DIR/scripts/02-generate-project.sh
    popd
}

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
JHI_SAMPLES="$CURRENT_DIR/samples"

if [ "$1" = "list-sample" ]; then
    for jdl_file in $(ls -1 "$JHI_SAMPLES"); do
        echo ${jdl_file%.*}
    done
elif [ "$1" = "generate" ]; then
    if [ "$3" != "" ]; then
        JHI_FOLDER_APP=$2
        JHI_APP=$3
        generateProject
    else
        usage
    fi

else
    usage
fi
