const { resolve } = require('path')
const extend = require('extend')
const rc = require('rc')
const os = require('os')

const RUNTIME_CONFIGURATION_NAME = 'ara'
const ARA_DIR = resolve(os.homedir(), '.ara')

/**
 * Top level keys are as follows-
 * network
 * data
 * web3
 */

const RUNTIME_CONFIGURATION_DEFAULTS = {
  network: { },
  data: { root: ARA_DIR },
  web3: { }
}

const NETWORK_CONFIGURATION_EXTENSION = base => ({
  network: {
    identity: {
      root: resolve(base.data.root, 'identities')
    }
  }
})

module.exports = AraRuntimeConfiguration

/**
 * Return runtime configuration found in the nearest
 * `.ararc' file.
 * @public
 * @param {?(Object)} [conf]
 * @param {?(String)} name
 * @return {Object}
 * @see
 */
function AraRuntimeConfiguration(conf, name) {
  if (undefined !== conf && null !== conf && 'object' !== typeof conf && 'function' !== typeof conf) {
    throw new TypeError('Expecting configuration to be an object or function.')
  } else if (name && 'string' !== typeof name) {
    throw new TypeError('Expecting name to be a string.')
  } else {
    // use an empty argv because the 'rc' module uses
    // 'process.argv' if we don't give it one
    const argv = {}
    // eslint-disable-next-line no-param-reassign
    name = name || RUNTIME_CONFIGURATION_NAME

    const baseConf = extend(true, {}, rc(name, RUNTIME_CONFIGURATION_DEFAULTS, argv))
    extend(true, baseConf, NETWORK_CONFIGURATION_EXTENSION(baseConf))
    extend(true, baseConf, ('function' === typeof conf) ? conf(baseConf) : conf)

    return baseConf
  }
}
