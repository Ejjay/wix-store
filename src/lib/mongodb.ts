import { MongoClient, Db, Collection } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'yourDatabaseName'; // Or get from env

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local or your hosting provider');
}
if (!MONGODB_DB_NAME && process.env.NODE_ENV !== 'test') { // Allow test env to skip db name for mock setups
  console.warn('MONGODB_DB_NAME environment variable is not set. Using a default or potentially failing.');
}


// Enhance the global type to allow caching the MongoDB client
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
    console.log("MongoDB client initialized for development.");
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
  console.log("MongoDB client initialized for production.");
}

/**
 * Gets a reference to the MongoDB database.
 * @returns {Promise<Db>} A promise that resolves to the Db instance.
 */
export async function getDb(): Promise<Db> {
  const mongoClient = await clientPromise;
  return mongoClient.db(MONGODB_DB_NAME);
}

/**
 * Type for FCM Token documents in MongoDB.
 */
export interface FcmTokenDoc {
  _id?: any; // MongoDB will generate this if not provided
  userId: string; // Can be a user ID or a special identifier like 'guest'
  token: string;
  createdAt: Date;
  lastSeen: Date;
  // You could add more fields like deviceInfo, platform, etc.
}

/**
 * Gets a reference to the 'fcmTokens' collection.
 * @returns {Promise<Collection<FcmTokenDoc>>} A promise that resolves to the Collection instance.
 */
export async function getFcmTokensCollection(): Promise<Collection<FcmTokenDoc>> {
  const db = await getDb();
  // It's good practice to create indexes for fields you query often.
  // This ensures the index exists; it's idempotent.
  // You might want to run this once during app setup or use a migration tool.
  try {
    await db.collection<FcmTokenDoc>('fcmTokens').createIndex({ userId: 1 });
    await db.collection<FcmTokenDoc>('fcmTokens').createIndex({ token: 1 }, { unique: true }); // Ensures tokens are unique globally
    await db.collection<FcmTokenDoc>('fcmTokens').createIndex({ userId: 1, token: 1 }, { unique: true }); // Composite unique index
  } catch (indexError) {
    // console.warn("MongoDB index creation might have failed (could be because it already exists):", indexError);
  }
  return db.collection<FcmTokenDoc>('fcmTokens');
}

// Export the client promise if you need to use it directly elsewhere (e.g., for transactions or advanced features)
export { clientPromise as mongoClientPromise };

// MongoDB env
// username: ejalloso021
// password: COWy7zU2dbqzW3Rn