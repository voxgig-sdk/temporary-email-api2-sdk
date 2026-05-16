# TemporaryEmailApi2 SDK feature factory

from feature.base_feature import TemporaryEmailApi2BaseFeature
from feature.test_feature import TemporaryEmailApi2TestFeature


def _make_feature(name):
    features = {
        "base": lambda: TemporaryEmailApi2BaseFeature(),
        "test": lambda: TemporaryEmailApi2TestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
