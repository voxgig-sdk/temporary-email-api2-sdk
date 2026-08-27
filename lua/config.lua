-- TemporaryEmailApi2 SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "TemporaryEmailApi2",
      slug = "temporary-email-api2",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://kingtmp.email",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["email_generation"] = {},
        ["email_inbox"] = {},
      },
    },
    entity = {
      ["email_generation"] = {
        ["fields"] = {
          {
            ["name"] = "email",
            ["short"] = "The generated temporary email address",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "expires_at",
            ["short"] = "Expiration timestamp of the temporary email",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "token",
            ["short"] = "Authentication token for accessing the mailbox",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "email_generation",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/generate",
                ["parts"] = {
                  "api",
                  "generate",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["email_inbox"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "messages",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "total",
            ["short"] = "Total number of messages",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "email_inbox",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "temp_user_12345@kingtmp.email",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "email",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/inbox/{email}",
                ["parts"] = {
                  "api",
                  "inbox",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["email"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
