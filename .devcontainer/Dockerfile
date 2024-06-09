# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.209.6/containers/java/.devcontainer/base.Dockerfile

# [Choice] Java version (use -bullseye variants on local arm64/Apple Silicon): 11, 17, 11-bullseye, 17-bullseye, 11-buster, 17-buster
ARG VARIANT="17-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/java:0-${VARIANT}

# [Choice] Node.js version: none, lts/*, defaults to generator-jhipster-quarkus default node version.
ARG NODE_VERSION="20.12.2"

RUN su -p vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install $NODE_VERSION 2>&1";

