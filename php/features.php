<?php
declare(strict_types=1);

// TemporaryEmailApi2 SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class TemporaryEmailApi2Features
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new TemporaryEmailApi2BaseFeature();
            case "test":
                return new TemporaryEmailApi2TestFeature();
            default:
                return new TemporaryEmailApi2BaseFeature();
        }
    }
}
