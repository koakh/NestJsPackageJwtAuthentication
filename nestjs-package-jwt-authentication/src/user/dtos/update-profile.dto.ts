import { IsArray, IsDefined, IsEmail, IsOptional, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsDefined()
  @MaxLength(40)
  firstName: string;

  @IsDefined()
  @MaxLength(40)
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
