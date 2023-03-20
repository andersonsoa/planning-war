import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsOptional()
  isSpectator?: boolean;

  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  avatarUrl?: string;

  @IsOptional()
  @IsNumberString()
  selectedCard?: string;
}
