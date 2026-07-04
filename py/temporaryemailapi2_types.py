# Typed models for the TemporaryEmailApi2 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class EmailGeneration:
    email: Optional[str] = None
    expires_at: Optional[str] = None
    token: Optional[str] = None


@dataclass
class EmailGenerationLoadMatch:
    email: Optional[str] = None
    expires_at: Optional[str] = None
    token: Optional[str] = None


@dataclass
class EmailInbox:
    message: Optional[list] = None
    total: Optional[int] = None


@dataclass
class EmailInboxLoadMatch:
    id: str

