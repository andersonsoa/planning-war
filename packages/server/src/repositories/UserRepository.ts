import { User } from 'src/entities/User';

export abstract class UserRepository {
  abstract saveUser(userData: Partial<User>): Promise<User>;
  abstract getUsers(): Promise<User[]>;
  abstract getUserById(id: string): Promise<User>;
  abstract getUserBySocket(socketId: string): Promise<User>;
  abstract remove(userId: string): Promise<void>;
}
