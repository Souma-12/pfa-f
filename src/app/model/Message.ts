import { AbstractEntity } from './AbstractEntity';

export class Message extends AbstractEntity{
    status;
    message;
    readAt;
    sender;
    receiver;
}