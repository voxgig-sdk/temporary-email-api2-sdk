# TemporaryEmailApi2 SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "TemporaryEmailApi2",
            "slug": "temporary-email-api2",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://kingtmp.email",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "email_generation": {},
                "email_inbox": {},
            },
        },
        "entity": {
      "email_generation": {
        "fields": [
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "short": "The generated temporary email address",
            "format": "email",
          },
          {
            "name": "expires_at",
            "title": "Expires At",
            "type": "`$STRING`",
            "short": "Expiration timestamp of the temporary email",
            "format": "date-time",
          },
          {
            "name": "token",
            "title": "Token",
            "type": "`$STRING`",
            "short": "Authentication token for accessing the mailbox",
          },
        ],
        "name": "email_generation",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/generate",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "generate",
                  },
                ],
                "parts": [
                  "api",
                  "generate",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "email_inbox": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "messages",
            "title": "Messages",
            "type": "`$ARRAY`",
          },
          {
            "name": "total",
            "title": "Total",
            "type": "`$INTEGER`",
            "short": "Total number of messages",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "email_inbox",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/inbox/{email}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "inbox",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "api",
                  "inbox",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "email": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "email",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "temp_user_12345@kingtmp.email",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
