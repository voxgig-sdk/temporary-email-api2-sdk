# TemporaryEmailApi2 SDK feature factory

from temporaryemailapi2_sdk.feature.base_feature import TemporaryEmailApi2BaseFeature
from temporaryemailapi2_sdk.feature.ratelimit_feature import TemporaryEmailApi2RatelimitFeature
from temporaryemailapi2_sdk.feature.retry_feature import TemporaryEmailApi2RetryFeature
from temporaryemailapi2_sdk.feature.test_feature import TemporaryEmailApi2TestFeature
from temporaryemailapi2_sdk.feature.timeout_feature import TemporaryEmailApi2TimeoutFeature


_FEATURES = {
    "base": lambda: TemporaryEmailApi2BaseFeature(),
    "ratelimit": lambda: TemporaryEmailApi2RatelimitFeature(),
    "retry": lambda: TemporaryEmailApi2RetryFeature(),
    "test": lambda: TemporaryEmailApi2TestFeature(),
    "timeout": lambda: TemporaryEmailApi2TimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
