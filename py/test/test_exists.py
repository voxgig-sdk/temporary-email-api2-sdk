# ProjectName SDK exists test

import pytest
from temporaryemailapi2_sdk import TemporaryEmailApi2SDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = TemporaryEmailApi2SDK.test(None, None)
        assert testsdk is not None
