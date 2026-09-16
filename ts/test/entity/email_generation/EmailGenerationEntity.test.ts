

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TemporaryEmailApi2SDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('EmailGenerationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TEMPORARY_EMAIL_API2_TEST_LIVE=TRUE.
  afterEach(liveDelay('TEMPORARY_EMAIL_API2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TemporaryEmailApi2SDK.test()
    const ent = testsdk.EmailGeneration()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TEMPORARY_EMAIL_API2_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email_generation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"email","name":"email","req":false,"short":"The generated temporary email address","type":"`$STRING`","index$":0},{"active":true,"format":"date-time","name":"expires_at","req":false,"short":"Expiration timestamp of the temporary email","type":"`$STRING`","index$":1},{"active":true,"name":"token","req":false,"short":"Authentication token for accessing the mailbox","type":"`$STRING`","index$":2}],"name":"email_generation","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /api/generate","json":"{\"operationId\":\"generateEmail\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"success\":{\"summary\":\"Successful generation\",\"value\":{\"email\":\"temp_user_12345@kingtmp.email\",\"expires_at\":\"2024-01-01T23:59:59Z\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\"}}},\"schema\":{\"properties\":{\"email\":{\"description\":\"The generated temporary email address\",\"example\":\"random123@kingtmp.email\",\"format\":\"email\",\"type\":\"string\"},\"expires_at\":{\"description\":\"Expiration timestamp of the temporary email\",\"example\":\"2024-01-01T12:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"token\":{\"description\":\"Authentication token for accessing the mailbox\",\"example\":\"abc123def456\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successfully generated temporary email address\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":400,\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"example\":\"The provided email address is invalid\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":400,\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"example\":\"The provided email address is invalid\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Too many requests - Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":400,\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"example\":\"The provided email address is invalid\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/generate","segments":[{"lit":"api"},{"lit":"generate"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"email_generation","name__orig":"email_generation","Name":"EmailGeneration","name_":"email_generation","name-":"email-generation","NAME":"EMAIL_GENERATION","index$":0}, {"active":true,"entity":"email_generation","key$":"BasicEmailGenerationFlow","kind":"basic","name":"BasicEmailGenerationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"email_generation_ref01","srcdatavar":"email_generation_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-email_generation_ref01"}}],"index$":0}]}, 'EmailGeneration')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let email_generation_ref01_data = Object.values(setup.data.existing.email_generation)[0] as any

    // LOAD
    const email_generation_ref01_ent = client.EmailGeneration()
    const email_generation_ref01_match_dt0: any = {}
    const email_generation_ref01_data_dt0 = (await email_generation_ref01_ent.load(email_generation_ref01_match_dt0)).data()
    assert(null != email_generation_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/email_generation/EmailGenerationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TemporaryEmailApi2SDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['email_generation01','email_generation02','email_generation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TEMPORARY_EMAIL_API2_TEST_EMAIL_GENERATION_ENTID': idmap,
    'TEMPORARY_EMAIL_API2_TEST_LIVE': 'FALSE',
    'TEMPORARY_EMAIL_API2_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TEMPORARY_EMAIL_API2_TEST_EMAIL_GENERATION_ENTID']

  const live = 'TRUE' === env.TEMPORARY_EMAIL_API2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TEMPORARY_EMAIL_API2_TEST_EMAIL_GENERATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TemporaryEmailApi2SDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.TEMPORARY_EMAIL_API2_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
