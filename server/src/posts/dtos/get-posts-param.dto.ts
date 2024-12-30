import { IsOptional, IsInt } from 'class-validator';

export class GetPostsParamDto {
  @IsOptional()
  @IsInt()
  userId?: number;
}
