#!/bin/bash

if [[ $GITHUB_WORKSPACE == "" ]]; then
    JHI_REPO=`pwd`
else
    JHI_REPO=$GITHUB_WORKSPACE
fi

if [[ $GITHUB_WORKSPACE == "" ]]; then
    JHI_HOME=`pwd`
else
    JHI_HOME=$GITHUB_WORKSPACE
fi

# folder for test-integration
if [[ "$JHI_INTEG" == "" ]]; then
    JHI_INTEG="$JHI_HOME"/test-integration
fi

# folder for samples
if [[ "$JHI_SAMPLES" == "" ]]; then
    JHI_SAMPLES="$JHI_INTEG"/samples
fi

# folder for scripts
if [[ "$JHI_SCRIPTS" == "" ]]; then
    JHI_SCRIPTS="$JHI_INTEG"/scripts
fi

# folder for app
if [[ "$JHI_FOLDER_APP" == "" ]]; then
    JHI_FOLDER_APP="$HOME"/app
fi
