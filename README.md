# generator-jhipster-quarkus

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Generator Build Status][github-actions-generator-ci-image]][github-actions-url]

<img src="https://raw.githubusercontent.com/jhipster/jhipster-artwork/main/family/jhipster_family_member_8.png" alt="JHipster Quarkus Family Member" width=200 style="max-width:50%;">

> ## 🛠 Mode: In Development

> JHipster blueprint, JHipster Quarkus blueprint

# Introduction

This is a [JHipster](https://www.jhipster.tech/) blueprint, that is meant to be used in a JHipster application.

# Demo

Because a code worth a 1k words here your have sample JHipster Quarkus repositories

-   The classic [JHipster Sample App](https://github.com/jhipster/jhipster-sample-app-quarkus)

# Prerequisites

As this is a [JHipster](https://www.jhipster.tech/) blueprint, we expect you have JHipster and its related tools already installed:

-   [Installing JHipster](https://www.jhipster.tech/installation/)

# Installation

To install this blueprint:

```bash

npm install -g generator-jhipster-quarkus

```

To update this blueprint:

```bash

npm update -g generator-jhipster-quarkus

```

# Usage

To use this blueprint, run the command below:

```bash

jhipster --blueprints quarkus

```

## Running local Blueprint version for development

During development of blueprint, please note the below steps. They are very important.

1. Link your blueprint globally

Note: If you do not want to link the blueprint(step 3) to each project being created, use NPM instead of Yarn as yeoman doesn't seem to fetch globally linked Yarn modules. On the other hand, this means you have to use NPM in all the below steps as well.

```bash

cd jhipster-quarkus

npm link

```

2. Link the development version of JHipster to your blueprint (optional: required only if you want to use a non-released JHipster version, like the master branch or your own custom fork)

```bash

cd generator-jhipster

npm link



cd quarkus

npm link generator-jhipster

```

1. Create a new folder for the app to be generated and link JHipster and your blueprint there

```bash

mkdir my-app && cd my-app



npm link generator-jhipster-quarkus

npm link generator-jhipster (Optional: Needed only if you are using a non-released JHipster version)



jhipster -d --blueprint quarkus

```

🚦 What we have now

✅ Generate App generation - `jhipster --blueprints quarkus`

✅ Entity generation - `jhipster --blueprints quarkus entity <entity-name>`

✅ JDL import - `jhipster --blueprints quarkus import-jdl sample.jh`

# ❤️ for community

Interested in contributing?
Check out [JHipster contributing guide](https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md) to get started.

# License

Apache-2.0 © [Daniel Petisme](https://github.com/danielpetisme)

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-quarkus.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-quarkus
[daviddm-image]: https://david-dm.org/jhipster/jhipster-quarkus.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jhipster/jhipster-quarkus
[github-actions-generator-ci-image]: https://github.com/jhipster/jhipster-quarkus/workflows/Generator%20CI/badge.svg
[github-actions-url]: https://github.com/jhipster/jhipster-quarkus/actions
