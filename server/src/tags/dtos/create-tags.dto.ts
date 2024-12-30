import { IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * CreateTag Data transfer object
 * @class
 * */
export class CreateTagDto {
  @ApiProperty({
    name: 'name',
    type: 'string',
    description: 'Tag name',
    example: 'NestJS',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    name: 'slug',
    type: 'string',
    description: 'Tag slug',
    example: 'https://nestjs.com/',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  slug: string;

  @ApiPropertyOptional({
    name: 'description',
    type: 'string',
    description: 'Tag description',
    example: 'Tag description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    name: 'schema',
    type: 'string',
    description: 'Tag Json schema',
    example: '{"type": "object"}',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    name: 'featuredImageUrl',
    type: 'string',
    description: 'Add Image url for your blog post',
    example: 'https://image-url.png',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;
}
