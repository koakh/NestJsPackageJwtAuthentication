import { IsArray, IsOptional, IsUUID } from 'class-validator';

export class UpdateUserDto {
  @IsUUID()
  id: string;

  @IsArray()
  roles: string[];

  @IsOptional()
  metaDataInternal: any;
}
