

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


describe('EmailInboxEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TEMPORARY_EMAIL_API2_TEST_LIVE=TRUE.
  afterEach(liveDelay('TEMPORARY_EMAIL_API2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TemporaryEmailApi2SDK.test()
    const ent = testsdk.EmailInbox()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TEMPORARY_EMAIL_API2_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email_inbox.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"messages","req":false,"type":"`$ARRAY`","index$":1},{"active":true,"name":"total","req":false,"short":"Total number of messages","type":"`$INTEGER`","index$":2}],"id":{"field":"id","name":"id"},"name":"email_inbox","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"temp_user_12345@kingtmp.email","kind":"param","name":"id","orig":"email","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/inbox/{email}","json":"{\"operationId\":\"getInbox\",\"parameters\":[{\"description\":\"The temporary email address to check\",\"example\":\"temp_user_12345@kingtmp.email\",\"in\":\"path\",\"name\":\"email\",\"required\":true,\"schema\":{\"format\":\"email\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"messages\":{\"items\":{\"properties\":{\"attachments\":{\"items\":{\"properties\":{\"content_type\":{\"example\":\"application/pdf\",\"type\":\"string\"},\"filename\":{\"example\":\"document.pdf\",\"type\":\"string\"},\"size\":{\"description\":\"File size in bytes\",\"example\":12345,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"description\":\"Email body content\",\"example\":\"Thank you for signing up...\",\"type\":\"string\"},\"from\":{\"description\":\"Sender's email address\",\"example\":\"sender@example.com\",\"format\":\"email\",\"type\":\"string\"},\"id\":{\"description\":\"Unique message identifier\",\"example\":\"msg_123456\",\"type\":\"string\"},\"received_at\":{\"description\":\"Timestamp when the message was received\",\"example\":\"2024-01-01T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"subject\":{\"description\":\"Email subject line\",\"example\":\"Welcome to our service\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"description\":\"Total number of messages\",\"example\":5,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved inbox messages\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":400,\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"example\":\"The provided email address is invalid\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Email address not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/inbox/{email}","rename":{"param":{"email":"id"}},"segments":[{"lit":"api"},{"lit":"inbox"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"email_inbox","name__orig":"email_inbox","Name":"EmailInbox","name_":"email_inbox","name-":"email-inbox","NAME":"EMAIL_INBOX","index$":1}, {"active":true,"entity":"email_inbox","key$":"BasicEmailInboxFlow","kind":"basic","name":"BasicEmailInboxFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"email_inbox_ref01","srcdatavar":"email_inbox_ref01_data","suffix":"_dt0"},"match":{"id":"email_inbox01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-email_inbox_ref01"}}],"index$":0}]}, 'EmailInbox')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let email_inbox_ref01_data = Object.values(setup.data.existing.email_inbox)[0] as any

    // LOAD
    const email_inbox_ref01_ent = client.EmailInbox()
    const email_inbox_ref01_match_dt0: any = {}
    email_inbox_ref01_match_dt0.id = email_inbox_ref01_data.id
    const email_inbox_ref01_data_dt0 = (await email_inbox_ref01_ent.load(email_inbox_ref01_match_dt0)).data()
    assert(email_inbox_ref01_data_dt0.id === email_inbox_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/email_inbox/EmailInboxTestData.json')

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
    ['email_inbox01','email_inbox02','email_inbox03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TEMPORARY_EMAIL_API2_TEST_EMAIL_INBOX_ENTID': idmap,
    'TEMPORARY_EMAIL_API2_TEST_LIVE': 'FALSE',
    'TEMPORARY_EMAIL_API2_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TEMPORARY_EMAIL_API2_TEST_EMAIL_INBOX_ENTID']

  const live = 'TRUE' === env.TEMPORARY_EMAIL_API2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TEMPORARY_EMAIL_API2_TEST_EMAIL_INBOX_ENTID']
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
  
