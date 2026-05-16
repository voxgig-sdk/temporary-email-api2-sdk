# TemporaryEmailApi2 SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

TemporaryEmailApi2Utility.registrar = ->(u) {
  u.clean = TemporaryEmailApi2Utilities::Clean
  u.done = TemporaryEmailApi2Utilities::Done
  u.make_error = TemporaryEmailApi2Utilities::MakeError
  u.feature_add = TemporaryEmailApi2Utilities::FeatureAdd
  u.feature_hook = TemporaryEmailApi2Utilities::FeatureHook
  u.feature_init = TemporaryEmailApi2Utilities::FeatureInit
  u.fetcher = TemporaryEmailApi2Utilities::Fetcher
  u.make_fetch_def = TemporaryEmailApi2Utilities::MakeFetchDef
  u.make_context = TemporaryEmailApi2Utilities::MakeContext
  u.make_options = TemporaryEmailApi2Utilities::MakeOptions
  u.make_request = TemporaryEmailApi2Utilities::MakeRequest
  u.make_response = TemporaryEmailApi2Utilities::MakeResponse
  u.make_result = TemporaryEmailApi2Utilities::MakeResult
  u.make_point = TemporaryEmailApi2Utilities::MakePoint
  u.make_spec = TemporaryEmailApi2Utilities::MakeSpec
  u.make_url = TemporaryEmailApi2Utilities::MakeUrl
  u.param = TemporaryEmailApi2Utilities::Param
  u.prepare_auth = TemporaryEmailApi2Utilities::PrepareAuth
  u.prepare_body = TemporaryEmailApi2Utilities::PrepareBody
  u.prepare_headers = TemporaryEmailApi2Utilities::PrepareHeaders
  u.prepare_method = TemporaryEmailApi2Utilities::PrepareMethod
  u.prepare_params = TemporaryEmailApi2Utilities::PrepareParams
  u.prepare_path = TemporaryEmailApi2Utilities::PreparePath
  u.prepare_query = TemporaryEmailApi2Utilities::PrepareQuery
  u.result_basic = TemporaryEmailApi2Utilities::ResultBasic
  u.result_body = TemporaryEmailApi2Utilities::ResultBody
  u.result_headers = TemporaryEmailApi2Utilities::ResultHeaders
  u.transform_request = TemporaryEmailApi2Utilities::TransformRequest
  u.transform_response = TemporaryEmailApi2Utilities::TransformResponse
}
