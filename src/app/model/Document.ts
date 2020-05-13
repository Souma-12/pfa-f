import { AbstractEntity } from './AbstractEntity';

export class Document extends AbstractEntity{
    
	type;
	mimeType;
	filename;
	content;
}