export class Room {
  id: string;
  title: string;
  turns: number;
  ownerId?: string;
  isReveled: boolean;
  users: string[];
  issue: string;
  issues: string[];

  constructor({
    id,
    title,
    ownerId,
  }: {
    id: string;
    title: string;
    ownerId?: string;
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
