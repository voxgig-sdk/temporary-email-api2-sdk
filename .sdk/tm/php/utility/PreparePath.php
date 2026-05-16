<?php
declare(strict_types=1);

// TemporaryEmailApi2 SDK utility: prepare_path

class TemporaryEmailApi2PreparePath
{
    public static function call(TemporaryEmailApi2Context $ctx): string
    {
        $point = $ctx->point;
        $parts = [];
        if ($point) {
            $p = \Voxgig\Struct\Struct::getprop($point, 'parts');
            if (is_array($p)) {
                $parts = $p;
            }
        }
        return \Voxgig\Struct\Struct::join($parts, '/', true);
    }
}
