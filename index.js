const { resolve } = require('path')
const extend = require('extend')
const rc = require('rc')
const os = require('os')

const kRuntimeConfigurationName = 'ara'

const kRuntimeConfigurationDefaults = {
  network: { 
    identity: { 
      root: resolve(os.homedir(), '.ara', 'identities'),
      keyring: resolve(os.homedir(), '.ara', 'keyrings', 'keyring')
    } 
  },
  data: { root: resolve(os.homedir(), '.ara') },
}

const state = {}

module.exports = ARARuntimeConfiguration

/**
 * Return runtime configuration found in the nearest
 * `.ararc' file.
 * @public
 * @param {?(Object)} [conf]
 * @param {?(String)} name
 * @return {Object}
 * @see
 */
function ARARuntimeConfiguration(conf, name) {
  if (undefined !== conf && null !== conf && 'object' !== typeof conf) {
    throw new TypeError('Expecting configuration to be an object.')
  } else if (name && 'string' !== typeof name) {
    throw new TypeError('Expecting name to be a string.')
  } else {
    const defaults = kRuntimeConfigurationDefaults
    // use an empty argv because the 'rc' module uses
    // 'process.argv' if we don't give it one
    const argv = {}
    // eslint-disable-next-line no-param-reassign
    name = name || kRuntimeConfigurationName
    // eslint-disable-next-line no-param-reassign
    console.log("DEFAULTS:", defaults, conf, argv)
    conf = rc(name, extend(true, {}, defaults, conf), argv)
    extend(true, state, conf)
    return state
  }
}
