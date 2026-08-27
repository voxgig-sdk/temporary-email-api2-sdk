
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
          "short": "The generated temporary email address",
          "type": "`$STRING`"
        },
        {
          "name": "expires_at",
          "short": "Expiration timestamp of the temporary email",
          "type": "`$STRING`"
        },
        {
          "name": "token",
          "short": "Authentication token for accessing the mailbox",
          "type": "`$STRING`"
        }
      ],
      "name": "email_generation",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/generate",
              "parts": [
                "api",
                "generate"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "type": "`$STRING`"
        },
        {
          "name": "messages",
          "type": "`$ARRAY`"
        },
        {
          "name": "total",
          "short": "Total number of messages",
          "type": "`$INTEGER`"
        }
      ],
      "name": "email_inbox",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "temp_user_12345@kingtmp.email",
                    "kind": "param",
                    "name": "id",
                    "orig": "email",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/inbox/{email}",
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
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
  config
}

