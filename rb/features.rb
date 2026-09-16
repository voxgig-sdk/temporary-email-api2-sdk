# TemporaryEmailApi2 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module TemporaryEmailApi2Features
  def self.make_feature(name)
    case name
    when "base"
      TemporaryEmailApi2BaseFeature.new
    when "ratelimit"
      TemporaryEmailApi2RatelimitFeature.new
    when "retry"
      TemporaryEmailApi2RetryFeature.new
    when "test"
      TemporaryEmailApi2TestFeature.new
    when "timeout"
      TemporaryEmailApi2TimeoutFeature.new
    else
      TemporaryEmailApi2BaseFeature.new
    end
  end
end
