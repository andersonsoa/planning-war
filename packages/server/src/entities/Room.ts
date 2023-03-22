export class Room {
  id: string;
  ownerId: string;
  title: string;
  turns: number;
  isReveled: boolean;
  users: string[];
  issue: string;
  issues: string[];

  constructor({
    id,
    ownerId,
    title,
  }: {
    id: string;
    ownerId: string;
    title: string;
  }) {
    this.id = id;
    this.title = title;
    this.ownerId = ownerId;
    this.turns = 0;
    this.isReveled = false;
    this.users = [];
    this.issue = '';
    this.issues = [];
  }
}
