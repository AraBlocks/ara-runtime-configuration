<img src="https://github.com/arablocks/ara-module-template/blob/master/ara.png" width="30" height="30" /> ara-runtime-configuration
=========================

[![Build Status](https://travis-ci.com/AraBlocks/ara-runtime-configuration.svg?token=6WjTyCg41y8MBmCzro5x&branch=master)](https://travis-ci.com/AraBlocks/ara-runtime-configuration)

Ara Runtime Configuration (Reads from the nearest `.ararc` file.)

## Status

**Stable**

## Installation

```sh
$ npm install ara-runtime-configuration
```

## Usage

To load _Runtime Configuration_ for any Ara related modules, simply
require this module and call the default exported function. You can pass
an object specifying default values that may not be present in an `.ararc`

```js
const rc = require('ara-runtime-configuration')
const conf = rc({
  network: { node: { dns: { multicast: false } } }
})
```

## API

### `const conf = rc([defaults])`

Load runtime configuration defined in the nearest `.ararc` file on disk
optionally specifying defaults.

* `defaults` - Optional configuration defaults.

## Command Line

### `araconf(1)`

`araconf` is a tool for quickly reading values in the closest
configuration file. It uses
[json-select](https://github.com/dominictarr/json-select) to support
[JSONPath](http://goessner.net/articles/JsonPath/) queries.


#### Usage

`araconf` can be used directly from command line. It accepts a single
optional [JSONPath]() query and emits valid JSON to stdout.

```
usage: araconf [-hV] [options] [query]

Options:
  -D, --debug    Enable debug output      [boolean]
  -h, --help     Show help                [boolean]
  -V, --version  Show version number      [boolean]
```

#### Examples

Running without a query:

```sh
$ araconf
{
  "network": {
    "identity": {}
  },
  "data": {
    "root": "/home/werle/.ara"
  },
  "web3": {
    "provider": "http://127.0.0.1:8545"
  }
}

```

Targeting the `.data` object of the conf:

```sh
$ araconf .data
{
  "root": "/home/werle/.ara"
}
```

Targeting the `.web3.provider` property:

```sh
$ araconf .web3.provider
"http://127.0.0.1:8545"
```

Enable debug output with `--debug`:

```sh
$ araconf .data.root --debug
  ara-runtime-configuration config: /home/werle/.ararc +0ms
  ara-runtime-configuration configs: [ '/home/werle/.ararc' ] +2ms
"/home/werle/.ara"
```

## Contributing

- [Commit message format](/.github/COMMIT_FORMAT.md)
- [Commit message examples](/.github/COMMIT_FORMAT_EXAMPLES.md)
- [How to contribute](/.github/CONTRIBUTING.md)

Releases follow [Semantic Versioning](https://semver.org/)

## See Also

* [rc](https://github.com/dominictarr/rc)
* [JSONPath](http://goessner.net/articles/JsonPath/)
* [JSONStream](https://www.npmjs.com/package/JSONStream)
* [json-select](https://github.com/dominictarr/json-select)

## License

LGPL-3.0
