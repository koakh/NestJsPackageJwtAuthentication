import { IsArray, IsDefined, IsEmail, IsNumber, IsObject, IsOptional, IsUUID, Length, MaxLength } from 'class-validator';

export class User {
  @IsDefined()
  @IsUUID()
  id: string;

  @IsDefined()
  @Length(4,20)
  username: string;

  @IsDefined()
  @Length(4,20)
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

  @IsArray()
  roles?: string[];

  @IsDefined()
  @IsNumber()
  createdDate: number;

  @IsOptional()
  @IsObject()
  metaData?: any;
}
