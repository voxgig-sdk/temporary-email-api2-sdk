<?php
declare(strict_types=1);

// TemporaryEmailApi2 SDK configuration

class TemporaryEmailApi2Config
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "TemporaryEmailApi2",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'active' => true,
              'name' => 'email',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'expires_at',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'token',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
          ],
          'name' => 'email_generation',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'email_inbox' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'messages',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'total',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 1,
            ],
          ],
          'name' => 'email_inbox',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => 'temp_user_12345@kingtmp.email',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'email',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
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
