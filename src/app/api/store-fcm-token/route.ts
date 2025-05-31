import { NextResponse } from 'next/server';
import { getFcmTokensCollection, FcmTokenDoc } from '@/lib/mongodb'; // Adjust path if needed

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

    // Standardize userId: use a default for guests or ensure it's a string.
    const userId = (typeof rawUserId === 'string' && rawUserId.trim() !== "") ? rawUserId.trim() : 'anonymous_guest';

    console.log(`Processing token for UserID: '${userId}', Token: '${token.substring(0, 20)}...'`);

    const fcmTokensCollection = await getFcmTokensCollection();
    const now = new Date();

    // Option 1: Each token is a separate document, linked to a user.
    // This makes it easy to manage individual token staleness and uniqueness per device.
    // Using upsert: true will create the document if it doesn't exist, or update it if it does.
    // The filter targets a specific token for a specific user (or guest group).
    const filter = { userId: userId, token: token };
    const updateDoc: Partial<FcmTokenDoc> = {
      $set: { // Fields to set if document exists or is created
        userId: userId,
        token: token,
        lastSeen: now,
      },
      $setOnInsert: { // Fields to set only if document is newly created (upserted)
        createdAt: now,
      }
    };

    const result = await fcmTokensCollection.updateOne(filter, updateDoc, { upsert: true });

    if (result.upsertedCount > 0) {
      console.log(`New FCM token stored for userId '${userId}'. MongoDB _id: ${result.upsertedId}`);
    } else if (result.modifiedCount > 0) {
      console.log(`Existing FCM token updated for userId '${userId}'.`);
    } else if (result.matchedCount > 0) {
      console.log(`FCM token for userId '${userId}' already exists and was touched (lastSeen updated).`);
    } else {
       console.warn(`FCM token for userId '${userId}' - no change in DB, but request was processed. Matched: ${result.matchedCount}`);
    }

    return NextResponse.json({ message: 'FCM token processed successfully.' }, { status: 200 });

  } catch (error: any) {
    console.error('Error in /api/store-fcm-token route:', error);
    let errorMessage = 'Internal server error.';
    let statusCode = 500;

    if (error instanceof SyntaxError) {
      errorMessage = 'Invalid JSON in request body.';
      statusCode = 400;
    } else if (error.name === 'MongoNetworkError' || error.name === 'MongoServerSelectionError') {
      errorMessage = 'Database connection error.';
      // Potentially log more details for server admin but don't expose to client
    } else {
       // For other errors, you might not want to expose error.message directly
       // errorMessage = error.message || 'An unexpected error occurred.';
    }

    return NextResponse.json({ message: errorMessage, details: (process.env.NODE_ENV === 'development' ? error.message : undefined) }, { status: statusCode });
  }
}