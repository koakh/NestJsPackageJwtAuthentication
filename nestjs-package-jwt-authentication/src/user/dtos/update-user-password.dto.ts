import { IsDefined, IsUUID, Length, MaxLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsDefined()
  @IsUUID()
  id: string;

  @IsDefined()
  @Length(4,20)
  password: string;
}
