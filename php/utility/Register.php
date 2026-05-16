<?php
declare(strict_types=1);

// TemporaryEmailApi2 SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

TemporaryEmailApi2Utility::setRegistrar(function (TemporaryEmailApi2Utility $u): void {
    $u->clean = [TemporaryEmailApi2Clean::class, 'call'];
    $u->done = [TemporaryEmailApi2Done::class, 'call'];
    $u->make_error = [TemporaryEmailApi2MakeError::class, 'call'];
    $u->feature_add = [TemporaryEmailApi2FeatureAdd::class, 'call'];
    $u->feature_hook = [TemporaryEmailApi2FeatureHook::class, 'call'];
    $u->feature_init = [TemporaryEmailApi2FeatureInit::class, 'call'];
    $u->fetcher = [TemporaryEmailApi2Fetcher::class, 'call'];
    $u->make_fetch_def = [TemporaryEmailApi2MakeFetchDef::class, 'call'];
    $u->make_context = [TemporaryEmailApi2MakeContext::class, 'call'];
    $u->make_options = [TemporaryEmailApi2MakeOptions::class, 'call'];
    $u->make_request = [TemporaryEmailApi2MakeRequest::class, 'call'];
    $u->make_response = [TemporaryEmailApi2MakeResponse::class, 'call'];
    $u->make_result = [TemporaryEmailApi2MakeResult::class, 'call'];
    $u->make_point = [TemporaryEmailApi2MakePoint::class, 'call'];
    $u->make_spec = [TemporaryEmailApi2MakeSpec::class, 'call'];
    $u->make_url = [TemporaryEmailApi2MakeUrl::class, 'call'];
    $u->param = [TemporaryEmailApi2Param::class, 'call'];
    $u->prepare_auth = [TemporaryEmailApi2PrepareAuth::class, 'call'];
    $u->prepare_body = [TemporaryEmailApi2PrepareBody::class, 'call'];
    $u->prepare_headers = [TemporaryEmailApi2PrepareHeaders::class, 'call'];
    $u->prepare_method = [TemporaryEmailApi2PrepareMethod::class, 'call'];
    $u->prepare_params = [TemporaryEmailApi2PrepareParams::class, 'call'];
    $u->prepare_path = [TemporaryEmailApi2PreparePath::class, 'call'];
    $u->prepare_query = [TemporaryEmailApi2PrepareQuery::class, 'call'];
    $u->result_basic = [TemporaryEmailApi2ResultBasic::class, 'call'];
    $u->result_body = [TemporaryEmailApi2ResultBody::class, 'call'];
    $u->result_headers = [TemporaryEmailApi2ResultHeaders::class, 'call'];
    $u->transform_request = [TemporaryEmailApi2TransformRequest::class, 'call'];
    $u->transform_response = [TemporaryEmailApi2TransformResponse::class, 'call'];
});
