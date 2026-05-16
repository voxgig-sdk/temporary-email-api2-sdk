
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TemporaryEmailApi2SDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await TemporaryEmailApi2SDK.test()
    equal(null !== testsdk, true)
  })

})
