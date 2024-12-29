import { IsEnum, IsString, IsDate, IsObject, IsNotEmpty, IsNotEmptyObject, IsOptional } from 'class-validator';

export enum PostType {
  post = 'post',
  page = 'page',
  story = 'story',
  series = 'series',
}

export enum Status {
  draft = 'draft',
  scheduled = 'scheduled',
  review = 'review',
  published = 'published',
}

export class PostPostsBodyDto {
  @IsEnum(PostType)
  postType: PostType;

  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  schema?: string;

  @IsOptional()
  @IsString()
  featuredImageUrl?: string;

  publishOn: Date;

  tags: string[];

  metaOptions: Record<string, string>[];
}
