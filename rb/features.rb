# TemporaryEmailApi2 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module TemporaryEmailApi2Features
  def self.make_feature(name)
    case name
    when "base"
      TemporaryEmailApi2BaseFeature.new
    when "test"
      TemporaryEmailApi2TestFeature.new
    else
      TemporaryEmailApi2BaseFeature.new
    end
  end
end
