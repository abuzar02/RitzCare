import { MongoClient } from "mongodb";
let client: Promise<MongoClient> | undefined;
export const isDbConfigured = () => Boolean(process.env.MONGODB_URI);
export function getClient() {
  if (!client) client = new MongoClient(process.env.MONGODB_URI as string).connect();
  return client;
}
