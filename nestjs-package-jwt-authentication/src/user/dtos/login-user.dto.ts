import { IsDefined, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsDefined()
  @MaxLength(6)
  @MaxLength(20)
  username: string;

  @IsDefined()
  @MaxLength(6)
  @MaxLength(20)
  password: string;
}
