import {
  IsEnum,
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Matches,
  IsJSON,
  IsUrl,
  IsISO8601,
  IsArray,
  ValidateNested,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

// enums
import { postType } from '../enums/postType.enum';
import { status } from '../enums/status.enum';

// dto
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    title: 'title',
    example: 'Awesome blog',
    type: 'string',
    description: 'title should have at least 4 characters',
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    title: 'postType',
    enum: postType,
    description: "postType must be the following: 'post', 'page', 'story', 'series'",
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    title: 'slug',
    example: 'my-blog-post',
    description: "For example: 'my-url'",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    message: "A slug should be all small letters and uses only '-' and without spaces. For example 'my-url'",
  })
  @MaxLength(256)
  slug: string;

  @ApiProperty({
    title: 'status',
    enum: status,
    description: "status must be the following: 'draft', 'scheduled', 'review', 'published'",
  })
  @IsEnum(status)
  @IsNotEmpty()
  status: status;

  @ApiPropertyOptional({
    title: 'content',
    example: 'The post content',
    description: 'This is the content of the post',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    title: 'schema',
    description: 'Serialize your JSON object else a validation error will be thrown',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    title: 'featuredImageUrl',
    description: 'Featured image for your blog post',
    example: 'http://localhost.com/images/image1.jpg',
  })
  @IsOptional()
  @IsUrl()
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'The date on which the blog post is published',
    example: '2024-03-16',
  })
  @IsOptional()
  @IsISO8601()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: 'Array of tags passed as string values',
    type: 'array',
    example: ['nestJs', 'typescript'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description: 'The key can be any string identifier for your meta option',
          example: 'sidebarEnabled',
        },
        value: {
          type: 'any',
          description: 'Any value that you want to save to the key',
          example: true,
        },
      },
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto[];
}
