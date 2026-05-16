package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewEmailGenerationEntityFunc func(client *TemporaryEmailApi2SDK, entopts map[string]any) TemporaryEmailApi2Entity

var NewEmailInboxEntityFunc func(client *TemporaryEmailApi2SDK, entopts map[string]any) TemporaryEmailApi2Entity

