-- TemporaryEmailApi2 SDK error

local json = require("dkjson")

local TemporaryEmailApi2Error = {}
TemporaryEmailApi2Error.__index = TemporaryEmailApi2Error

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function TemporaryEmailApi2Error.new(code, msg, ctx)
  local self = setmetatable({}, TemporaryEmailApi2Error)
  self.is_sdk_error = true
  self.sdk = "TemporaryEmailApi2"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  CONTEXT[self] = ctx
  return self
end


function TemporaryEmailApi2Error:context()
  return CONTEXT[self]
end


function TemporaryEmailApi2Error:error()
  return self.msg
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function TemporaryEmailApi2Error:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function TemporaryEmailApi2Error:to_json()
  return json.encode(self:to_table())
end


function TemporaryEmailApi2Error:__tostring()
  return self.msg
end


function TemporaryEmailApi2Error.__tojson(self)
  return self:to_json()
end


return TemporaryEmailApi2Error
