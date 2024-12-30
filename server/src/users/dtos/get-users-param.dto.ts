import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersParamDto {
  @ApiPropertyOptional({ description: 'Get user specific id', example: '1' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}

export type UsersParam = GetUsersParamDto;
