import { Module } from '@nestjs/common';
import { HttpController } from './http.controller';
import { HttpService } from './http.service';
import { RoomRepository } from 'src/repositories/RoomRepository';
import { InMemoryRoomRepository } from 'src/repositories/implementations/InMemoryRoomRepository';
import { UserRepository } from 'src/repositories/UserRepository';
import { InMemoryUserRepository } from 'src/repositories/implementations/InMemoryUserRepository';
import { HttpGateway } from './http.gateway';

@Module({
  controllers: [HttpController],
  providers: [
    HttpService,
    HttpGateway,
    {
      provide: RoomRepository,
      useClass: InMemoryRoomRepository,
    },
    {
      provide: UserRepository,
      useClass: InMemoryUserRepository,
    },
  ],
})
export class HttpModule {}
