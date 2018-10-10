const { resolve } = require('path')
const extend = require('extend')
const debug = require('debug')('ara:runtime:configuration')
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
  network: {
    identity: {
      root: resolve(ARA_DIR, 'identities'),
      get keyring() {
        debug('Deprecated: network.identity.keyring will be set differently.')
        return resolve(ARA_DIR, 'keyrings', 'keyring')
      }
    }
  },
  data: { root: ARA_DIR },
  web3: { }
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
    const defaults = RUNTIME_CONFIGURATION_DEFAULTS
    // use an empty argv because the 'rc' module uses
    // 'process.argv' if we don't give it one
    const argv = {}
    // eslint-disable-next-line no-param-reassign
    name = name || RUNTIME_CONFIGURATION_NAME
    // eslint-disable-next-line no-param-reassign
    conf = rc(name, extend(true, {}, defaults, conf), argv)
    extend(true, state, conf)
    return state
  }
}
