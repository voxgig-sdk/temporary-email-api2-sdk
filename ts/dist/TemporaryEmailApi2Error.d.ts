import { Context } from './Context';
declare class TemporaryEmailApi2Error extends Error {
    isTemporaryEmailApi2Error: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { TemporaryEmailApi2Error };
