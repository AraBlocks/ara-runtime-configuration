'use strict'

const rc = require('rc')
const kRuntimeConfigurationName = 'ara'

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
    return rc(name || kRuntimeConfigurationName, conf)
  }
}
