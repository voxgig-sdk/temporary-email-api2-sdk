<?php
declare(strict_types=1);

// TemporaryEmailApi2 SDK utility: prepare_body

class TemporaryEmailApi2PrepareBody
{
    public static function call(TemporaryEmailApi2Context $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
