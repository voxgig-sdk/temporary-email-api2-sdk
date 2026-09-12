import { TemporaryEmailApi2EntityBase } from '../TemporaryEmailApi2EntityBase';
import type { TemporaryEmailApi2SDK } from '../TemporaryEmailApi2SDK';
import type { Control } from '../types';
import type { EmailGeneration, EmailGenerationLoadMatch } from '../TemporaryEmailApi2Types';
declare class EmailGenerationEntity extends TemporaryEmailApi2EntityBase<EmailGeneration> {
    constructor(client: TemporaryEmailApi2SDK, entopts: any);
    make(this: EmailGenerationEntity): EmailGenerationEntity;
    load(this: any, reqmatch?: EmailGenerationLoadMatch, ctrl?: Control): Promise<EmailGenerationEntity>;
}
export { EmailGenerationEntity };
