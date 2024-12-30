import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

import { CreatePostDto } from './create-post.dto';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    title: 'id',
    type: 'integer',
    description: "The 'id' of the post that needed to update",
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
