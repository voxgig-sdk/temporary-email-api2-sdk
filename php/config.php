<?php
declare(strict_types=1);

// TemporaryEmailApi2 SDK configuration

class TemporaryEmailApi2Config
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "TemporaryEmailApi2",
                "slug" => "temporary-email-api2",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://kingtmp.email",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "email_generation" => [],
                    "email_inbox" => [],
                ],
            ],
            "entity" => [
        'email_generation' => [
          'fields' => [
            [
              'name' => 'email',
              'short' => 'The generated temporary email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'expires_at',
              'short' => 'Expiration timestamp of the temporary email',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'token',
              'short' => 'Authentication token for accessing the mailbox',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'email_generation',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/generate',
                  'parts' => [
                    'api',
                    'generate',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'email_inbox' => [
          'fields' => [
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'messages',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'total',
              'short' => 'Total number of messages',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'email_inbox',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'temp_user_12345@kingtmp.email',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'email',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/inbox/{email}',
                  'parts' => [
                    'api',
                    'inbox',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'email' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return TemporaryEmailApi2Features::make_feature($name);
    }
}
