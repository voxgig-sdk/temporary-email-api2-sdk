# TemporaryEmailApi2 SDK utility: make_context
require_relative '../core/context'
module TemporaryEmailApi2Utilities
  MakeContext = ->(ctxmap, basectx) {
    TemporaryEmailApi2Context.new(ctxmap, basectx)
  }
end
