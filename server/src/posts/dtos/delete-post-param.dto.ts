import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class DeletePostParamDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
