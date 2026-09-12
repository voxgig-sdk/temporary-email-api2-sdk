import { EmailGenerationEntity } from './entity/EmailGenerationEntity';
import { EmailInboxEntity } from './entity/EmailInboxEntity';
export type * from './TemporaryEmailApi2Types';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { TemporaryEmailApi2EntityBase } from './TemporaryEmailApi2EntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class TemporaryEmailApi2SDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    EmailGeneration(entopts?: Record<string, any>): EmailGenerationEntity;
    EmailInbox(entopts?: Record<string, any>): EmailInboxEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): TemporaryEmailApi2SDK;
    tester(testopts?: any, sdkopts?: any): TemporaryEmailApi2SDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof TemporaryEmailApi2SDK;
export { stdutil, config, BaseFeature, TemporaryEmailApi2EntityBase, TemporaryEmailApi2SDK, SDK, };
