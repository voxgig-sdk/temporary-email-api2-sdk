<?php
declare(strict_types=1);

// TemporaryEmailApi2 SDK utility: feature_add

class TemporaryEmailApi2FeatureAdd
{
    public static function call(TemporaryEmailApi2Context $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
