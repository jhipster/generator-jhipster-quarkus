# JHipster Quarkus Blueprint

[![NPM version][npm-image]][npm-url] [![Generator CI][github-actions-generator-ci-image]][github-actions-generator-ci-url] [![Imperative Smoke Tests][github-actions-smoke-tests-image]][github-actions-smoke-tests-url]

<img src="https://raw.githubusercontent.com/jhipster/jhipster-artwork/main/family/jhipster_family_member_8.png" alt="JHipster Quarkus Family Member" width=200 style="max-width:50%;">

# Introduction

This is a [JHipster](https://www.jhipster.tech/) blueprint, that is meant to be used in a JHipster application.

# Demo

Because a code worth a 1k words here your have sample JHipster Quarkus repositories

- The classic [JHipster Sample App](https://github.com/jhipster/jhipster-sample-app-quarkus)

# Prerequisites

As this is a [JHipster](https://www.jhipster.tech/) blueprint, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://www.jhipster.tech/installation/)

# Installation

To install or update this blueprint:

```bash
npm install -g generator-jhipster-quarkus
```

# Usage

To use this blueprint, run the command below:

```bash
jhipster-quarkus
```

Or, you can use:

```bash
jhipster --blueprints quarkus
```

You can look for updated quarkus blueprint specific options by running

```bash
jhipster app --blueprints quarkus --help
```

And looking for `(blueprint option: quarkus)` like

## Pre-release

To use an unreleased version, install it using git.

```bash
npm install -g jhipster/generator-jhipster-quarkus#main
jhipster --blueprints quarkus --skip-jhipster-dependencies
```

## 🚦 Blueprint features:

✅ Generate App generation: `jhipster-quarkus`

✅ Entity generation: `jhipster-quarkus entity <entity-name>`

✅ JDL import: `jhipster-quarkus jdl sample.jh`

# ❤️ for community

Interested in contributing?
Check out [JHipster contributing guide](https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md) to get started.

## Running local Blueprint version for development

During development of blueprint, please note the below steps. They are very important.

1. Link your blueprint globally

    ```
    cd generator-jhipster-quarkus
    npm link
    ```

2. Link the development version of JHipster to your blueprint (optional: required only if you want to use a non-released JHipster version, like the master branch or your own custom fork)

    ```
    cd generator-jhipster
    npm link

    cd quarkus
    npm link generator-jhipster
    ```

3. Create a new folder for the app to be generated and link JHipster and your blueprint there

    ```
    mkdir my-app && cd my-app

    npm link generator-jhipster-quarkus
    npm link generator-jhipster (Optional: Needed only if you are using a non-released JHipster version)

    npx jhipster-quarkus
    ```

# License

Apache 2.0, see [LICENSE](LICENSE).

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-quarkus.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-quarkus
[github-actions-generator-ci-image]: https://github.com/jhipster/generator-jhipster-quarkus/actions/workflows/generator.yml/badge.svg
[github-actions-generator-ci-url]: https://github.com/jhipster/generator-jhipster-quarkus/actions/workflows/generator.yml
[github-actions-smoke-tests-image]: https://github.com/jhipster/generator-jhipster-quarkus/actions/workflows/smoke-test-imperative.yml/badge.svg
[github-actions-smoke-tests-url]: https://github.com/jhipster/generator-jhipster-quarkus/actions/workflows/smoke-test-imperative.yml
