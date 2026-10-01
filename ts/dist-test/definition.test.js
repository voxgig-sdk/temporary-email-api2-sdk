"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "email_generation",
        "accessor": "EmailGeneration",
        "op": "load",
        "method": "GET",
        "path": "/api/generate",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "email": "temp_user_12345@kingtmp.email",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
            "expires_at": "2024-01-01T23:59:59Z"
        },
        "idField": "id"
    },
    {
        "entity": "email_inbox",
        "accessor": "EmailInbox",
        "op": "load",
        "method": "GET",
        "path": "/api/inbox/{email}",
        "args": [
            {
                "name": "id",
                "wire": "email",
                "value": "temp_user_12345@kingtmp.email"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "messages": [
                {
                    "id": "msg_123456",
                    "from": "sender@example.com",
                    "subject": "Welcome to our service",
                    "body": "Thank you for signing up...",
                    "received_at": "2024-01-01T10:30:00Z",
                    "attachments": [
                        {
                            "filename": "document.pdf",
                            "size": 12345,
                            "content_type": "application/pdf"
                        }
                    ]
                }
            ],
            "total": 5
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map