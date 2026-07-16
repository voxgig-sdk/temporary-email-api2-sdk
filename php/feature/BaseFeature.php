<?php
declare(strict_types=1);

// TemporaryEmailApi2 SDK base feature

class TemporaryEmailApi2BaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(TemporaryEmailApi2Context $ctx, array $options): void {}
    public function PostConstruct(TemporaryEmailApi2Context $ctx): void {}
    public function PostConstructEntity(TemporaryEmailApi2Context $ctx): void {}
    public function SetData(TemporaryEmailApi2Context $ctx): void {}
    public function GetData(TemporaryEmailApi2Context $ctx): void {}
    public function GetMatch(TemporaryEmailApi2Context $ctx): void {}
    public function SetMatch(TemporaryEmailApi2Context $ctx): void {}
    public function PrePoint(TemporaryEmailApi2Context $ctx): void {}
    public function PreSpec(TemporaryEmailApi2Context $ctx): void {}
    public function PreRequest(TemporaryEmailApi2Context $ctx): void {}
    public function PreResponse(TemporaryEmailApi2Context $ctx): void {}
    public function PreResult(TemporaryEmailApi2Context $ctx): void {}
    public function PreDone(TemporaryEmailApi2Context $ctx): void {}
    public function PreUnexpected(TemporaryEmailApi2Context $ctx): void {}
}
