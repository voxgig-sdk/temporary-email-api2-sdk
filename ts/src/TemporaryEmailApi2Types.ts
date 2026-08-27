// Typed models for the TemporaryEmailApi2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface EmailGeneration {
  email?: string
  expires_at?: string
  token?: string
}

export interface EmailGenerationLoadMatch {
  email?: string
  expires_at?: string
  token?: string
}

export interface EmailInbox {
  id?: string
  messages?: any[]
  total?: number
}

export interface EmailInboxLoadMatch {
  id: string
}

