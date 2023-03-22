import { Room } from 'src/entities/Room';
import { RoomRepository } from '../RoomRepository';

export class InMemoryRoomRepository extends RoomRepository {
  private roons: Room[] = [];

  async getRoons(): Promise<Room[]> {
    return this.roons;
  }

  async getRoomById(roomId?: string) {
    return this.roons.find((room) => room.id === roomId);
  }

  async saveRoom(roomData: Room): Promise<Room> {
    const roomAlreadyExistsIdx = this.roons.findIndex(
      (room) => room.id === roomData.id,
    );

    if (roomAlreadyExistsIdx !== -1) {
      this.roons[roomAlreadyExistsIdx] = {
        ...this.roons[roomAlreadyExistsIdx],
        ...roomData,
      };
      return this.roons[roomAlreadyExistsIdx];
    }

    this.roons.push(roomData);
    return roomData;
  }

  async removeRoom(roomId: string): Promise<void> {
    const roomExists = this.roons.find((room) => room.id === roomId);
    if (roomExists) {
      this.roons = this.roons.filter((room) => room.id !== roomId);
    }
  }

  async removeUserFromRoom(roomId: string, userId: string): Promise<void> {
    const roomIdx = this.roons.findIndex((room) => room.id === roomId);
    this.roons[roomIdx].users = this.roons[roomIdx].users.filter(
      (id) => id !== userId,
    );
  }
}
