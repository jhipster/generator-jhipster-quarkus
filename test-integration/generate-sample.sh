
#!/bin/bash

set -e

trap ctrl_c INT

function ctrl_c() {
    exit 1
}

function usage() {
    me=$(basename "$0")
    echo
    echo "Usage: $me generate <destination> <sample_name> <sample_entity_model> | list-sample | list-sample-entity"
    echo
    echo "Examples:"
    echo "$me generate /tmp/sample-app/ sample-app sql-sample-app"
    echo
    exit 2
}

function generateProject() {
    cd "$mydir"

    echo "JHI_FOLDER_APP=$JHI_FOLDER_APP"
    echo "JHI_APP=$JHI_APP"
    echo "JHI_ENTITY=$JHI_ENTITY"

    if [ ! -d "$JHI_FOLDER_APP" ]; then
        echo "*** Create $JHI_FOLDER_APP"
        mkdir -p "$JHI_FOLDER_APP"
    fi
    if [ ! -z "$(ls -A $JHI_FOLDER_APP)" ]; then
        echo "*** The folder is not empty: $JHI_FOLDER_APP"
        exit 1
    else
        mkdir -p "$JHI_FOLDER_APP"/.jhipster/
        echo "*** Empty folder, let's generate JHipster project in: $JHI_FOLDER_APP"
    fi

    pushd scripts/
    echo "*********************** Copying entities for $JHI_APP in $JHI_FOLDER_APP/.jhipster"
    source ./03-copy-entities.sh
    popd

    echo "*********************** Copy configuration in $JHI_FOLDER_APP"
    cp -f "$JHI_SAMPLES"/"$JHI_APP"/.yo-rc.json "$JHI_FOLDER_APP"/
    ls -al "$JHI_FOLDER_APP"/

    pushd scripts/
    echo "*********************** Generating project"
    source ./04-generate-project-with-entities.sh
    popd
}

mydir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
JHI_SAMPLES="$mydir/samples"

if [ "$1" = "list-sample" ]; then
    for dir in $(ls -1 "$JHI_SAMPLES"); do
        if [ -f "$JHI_SAMPLES/$dir/.yo-rc.json" ] && [[ $dir != *-sample ]]; then
            echo "$dir"
        fi
    done
elif [ "$1" = "list-sample-entity" ]; then
    for dir in $(ls -1 "$JHI_SAMPLES/.jhipster"); do
        if [ -f "$JHI_SAMPLES/.jhipster/$dir/*.json" ]; then
            echo "$dir"
        fi
    done

elif [ "$1" = "generate" ]; then
    if [ "$3" != "" ]; then
        JHI_FOLDER_APP=$2
        JHI_APP=$3
        JHI_ENTITY=$4
        generateProject
    else
        usage
    fi

else
    usage
fi
