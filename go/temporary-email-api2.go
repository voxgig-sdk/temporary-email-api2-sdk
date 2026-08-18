package voxgigtemporaryemailapi2sdk

import (
	"github.com/voxgig-sdk/temporary-email-api2-sdk/go/core"
	"github.com/voxgig-sdk/temporary-email-api2-sdk/go/entity"
	"github.com/voxgig-sdk/temporary-email-api2-sdk/go/feature"
	_ "github.com/voxgig-sdk/temporary-email-api2-sdk/go/utility"
)

// Type aliases preserve external API.
type TemporaryEmailApi2SDK = core.TemporaryEmailApi2SDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type TemporaryEmailApi2Entity = core.TemporaryEmailApi2Entity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type TemporaryEmailApi2Error = core.TemporaryEmailApi2Error

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewEmailGenerationEntityFunc = func(client *core.TemporaryEmailApi2SDK, entopts map[string]any) core.TemporaryEmailApi2Entity {
		return entity.NewEmailGenerationEntity(client, entopts)
	}
	core.NewEmailInboxEntityFunc = func(client *core.TemporaryEmailApi2SDK, entopts map[string]any) core.TemporaryEmailApi2Entity {
		return entity.NewEmailInboxEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewTemporaryEmailApi2SDK = core.NewTemporaryEmailApi2SDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewTemporaryEmailApi2SDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *TemporaryEmailApi2SDK  { return NewTemporaryEmailApi2SDK(nil) }
func Test() *TemporaryEmailApi2SDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
