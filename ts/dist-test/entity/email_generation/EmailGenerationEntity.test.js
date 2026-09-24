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
(0, node_test_1.describe)('EmailGenerationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TEMPORARY_EMAIL_API2_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TEMPORARY_EMAIL_API2_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TemporaryEmailApi2SDK.test();
        const ent = testsdk.EmailGeneration();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TEMPORARY_EMAIL_API2_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'email_generation.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "email": { "a": true, "fo": "email", "h": "Email", "n": "email", "r": false, "sh": "The generated temporary email address", "t": "`$STRING`", "key$": "email", "index$": 0 }, "expires_at": { "a": true, "fo": "date-time", "h": "Expires At", "n": "expires_at", "r": false, "sh": "Expiration timestamp of the temporary email", "t": "`$STRING`", "key$": "expires_at", "index$": 1 }, "token": { "a": true, "h": "Token", "n": "token", "r": false, "sh": "Authentication token for accessing the mailbox", "t": "`$STRING`", "key$": "token", "index$": 2 } }, "name": "email_generation", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/generate", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/generate", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "generate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "email_generation", "name__orig": "email_generation", "Name": "EmailGeneration", "name_": "email_generation", "name-": "email-generation", "NAME": "EMAIL_GENERATION", "index$": 0 }, { "active": true, "entity": "email_generation", "key$": "BasicEmailGenerationFlow", "kind": "basic", "name": "BasicEmailGenerationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "email_generation_ref01", "srcdatavar": "email_generation_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-email_generation_ref01" } }], "index$": 0 }] }, 'EmailGeneration', { "GET /api/generate": { "protocol": "http", "operationId": "generateEmail", "responses": { "200": { "description": "Successfully generated temporary email address", "content": { "application/json": { "schema": { "type": "object", "properties": { "email": { "description": "The generated temporary email address", "example": "random123@kingtmp.email", "format": "email", "key$": "email", "type": "string" }, "token": { "description": "Authentication token for accessing the mailbox", "example": "abc123def456", "key$": "token", "type": "string" }, "expires_at": { "description": "Expiration timestamp of the temporary email", "example": "2024-01-01T12:00:00Z", "format": "date-time", "key$": "expires_at", "type": "string" } }, "index$": 0 }, "examples": { "success": { "summary": "Successful generation", "value": { "email": "temp_user_12345@kingtmp.email", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", "expires_at": "2024-01-01T23:59:59Z" } } } } } }, "400": { "description": "Bad request - Invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message", "example": "Invalid request" }, "code": { "type": "integer", "description": "Error code", "example": 400 }, "details": { "type": "string", "description": "Additional error details", "example": "The provided email address is invalid" } }, "x-ref": "#/components/schemas/Error" } } } }, "429": { "description": "Too many requests - Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message", "example": "Invalid request" }, "code": { "type": "integer", "description": "Error code", "example": 400 }, "details": { "type": "string", "description": "Additional error details", "example": "The provided email address is invalid" } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message", "example": "Invalid request" }, "code": { "type": "integer", "description": "Error code", "example": 400 }, "details": { "type": "string", "description": "Additional error details", "example": "The provided email address is invalid" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let email_generation_ref01_data = Object.values(setup.data.existing.email_generation)[0];
        // LOAD
        const email_generation_ref01_ent = client.EmailGeneration();
        const email_generation_ref01_match_dt0 = {};
        const email_generation_ref01_data_dt0 = (await email_generation_ref01_ent.load(email_generation_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != email_generation_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/email_generation/EmailGenerationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TemporaryEmailApi2SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['email_generation01', 'email_generation02', 'email_generation03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TEMPORARY_EMAIL_API2_TEST_EMAIL_GENERATION_ENTID': idmap,
        'TEMPORARY_EMAIL_API2_TEST_LIVE': 'FALSE',
        'TEMPORARY_EMAIL_API2_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['TEMPORARY_EMAIL_API2_TEST_EMAIL_GENERATION_ENTID'];
    const live = 'TRUE' === env.TEMPORARY_EMAIL_API2_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TEMPORARY_EMAIL_API2_TEST_EMAIL_GENERATION_ENTID'];
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
//# sourceMappingURL=EmailGenerationEntity.test.js.map