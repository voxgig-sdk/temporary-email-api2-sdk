<?php
declare(strict_types=1);

// TemporaryEmailApi2 SDK utility: result_body

class TemporaryEmailApi2ResultBody
{
    public static function call(TemporaryEmailApi2Context $ctx): ?TemporaryEmailApi2Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
