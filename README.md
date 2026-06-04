# TemporaryEmailApi2 SDK

Generate disposable email addresses and read their inboxes via a temporary mail API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Temporary Email API

Temporary Email API is a disposable / throwaway email service that lets you spin up short-lived email addresses on demand and read the messages they receive. The service is offered under the `kingtmp.email` domain.

What you typically get from a temp-mail style API:

- Create or request a new temporary email address
- Poll the inbox for that address and read incoming messages (subject, sender, body)
- Discard the address when you're done

Useful for sign-up flows, automated testing of email-based onboarding, anti-spam experiments, and any workflow where you need a real-looking inbox without provisioning a permanent mailbox. Operational details such as message retention, rate limits, and authentication requirements are not documented on a public landing page at time of writing — check the upstream OpenAPI specification for exact endpoints and parameters.

## Try it

**TypeScript**
```bash
npm install temporary-email-api2
```

**Python**
```bash
pip install temporary-email-api2-sdk
```

**PHP**
```bash
composer require voxgig/temporary-email-api2-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/temporary-email-api2-sdk/go
```

**Ruby**
```bash
gem install temporary-email-api2-sdk
```

**Lua**
```bash
luarocks install temporary-email-api2-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { TemporaryEmailApi2SDK } from 'temporary-email-api2'

const client = new TemporaryEmailApi2SDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o temporary-email-api2-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "temporary-email-api2": {
      "command": "/abs/path/to/temporary-email-api2-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **EmailGeneration** | Operations for creating / requesting a fresh temporary email address that can receive mail. | `/api/generate` |
| **EmailInbox** | Operations for listing and reading messages delivered to a previously-generated temporary address. | `/api/inbox/{email}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from temporaryemailapi2_sdk import TemporaryEmailApi2SDK

client = TemporaryEmailApi2SDK({})


# Load a specific emailgeneration
emailgeneration, err = client.EmailGeneration(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'temporaryemailapi2_sdk.php';

$client = new TemporaryEmailApi2SDK([]);


// Load a specific emailgeneration
[$emailgeneration, $err] = $client->EmailGeneration(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/temporary-email-api2-sdk/go"

client := sdk.NewTemporaryEmailApi2SDK(map[string]any{})

```

### Ruby

```ruby
require_relative "TemporaryEmailApi2_sdk"

client = TemporaryEmailApi2SDK.new({})


# Load a specific emailgeneration
emailgeneration, err = client.EmailGeneration(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("temporary-email-api2_sdk")

local client = sdk.new({})


-- Load a specific emailgeneration
local emailgeneration, err = client:EmailGeneration(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = TemporaryEmailApi2SDK.test()
const result = await client.EmailGeneration().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = TemporaryEmailApi2SDK.test(None, None)
result, err = client.EmailGeneration(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = TemporaryEmailApi2SDK::test(null, null);
[$result, $err] = $client->EmailGeneration(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.EmailGeneration(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = TemporaryEmailApi2SDK.test(nil, nil)
result, err = client.EmailGeneration(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:EmailGeneration(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Temporary Email API

- Upstream: [https://kingtmp.email](https://kingtmp.email)

---

Generated from the Temporary Email API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
