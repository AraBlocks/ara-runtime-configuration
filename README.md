ara-runtime-configuration
=========================

ARA Runtime Configuration (Reads from the nearest `.ararc` file.)

## Installation

```sh
$ npm install ara-runtime-configuration
```

## Usage

To load _Runtime Configuration_ for any ARA related modules, simply
require this module and call the default exported function. You can pass
an object specifying default values that may not be present in a `.ararc`

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

## See Also

* [rc](https://github.com/dominictarr/rc)

## License

LGPL-3.0
