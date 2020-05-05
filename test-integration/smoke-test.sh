
#!/bin/bash

set -e

trap ctrl_c INT

function ctrl_c() {
    exit 1
}

mydir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$mydir"

JHI_SAMPLES="$mydir/samples"
JHI_ENTITIES="$mydir/entities"

if [[ "$1" == "" ]]; then
    JHI_WORKSPACE=/tmp/smoke-test
else
    JHI_WORKSPACE="$1"
fi

rm -rf "$JHI_WORKSPACE" && mkdir -p "$JHI_WORKSPACE"

for sample in $(ls -1 "$JHI_SAMPLES"); do
    for entity in $(ls -1 "$JHI_ENTITIES"); do
        PROJECT="$sample"_"$entity"
        echo "*********************** Generating project $PROJECT"
        JHI_FOLDER_APP="$JHI_WORKSPACE/$PROJECT"
        JHI_APP=$sample
        JHI_ENTITY=$entity
        $mydir/generate-sample.sh generate "$JHI_FOLDER_APP" "$JHI_APP" "$JHI_ENTITY"

        pushd scripts/
        echo "*********************** Testing project $sample_$entity"
        source ./05-run-server-test.sh

        if [ $? -ne 0 ]; then
            exit 1
        fi
        popd
    done
done

