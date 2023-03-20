import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { HttpService } from './http.service';
import { UpdateUserDTO } from './dto/updateUser.dto';

@WebSocketGateway({ cors: '*' })
export class HttpGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private httpService: HttpService) {}

  async handleConnection(client: Socket) {
    console.log('[room-gateway] connected', client.id);
  }
  async handleDisconnect(client: Socket) {
    console.log('[room-gateway] disconnected', client.id);
    const room = await this.httpService.removeUserFromRoom(client.id);

    if (room) {
      this.server.to(room.id).emit('room:updated', room);
    }
  }

  @SubscribeMessage('user:join')
  async onUserJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { roomId: string },
  ) {
    const user = await this.httpService.joinRoom({
      roomId: data.roomId,
      userSocketId: client.id,
    });

    if (user) {
      client.join(data.roomId);
      client.emit('user:me', user);

      const updatedRoom = await this.httpService.getUpdatedRoom(data.roomId);

      this.server.to(data.roomId).emit('room:updated', updatedRoom);

      return;
    }
    client.emit('room:not-found');
  }

  @SubscribeMessage('user:update')
  async onUserUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: UpdateUserDTO,
  ) {
    const user = await this.httpService.userUpdate(data);
    if (user) {
      const room = await this.httpService.getUpdatedRoom(user.roomId);
      client.emit('user:me', user);
      this.server.to(room.id).emit('room:updated', room);
    }
  }

  @SubscribeMessage('room:update')
  async onRoonUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    client.emit('hello', data);
  }

  @SubscribeMessage('room:reveal')
  async onRoonReveled(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    const room = await this.httpService.revealRoom(data, client.id);

    if (room) {
      const updatedRoom = await this.httpService.getUpdatedRoom(room.id);
      this.server.to(room.id).emit('room:updated', updatedRoom);
    }
  }

  @SubscribeMessage('room:new-round')
  async onRoonNewRound(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    const room = await this.httpService.newRound(data, client.id);

    if (room) {
      const updatedRoom = await this.httpService.getUpdatedRoom(room.id);
      this.server.to(room.id).emit('room:updated', updatedRoom);
      for (const updatedUser of updatedRoom.users) {
        this.server.to(updatedUser.socketId).emit('user:me', updatedUser);
      }
    }
  }
}
