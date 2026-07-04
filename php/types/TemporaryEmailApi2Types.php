<?php
declare(strict_types=1);

// Typed models for the TemporaryEmailApi2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** EmailGeneration entity data model. */
class EmailGeneration
{
    public ?string $email = null;
    public ?string $expires_at = null;
    public ?string $token = null;
}

/** Match filter for EmailGeneration#load (any subset of EmailGeneration fields). */
class EmailGenerationLoadMatch
{
    public ?string $email = null;
    public ?string $expires_at = null;
    public ?string $token = null;
}

/** EmailInbox entity data model. */
class EmailInbox
{
    public ?array $message = null;
    public ?int $total = null;
}

/** Request payload for EmailInbox#load. */
class EmailInboxLoadMatch
{
    public string $id;
}

