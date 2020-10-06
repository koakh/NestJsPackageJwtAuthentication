import { Max, Min } from 'class-validator';

export class PaginationArgs {
  @Min(0)
  skip: number = 0;

  @Min(1)
  @Max(50)
  take: number = 25;
}
