# TemporaryEmailApi2 SDK configuration

module TemporaryEmailApi2Config
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "TemporaryEmailApi2",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://kingtmp.email",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "email_generation" => {},
          "email_inbox" => {},
        },
      },
      "entity" => {
        "email_generation" => {
          "fields" => [
            {
              "name" => "email",
              "type" => "`$STRING`",
            },
            {
              "name" => "expires_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "token",
              "type" => "`$STRING`",
            },
          ],
          "name" => "email_generation",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/generate",
                  "parts" => [
                    "api",
                    "generate",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "email_inbox" => {
          "fields" => [
            {
              "name" => "messages",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "total",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "email_inbox",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "temp_user_12345@kingtmp.email",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "email",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/inbox/{email}",
                  "parts" => [
                    "api",
                    "inbox",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "email" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    TemporaryEmailApi2Features.make_feature(name)
  end
end
