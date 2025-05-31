import { getFCMToken, subscribe, unsubscribe } from "webtonative/Firebase/Messaging";
import { getLoggedInMember } from "@/wix-api/members";
import { wixBrowserClient } from "@/lib/wix-client.browser";

const IS_WEBTONATIVE_ENV = typeof window !== 'undefined' && typeof (window as any).webtonative?.Firebase?.Messaging?.getFCMToken === 'function';

/**
 * Retrieves the FCM token using the webtonative bridge.
 * Returns null if not in the webtonative environment or if an error occurs.
 * @returns {Promise<string | null>} A promise that resolves with the FCM token or null.
 */
export const retrieveFCMTokenFromDevice = (): Promise<string | null> => {
  return new Promise((resolve) => {
    if (!IS_WEBTONATIVE_ENV) {
      console.log("Not in WebToNative environment. Skipping FCM token retrieval.");
      resolve(null);
      return;
    }

    try {
      getFCMToken({
        callback: function(data: { token?: string; error?: string; message?: string }) {
          if (data.token) {
            console.log("WebToNative: FCM Token received:", data.token);
            resolve(data.token);
          } else {
            const errorMessage = data.error || data.message || "Unknown error retrieving FCM token via webtonative";
            console.error("WebToNative: Error retrieving FCM token:", errorMessage);
            resolve(null);
          }
        }
      });
    } catch (error) {
      console.error("WebToNative: Exception caught during getFCMToken call:", error);
      resolve(null); // Resolve with null on exception
    }
  });
};

/**
 * Sends the FCM token to your backend server.
 * @param {string} token - The FCM token.
 */
export const sendTokenToYourBackend = async (token: string): Promise<void> => {
  if (!token) {
    console.warn("sendTokenToYourBackend: No token provided.");
    return;
  }

  let userId: string | null = 'guest_user'; // Default for anonymous users
  try {
    const member = await getLoggedInMember(wixBrowserClient);
    if (member?._id) {
      userId = member._id;
    }
  } catch (error) {
    console.warn("sendTokenToYourBackend: Could not retrieve logged-in member for FCM token, defaulting to guest. Error:", error);
  }

  console.log(`Attempting to send FCM token to backend. Token: ${token.substring(0,20)}..., UserID: ${userId}`);

  try {
    const response = await fetch('/api/store-fcm-token', { // Your backend endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, userId }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Failed to send FCM token to backend. Status: ${response.status}, Response: ${errorData}`);
      throw new Error(`Backend token storage failed: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('FCM token sent to backend successfully:', responseData.message);
  } catch (error) {
    console.error('Error in sendTokenToYourBackend:', error);
    // Optionally, implement retry logic or further error handling
  }
};

/**
 * Subscribes the device to a specific FCM topic using webtonative.
 * @param {string} topicName - The name of the topic to subscribe to.
 */
export const subscribeToFCCTopicOnDevice = async (topicName: string): Promise<void> => {
  if (!IS_WEBTONATIVE_ENV) {
    console.log("Not in WebToNative environment. Skipping topic subscription:", topicName);
    return;
  }
  if (!topicName || typeof topicName !== 'string' || topicName.trim() === "") {
    console.warn("subscribeToFCCTopicOnDevice: Invalid topic name provided.");
    return;
  }

  try {
    // webtonative's subscribe function might not return a promise or have a callback for success/failure
    // We'll assume it's synchronous or fire-and-forget based on their docs
    subscribe({
      toTopic: topicName
    });
    console.log(`WebToNative: Attempted subscription to FCM topic: ${topicName}`);
  } catch (error) {
    console.error(`WebToNative: Error subscribing to FCM topic "${topicName}":`, error);
  }
};

/**
 * Unsubscribes the device from a specific FCM topic using webtonative.
 * @param {string} topicName - The name of the topic to unsubscribe from.
 */
export const unsubscribeFromFCCTopicOnDevice = async (topicName: string): Promise<void> => {
  if (!IS_WEBTONATIVE_ENV) {
    console.log("Not in WebToNative environment. Skipping topic unsubscription:", topicName);
    return;
  }
   if (!topicName || typeof topicName !== 'string' || topicName.trim() === "") {
    console.warn("unsubscribeFromFCCTopicOnDevice: Invalid topic name provided.");
    return;
  }

  try {
    unsubscribe({
      fromTopic: topicName
    });
    console.log(`WebToNative: Attempted unsubscription from FCM topic: ${topicName}`);
  } catch (error) {
    console.error(`WebToNative: Error unsubscribing from FCM topic "${topicName}":`, error);
  }
};