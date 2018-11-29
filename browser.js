const extend = require('extend')

module.exports = function rc(conf) {
  const root = extend(true, {
    network: { identity: { } },
    data: { root: '/.ara' },
    web3: { }
  }, conf)

  return extend(true, {
    network: {
      identity: `${root.data.root}/identities}`
    }
  }, root)
}
