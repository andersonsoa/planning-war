export class User {
  id: string;
  socketId: string;
  roomId?: string;
  isSpectator: boolean;
  name: string;
  avatarUrl?: string;
  selectedCard?: string;

  constructor({
    id,
    socketId,
    roomId,
    name,
  }: {
    id: string;
    socketId: string;
    roomId?: string;
    name: string;
  }) {
    this.id = id;
    this.name = name;
    this.roomId = roomId;
    this.socketId = socketId;
    this.isSpectator = false;
    this.avatarUrl = '';
    this.selectedCard = '';
  }
}
