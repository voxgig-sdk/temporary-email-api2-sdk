-- Typed models for the TemporaryEmailApi2 SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class EmailGeneration
---@field email? string
---@field expires_at? string
---@field token? string

---@class EmailGenerationLoadMatch

---@class EmailInbox
---@field message? table
---@field total? number

---@class EmailInboxLoadMatch
---@field id string

local M = {}

return M
