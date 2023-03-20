import { User } from 'src/entities/User';
import { UserRepository } from '../UserRepository';

export class InMemoryUserRepository extends UserRepository {
  private users: User[] = [];

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async saveUser(userData: User): Promise<User> {
    const userIdx = this.users.findIndex((user) => user.id === userData.id);

    if (userIdx !== -1) {
      this.users[userIdx] = {
        ...this.users[userIdx],
        ...userData,
      };
      return this.users[userIdx];
    }

    this.users.push(userData);
    return userData;
  }

  async getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async getUserBySocket(socketId: string) {
    return this.users.find((user) => user.socketId === socketId);
  }

  async remove(userId: string): Promise<void> {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      this.users = this.users.filter((u) => u.id !== userId);
    }
  }
}
