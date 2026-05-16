<?php
declare(strict_types=1);

// TemporaryEmailApi2 SDK utility: result_headers

class TemporaryEmailApi2ResultHeaders
{
    public static function call(TemporaryEmailApi2Context $ctx): ?TemporaryEmailApi2Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
