import { TemporaryEmailApi2EntityBase } from '../TemporaryEmailApi2EntityBase';
import type { TemporaryEmailApi2SDK } from '../TemporaryEmailApi2SDK';
import type { Control } from '../types';
import type { EmailInbox, EmailInboxLoadMatch } from '../TemporaryEmailApi2Types';
declare class EmailInboxEntity extends TemporaryEmailApi2EntityBase<EmailInbox> {
    constructor(client: TemporaryEmailApi2SDK, entopts: any);
    make(this: EmailInboxEntity): EmailInboxEntity;
    load(this: any, reqmatch?: EmailInboxLoadMatch, ctrl?: Control): Promise<EmailInboxEntity>;
}
export { EmailInboxEntity };
