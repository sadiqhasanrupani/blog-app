import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsJSON } from 'class-validator';

/**
 * CreatePost Data transfer object
 * @class
 * */
export class CreatePostMetaOptionsDto {
  @ApiProperty({
    name: 'metaValue',
    type: 'string',
    description: 'Meta value',
  })
  @IsJSON()
  @IsNotEmpty()
  metaValue: string;
}
