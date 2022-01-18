import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';

export type DbClient = mongoose.Mongoose;

export const MongoInjectionJest = {
  user: null as unknown as DbClient,
  serverUri: '' as string,
  async createServer(): Promise<string> {
    if (this.serverUri) return this.serverUri;
    const mongoServer = await MongoMemoryServer.create();
    this.serverUri = mongoServer.getUri();
    return this.serverUri;
  },
  async connect(): Promise<void> {
    await this.createServer();
    this.client = await mongoose.connect(this.serverUri, {
      autoIndex: true,
    });
  },
  async disconnect(): Promise<void> {
    this.serverUri = null;
    if (this.client) this.client.connection.close();
  },
};
