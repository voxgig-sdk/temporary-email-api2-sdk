# TemporaryEmailApi2 SDK utility: make_context

from core.context import TemporaryEmailApi2Context


def make_context_util(ctxmap, basectx):
    return TemporaryEmailApi2Context(ctxmap, basectx)
