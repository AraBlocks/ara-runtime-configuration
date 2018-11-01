const test = require('ava')
const rc = require('./')

test.cb('simple', (t) => {
  t.throws(() => rc(''), TypeError)
  t.throws(() => rc(123), TypeError)
  t.throws(() => rc(true), TypeError)
  t.throws(() => rc({}, {}), TypeError)
  t.throws(() => rc({}, 123), TypeError)
  t.throws(() => rc({}, true), TypeError)

  t.true('function' === typeof rc)
  t.true('object' === typeof rc())
  t.true('object' === typeof rc(() => {}))
  t.true(123 === rc({ foo: 123 }).foo)
  t.end()
})

test('function.valid', (t) => {
  const conf = rc((base) => {
    t.true(Boolean(base.network.identity.root))
    t.true(Boolean(base.data.root))
    return {
      test: {
        root: base.data.root
      }
    }
  })
  t.true(Boolean(conf.test.root) && (conf.test.root === conf.data.root))
})
