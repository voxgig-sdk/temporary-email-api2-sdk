"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporaryEmailApi2Error = void 0;
class TemporaryEmailApi2Error extends Error {
    isTemporaryEmailApi2Error = true;
    sdk = 'TemporaryEmailApi2';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.TemporaryEmailApi2Error = TemporaryEmailApi2Error;
//# sourceMappingURL=TemporaryEmailApi2Error.js.map