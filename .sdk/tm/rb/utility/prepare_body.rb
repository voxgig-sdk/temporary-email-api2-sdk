# TemporaryEmailApi2 SDK utility: prepare_body
require_relative 'media'
module TemporaryEmailApi2Utilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return TemporaryEmailApi2Utilities.raw_body(ctx.reqdata) if TemporaryEmailApi2Utilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
