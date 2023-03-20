import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoomDTO {
  @IsNotEmpty({ message: 'Informe um nome para sua sala!' })
  title: string;

  @IsNotEmpty({ message: 'Informe o dono da sala!' })
  socketId: string;

  @IsNotEmpty({ message: 'Informe um nome para sua sala!' })
  userName: string;

  @IsOptional()
  userId?: string;
}
