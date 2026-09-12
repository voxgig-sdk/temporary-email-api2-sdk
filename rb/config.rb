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
        "slug" => "temporary-email-api2",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "format" => "email",
              "name" => "email",
              "short" => "The generated temporary email address",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "expires_at",
              "short" => "Expiration timestamp of the temporary email",
              "type" => "`$STRING`",
            },
            {
              "name" => "token",
              "short" => "Authentication token for accessing the mailbox",
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
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "generate",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "generate",
                  ],
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
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "messages",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "total",
              "short" => "Total number of messages",
              "type" => "`$INTEGER`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
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
                  "rename" => {
                    "param" => {
                      "email" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "inbox",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "inbox",
                    "{id}",
                  ],
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
