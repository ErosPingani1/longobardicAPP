import { MailboxStatus } from './mailbox-status';

export class GetStatusResponse {
    status: string;
    message: string;
    mailboxStatus: MailboxStatus;
}