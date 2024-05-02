import { Injectable } from '@nestjs/common';
import { UserServiceDB, User } from '../db/users';
import { getSalt, hashPassword } from '../helpers/hashPassword';
import Datastore from 'nedb-promises';
import fs from 'fs';

@Injectable()
export class UserService {
  private userServiceDB: UserServiceDB;
  private readonly db: Datastore<User>;

  constructor() {
    const dbPath = './users.db';
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, ''); // Crea un archivo vacío si no existe
    }
    this.db = Datastore.create({ filename: dbPath, autoload: true });
    this.userServiceDB = new UserServiceDB();
  }

  async createUser(user: { email: string; password: string }): Promise<User> {
    const { email, password } = user;
    if (!email || email.length < 5 || !email.includes('@')) {
      throw new Error('Invalid email');
    }
    const existing = await this.userServiceDB.findByEmail(email);
    if (existing) {
      throw new Error('User already exists');
    }
    if (!password || password.length < 8) {
      throw new Error('Password too short');
    }

    const salt = getSalt();
    const hash = hashPassword(salt + password);
    const newUser: User = { email, hash, salt };

    return this.userServiceDB.createUser(newUser);
  }

  async authenticateUser(user: { email: string; password: string }): Promise<{ email: string }> {
    const { email, password } = user;
    const existing = await this.userServiceDB.findByEmail(email);
    if (!existing) {
      throw new Error('User not found');
    }
    const hash = hashPassword(existing.salt + password);
    if (hash !== existing.hash) {
      throw new Error('Invalid password');
    }
    return { email: existing.email };
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userServiceDB.findByEmail(email);
  }
}
