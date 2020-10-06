import { IsDefined, IsEmail, IsOptional, IsUUID, MaxLength } from 'class-validator';

export class NewUserDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsDefined()
  @MaxLength(6)
  @MaxLength(20)
  username: string;

  @IsDefined()
  @MaxLength(6)
  @MaxLength(20)
  password: string;

  @IsDefined()
  @MaxLength(40)
  firstName: string;

  @IsDefined()
  @MaxLength(40)
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  metaData: any;
}
