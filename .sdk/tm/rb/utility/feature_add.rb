# TemporaryEmailApi2 SDK utility: feature_add
module TemporaryEmailApi2Utilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
