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
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

// enums
import { postType } from '../enums/postType.enum';
import { status } from '../enums/status.enum';

// dto
import { CreateMetaOptionsDto } from '../../meta-options/dtos/create-meta-options.dto';
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
  publishOn?: Date;

  @ApiPropertyOptional({
    description: 'Array of tags passed as integer id values',
    type: 'array',
    example: [1, 2],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  @ApiPropertyOptional({
    type: 'object',
    description: 'An object containing various properties, including metaOptions',
    properties: {
      metaValue: {
        type: 'string',
        description: 'A JSON string containing metadata options',
        example: '{"key1": "value1", "key2": 42}',
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMetaOptionsDto)
  metaOptions?: CreateMetaOptionsDto | null;

  @ApiProperty({
    name: 'authorId',
    type: 'integer',
    description: 'The id of the author of the post',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  authorId: number;
}
