#!/bin/bash

set -e

#-------------------------------------------------------------------------------
# Install JHipster Generator
#-------------------------------------------------------------------------------
echo "*** generator-jhipster: use last version"
npm install -g generator-jhipster

#-------------------------------------------------------------------------------
# Install yeoman
#-------------------------------------------------------------------------------
echo "*** yeoman: use last version"
npm install -g yo


#-------------------------------------------------------------------------------
# Install JHipster Quarkus
#-------------------------------------------------------------------------------
echo "*** generator-jhipster-quarkus: use current branch version"
npm ci
npm link

