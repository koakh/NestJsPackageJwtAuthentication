import { IsDefined, IsUUID, MaxLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsDefined()
  @IsUUID()
  id: string;

  @IsDefined()
  @MaxLength(6)
  @MaxLength(20)
  password: string;
}
