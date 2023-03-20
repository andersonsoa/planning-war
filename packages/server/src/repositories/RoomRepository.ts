import { Room } from 'src/entities/Room';

export abstract class RoomRepository {
  abstract getRoons(): Promise<Room[]>;
  abstract getRoomById(roomId: string): Promise<Room>;
  abstract saveRoom(roomData: Room): Promise<Room>;
  abstract removeRoom(roomId: string): Promise<void | undefined>;
  abstract removeUserFromRoom(roomId: string, userId: string): Promise<void>;
}
