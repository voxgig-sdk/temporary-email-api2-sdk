
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TemporaryEmailApi2SDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = TemporaryEmailApi2SDK.test()
    equal(testsdk instanceof TemporaryEmailApi2SDK, true,
      'TemporaryEmailApi2SDK.test() must return a client synchronously')
  })

})
