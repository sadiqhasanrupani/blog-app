import { postType } from '../enums/postType.enum';
import { status } from '../enums/status.enum';
import { CreatePostMetaOptionsDto } from './create-post-meta-options.dto';
export declare class CreatePostDto {
    title: string;
    postType: postType;
    slug: string;
    status: status;
    content?: string;
    schema?: string;
    featuredImageUrl?: string;
    publishOn?: Date;
    tags?: string[];
    metaOptions?: CreatePostMetaOptionsDto[];
}
