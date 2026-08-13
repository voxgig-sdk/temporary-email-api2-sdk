# frozen_string_literal: true

# Typed models for the TemporaryEmailApi2 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# EmailGeneration entity data model.
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
EmailGeneration = Struct.new(
  :email,
  :expires_at,
  :token,
  keyword_init: true
)

# Request payload for EmailGeneration#load.
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
EmailGenerationLoadMatch = Struct.new(
  :email,
  :expires_at,
  :token,
  keyword_init: true
)

# EmailInbox entity data model.
#
# @!attribute [rw] messages
#   @return [Array, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
EmailInbox = Struct.new(
  :messages,
  :total,
  keyword_init: true
)

# Request payload for EmailInbox#load.
#
# @!attribute [rw] id
#   @return [String]
EmailInboxLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

