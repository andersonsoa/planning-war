import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { RoomRepository } from 'src/repositories/RoomRepository';
import { CreateRoomDTO } from './dto/createRoom.dto';
import { Room } from 'src/entities/Room';
import { User } from 'src/entities/User';
import { UserRepository } from 'src/repositories/UserRepository';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { nameGenerator } from 'src/utils/nameGenerator';

@Injectable()
export class HttpService {
  constructor(
    private roomRepository: RoomRepository,
    private userRepository: UserRepository,
  ) {}

  async createRoom(roomData: CreateRoomDTO) {
    const roomId = uuid();
    const userId = roomData.userId ?? uuid();

    const newRoom = new Room({
      id: roomId,
      ownerId: userId,
      title: roomData.title,
    });

    const newUser = new User({
      id: userId,
      name: nameGenerator(),
      socketId: roomData.socketId,
    });

    await this.userRepository.saveUser(newUser);
    await this.roomRepository.saveRoom(newRoom);

    return this.roomRepository.getRoomById(roomId);
  }

  async getUpdatedRoom(roomId: string) {
    const room = await this.roomRepository.getRoomById(roomId);
    if (!room) return;

    const users = [];
    for (const userId of room.users) {
      const user = await this.userRepository.getUserById(userId);
      users.push(user);
    }

    return {
      ...room,
      users,
    };
  }

  async joinRoom(data: { roomId: string; userSocketId: string }) {
    const room = await this.roomRepository.getRoomById(data.roomId);
    if (!room) return;

    let user = await this.userRepository.getUserBySocket(data.userSocketId);

    if (!user) {
      user = new User({
        id: uuid(),
        socketId: data.userSocketId,
        name: nameGenerator(),
      });
    }

    user.roomId = data.roomId;

    await this.userRepository.saveUser(user);

    room.users.push(user.id);
    await this.roomRepository.saveRoom(room);

    return user;
  }

  async revealRoom(roomId: string, userSocketId: string) {
    const user = await this.userRepository.getUserBySocket(userSocketId);
    if (!user) return null;
    const room = await this.roomRepository.getRoomById(roomId);
    if (!room) return null;

    if (user.roomId !== room.id) return null;

    room.isReveled = true;
    room.turns = room.turns + 1;

    await this.roomRepository.saveRoom(room);

    return room;
  }

  async newRound(roomId: string, userSocketId: string) {
    const user = await this.userRepository.getUserBySocket(userSocketId);
    if (!user) return null;
    const room = await this.roomRepository.getRoomById(roomId);
    if (!room) return null;

    if (user.roomId !== room.id) return null;

    room.isReveled = false;

    for (const userId of room.users) {
      const u = await this.userRepository.getUserById(userId);
      if (u) {
        u.selectedCard = '';
        await this.userRepository.saveUser(u);
      }
    }

    const newRoom = await this.roomRepository.saveRoom(room);

    return newRoom;
  }

  async removeUserFromRoom(userSocketId: string) {
    const user = await this.userRepository.getUserBySocket(userSocketId);
    if (!user) return null;

    await this.userRepository.remove(user.id);

    const room = await this.roomRepository.getRoomById(user.roomId);
    if (!room) return null;

    await this.roomRepository.removeUserFromRoom(room.id, user.id);

    if (room.users.length === 0) {
      await this.roomRepository.removeRoom(room.id);
      return null;
    }

    if (user.id === room.ownerId) {
      room.ownerId = room.users[0];
    }

    this.roomRepository.saveRoom(room);
    return this.getUpdatedRoom(room.id);
  }

  async userUpdate(data: UpdateUserDTO) {
    const userExists = await this.userRepository.getUserById(data.id);
    if (userExists) {
      const user = await this.userRepository.saveUser(data);
      return user;
    }
    return null;
  }

  async listRoons() {
    const roons = await this.roomRepository.getRoons();
    const users = await this.userRepository.getUsers();

    return { roons, users };
  }
}
