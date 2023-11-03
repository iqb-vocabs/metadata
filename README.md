[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/%40iqb%2Fmetadata)](https://www.npmjs.com/package/@iqb/metadata)

This module provides definitions and classes for metadata management at [IQB](https://www.iqb.hu-berlin.de).

Please have a look at the type definitions as [Html file](https://iqb-vocabs.github.io/metadata). To learn about the value types produces by different profile entries [look here](https://github.com/iqb-vocabs/metadata/blob/master/docs/value-types.md). 

## For developers

Changes in schema file(s) should always be followed by changes in the corresponding typescript class(es). Any changes in schema files and classes should lead to these steps:

* add/change tests in `test-data`
* run script to validate changes
* commit and push, so that all changes in schema files are online
* change the version number in (1) `package_npm.json` and (2) in `ci/asyncapi.yaml`
* run script to prepare npm publish
* run script to publish to npm
* run script to generate docs
* commit and push
