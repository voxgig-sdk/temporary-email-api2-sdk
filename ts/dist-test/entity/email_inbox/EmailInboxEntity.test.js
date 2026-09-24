"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('EmailInboxEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TEMPORARY_EMAIL_API2_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TEMPORARY_EMAIL_API2_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TemporaryEmailApi2SDK.test();
        const ent = testsdk.EmailInbox();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TEMPORARY_EMAIL_API2_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'email_inbox.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "messages": { "a": true, "h": "Messages", "n": "messages", "r": false, "t": "`$ARRAY`", "key$": "messages", "index$": 1 }, "total": { "a": true, "h": "Total", "n": "total", "r": false, "sh": "Total number of messages", "t": "`$INTEGER`", "key$": "total", "index$": 2 } }, "id": { "field": "id", "name": "id" }, "name": "email_inbox", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/inbox/{email}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "temp_user_12345@kingtmp.email", "k": "param", "n": "id", "or": "email", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/inbox/{email}", "q": { "exist": ["id"] }, "r": { "param": { "email": "id" } }, "s": [{ "lit": "api" }, { "lit": "inbox" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "email_inbox", "name__orig": "email_inbox", "Name": "EmailInbox", "name_": "email_inbox", "name-": "email-inbox", "NAME": "EMAIL_INBOX", "index$": 1 }, { "active": true, "entity": "email_inbox", "key$": "BasicEmailInboxFlow", "kind": "basic", "name": "BasicEmailInboxFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "email_inbox_ref01", "srcdatavar": "email_inbox_ref01_data", "suffix": "_dt0" }, "m": { "id": "email_inbox01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-email_inbox_ref01" } }], "index$": 0 }] }, 'EmailInbox', { "GET /api/inbox/{email}": { "protocol": "http", "operationId": "getInbox", "responses": { "200": { "description": "Successfully retrieved inbox messages", "content": { "application/json": { "schema": { "type": "object", "properties": { "messages": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "string", "description": "Unique message identifier", "example": "msg_123456" }, "from": { "type": "string", "format": "email", "description": "Sender's email address", "example": "sender@example.com" }, "subject": { "type": "string", "description": "Email subject line", "example": "Welcome to our service" }, "body": { "type": "string", "description": "Email body content", "example": "Thank you for signing up..." }, "received_at": { "type": "string", "format": "date-time", "description": "Timestamp when the message was received", "example": "2024-01-01T10:30:00Z" }, "attachments": { "type": "array", "items": { "type": "object", "properties": { "filename": { "type": "string", "example": "document.pdf" }, "size": { "type": "integer", "description": "File size in bytes", "example": 12345 }, "content_type": { "type": "string", "example": "application/pdf" } } } } }, "x-ref": "#/components/schemas/Message" }, "key$": "messages" }, "total": { "type": "integer", "description": "Total number of messages", "example": 5, "key$": "total" } }, "index$": 0 } } } }, "404": { "description": "Email address not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message", "example": "Invalid request" }, "code": { "type": "integer", "description": "Error code", "example": 400 }, "details": { "type": "string", "description": "Additional error details", "example": "The provided email address is invalid" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "email", "in": "path", "required": true, "description": "The temporary email address to check", "schema": { "type": "string", "format": "email" }, "example": "temp_user_12345@kingtmp.email", "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let email_inbox_ref01_data = Object.values(setup.data.existing.email_inbox)[0];
        // LOAD
        const email_inbox_ref01_ent = client.EmailInbox();
        const email_inbox_ref01_match_dt0 = {};
        email_inbox_ref01_match_dt0.id = email_inbox_ref01_data.id;
        const email_inbox_ref01_data_dt0 = (await email_inbox_ref01_ent.load(email_inbox_ref01_match_dt0)).data();
        (0, node_assert_1.default)(email_inbox_ref01_data_dt0.id === email_inbox_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/email_inbox/EmailInboxTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TemporaryEmailApi2SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['email_inbox01', 'email_inbox02', 'email_inbox03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TEMPORARY_EMAIL_API2_TEST_EMAIL_INBOX_ENTID': idmap,
        'TEMPORARY_EMAIL_API2_TEST_LIVE': 'FALSE',
        'TEMPORARY_EMAIL_API2_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['TEMPORARY_EMAIL_API2_TEST_EMAIL_INBOX_ENTID'];
    const live = 'TRUE' === env.TEMPORARY_EMAIL_API2_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TEMPORARY_EMAIL_API2_TEST_EMAIL_INBOX_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.TemporaryEmailApi2SDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=EmailInboxEntity.test.js.map