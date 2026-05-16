-- TemporaryEmailApi2 SDK error

local TemporaryEmailApi2Error = {}
TemporaryEmailApi2Error.__index = TemporaryEmailApi2Error


function TemporaryEmailApi2Error.new(code, msg, ctx)
  local self = setmetatable({}, TemporaryEmailApi2Error)
  self.is_sdk_error = true
  self.sdk = "TemporaryEmailApi2"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function TemporaryEmailApi2Error:error()
  return self.msg
end


function TemporaryEmailApi2Error:__tostring()
  return self.msg
end


return TemporaryEmailApi2Error
