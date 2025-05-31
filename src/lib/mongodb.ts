import { MongoClient, Db, Collection } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'webtonative-wixstore-pushNotifications';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local or your hosting provider');
}
if (!MONGODB_DB_NAME && process.env.NODE_ENV !== 'test') {
  console.warn('MONGODB_DB_NAME environment variable is not set. Using a default or potentially failing.');
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
    console.log("MongoDB client initialized for development.");
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
  console.log("MongoDB client initialized for production.");
}

export async function getDb(): Promise<Db> {
  const mongoClient = await clientPromise;
  return mongoClient.db(MONGODB_DB_NAME);
}

export interface FcmTokenDoc {
  _id?: any;
  userId: string;
  token: string;
  createdAt: Date;
  lastSeen: Date;
}

export async function getFcmTokensCollection(): Promise<Collection<FcmTokenDoc>> {
  const db = await getDb();

  try {
    await db.collection<FcmTokenDoc>('fcmTokens').createIndex({ userId: 1 });
    await db.collection<FcmTokenDoc>('fcmTokens').createIndex({ userId: 1, token: 1 }, { unique: true });
  } catch (indexError) {
    console.warn("MongoDB index creation might have failed (could be because it already exists):", indexError);
  }

  return db.collection<FcmTokenDoc>('fcmTokens');
}

export { clientPromise as mongoClientPromise };