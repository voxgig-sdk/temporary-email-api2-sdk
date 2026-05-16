<?php
declare(strict_types=1);

// TemporaryEmailApi2 SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class TemporaryEmailApi2MakeContext
{
    public static function call(array $ctxmap, ?TemporaryEmailApi2Context $basectx): TemporaryEmailApi2Context
    {
        return new TemporaryEmailApi2Context($ctxmap, $basectx);
    }
}
