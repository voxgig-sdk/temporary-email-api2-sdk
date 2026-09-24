
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'TemporaryEmailApi2',
        slug: "temporary-email-api2",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://kingtmp.email",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        email_generation: {
        },
  
        email_inbox: {
        },
  
    }
  }


  entity = {
    "email_generation": {
      "fields": [
        {
          "name": "email",
          "title": "Email",
          "type": "`$STRING`",
          "short": "The generated temporary email address",
          "format": "email"
        },
        {
          "name": "expires_at",
          "title": "Expires At",
          "type": "`$STRING`",
          "short": "Expiration timestamp of the temporary email",
          "format": "date-time"
        },
        {
          "name": "token",
          "title": "Token",
          "type": "`$STRING`",
          "short": "Authentication token for accessing the mailbox"
        }
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
                  "lit": "api"
                },
                {
                  "lit": "generate"
                }
              ],
              "parts": [
                "api",
                "generate"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "email_inbox": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "messages",
          "title": "Messages",
          "type": "`$ARRAY`"
        },
        {
          "name": "total",
          "title": "Total",
          "type": "`$INTEGER`",
          "short": "Total number of messages"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                  "lit": "api"
                },
                {
                  "lit": "inbox"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "inbox",
                "{id}"
              ],
              "rename": {
                "param": {
                  "email": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "email",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "temp_user_12345@kingtmp.email"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

