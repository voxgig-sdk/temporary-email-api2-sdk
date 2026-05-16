# TemporaryEmailApi2 SDK exists test

require "minitest/autorun"
require_relative "../TemporaryEmailApi2_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = TemporaryEmailApi2SDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
