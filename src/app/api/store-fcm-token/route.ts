import { NextResponse } from 'next/server';
import { getFcmTokensCollection, FcmTokenDoc } from '@/lib/mongodb'; // Adjust path if needed
import { UpdateFilter } from 'mongodb'; // Import UpdateFilter type

interface StoreTokenRequestBody {
  token: string;
  userId?: string | null;
}

export async function POST(request: Request) {
  console.log('API POST /api/store-fcm-token called');
  try {
    const body = await request.json() as StoreTokenRequestBody;
    const { token, userId: rawUserId } = body;

    if (!token || typeof token !== 'string' || token.trim() === "") {
      console.warn('Invalid FCM token received:', token);
      return NextResponse.json({ message: 'FCM token is required and must be a non-empty string.' }, { status: 400 });
    }

    const userId = (typeof rawUserId === 'string' && rawUserId.trim() !== "") ? rawUserId.trim() : 'anonymous_guest';

    console.log(`Processing token for UserID: '${userId}', Token: '${token.substring(0, 20)}...'`);

    const fcmTokensCollection = await getFcmTokensCollection();
    const now = new Date();

    // Define the filter to find the document (or create if it doesn't exist with upsert)
    const filter = { userId: userId, token: token };

    // Define the update operation using MongoDB operators
    // This structure is what the MongoDB driver expects for an update operation
    const updateDoc: UpdateFilter<FcmTokenDoc> = {
      $set: { // Fields to set if document exists or is created/updated
        userId: userId, // Ensure userId is set or updated
        token: token,   // Ensure token is set or updated (though it's in the filter)
        lastSeen: now,
      },
      $setOnInsert: { // Fields to set only if a new document is inserted
        createdAt: now,
      }
    };

    const result = await fcmTokensCollection.updateOne(filter, updateDoc, { upsert: true });

    if (result.upsertedCount > 0) {
      console.log(`New FCM token stored for userId '${userId}'. MongoDB _id: ${result.upsertedId}`);
    } else if (result.modifiedCount > 0) {
      console.log(`Existing FCM token's lastSeen updated for userId '${userId}'.`);
    } else if (result.matchedCount > 0) {
      console.log(`FCM token for userId '${userId}' already exists and 'lastSeen' was likely already current.`);
    } else {
       // This case should ideally not happen with upsert:true if the filter is correct
       // and would imply an issue if no match, no modification, and no upsert occurred.
       // However, if matchedCount > 0 and modifiedCount === 0, it means the document exists
       // and its lastSeen was already 'now' (highly unlikely with precise timestamps but possible).
       console.warn(`FCM token for userId '${userId}' - MongoDB reported no change. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}, Upserted: ${result.upsertedCount}`);
    }

    return NextResponse.json({ message: 'FCM token processed successfully.' }, { status: 200 });

  } catch (error: any) {
    console.error('Error in /api/store-fcm-token route:', error);
    let errorMessage = 'Internal server error.';
    let statusCode = 500;

    if (error instanceof SyntaxError) { // JSON parsing error
      errorMessage = 'Invalid JSON in request body.';
      statusCode = 400;
    } else if (error.name === 'MongoNetworkError' || error.name === 'MongoServerSelectionError') {
      errorMessage = 'Database connection error.';
    } else if (error.code === 11000) { // MongoDB duplicate key error
        console.warn('Attempted to insert a duplicate token, which should ideally be handled by upsert logic. Check indexes.', error.message)
        // This usually means the unique index on (userId, token) or just (token) is working.
        // The upsert should ideally prevent this from being a thrown error in this flow,
        // as it would update the existing one. If it still errors, there might be a race condition
        // or an issue with how the filter and update are constructed vs. the index.
        // For a unique index on 'token' alone, if another user already has this token, this would be an issue.
        // The current logic with `filter = { userId: userId, token: token }` and a unique index on `(userId, token)` is safer.
        // If the unique index is ONLY on `token`, then this code might fail if the token is already globally unique by another user.
        // If that's the case and tokens must be globally unique, the logic needs to handle it or the index needs to be on (userId, token).
        // Assuming unique index on (userId, token) or just (token), and upsert handles it.
        // If a unique index on just `token` is causing an error here despite upsert,
        // it means the `token` exists but for a *different* `userId` or no `userId`
        // and your business logic needs to decide how to handle that.
        // For now, let's assume the upsert is on (userId, token) or that such conflicts are rare.
        errorMessage = "FCM token conflict. It might already be registered.";
        statusCode = 409; // Conflict
    }

    return NextResponse.json({ message: errorMessage, details: (process.env.NODE_ENV === 'development' ? error.message : undefined) }, { status: statusCode });
  }
}