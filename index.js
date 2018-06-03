'use strict'

const { resolve } = require('path')
const extend = require('extend')
const rc = require('rc')
const os = require('os')

const kRuntimeConfigurationName = 'ara'

const kRuntimeConfigurationDefaults = {
  network: {},
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
  if (null != conf && 'object' != typeof conf) {
    throw new TypeError("ARARuntimeConfiguration: Expecting configuration to be an object.")
  } else if (null != name && 'string' != typeof name) {
    throw new TypeError("ARARuntimeConfiguration: Expecting name to be a string.")
  } else {
    const defaults = kRuntimeConfigurationDefaults
    name = name || kRuntimeConfigurationName
    conf = rc(name, extend(true, {}, defaults, conf))
    extend(true, state, conf)
    return state
  }
}
