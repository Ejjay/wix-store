import { getFCMToken, subscribe, unsubscribe } from "webtonative/Firebase/Messaging";
import { getLoggedInMember } from "@/wix-api/members";
import { wixBrowserClient } from "@/lib/wix-client.browser";

// Check for webtonative environment once and store it.
// This check might need adjustment if webtonative initializes its bridge later than the initial script load.
const IS_WEBTONATIVE_ENV = typeof window !== 'undefined' &&
                           typeof (window as any).webtonative === 'object' &&
                           (window as any).webtonative !== null &&
                           typeof (window as any).webtonative.Firebase === 'object' &&
                           (window as any).webtonative.Firebase !== null &&
                           typeof (window as any).webtonative.Firebase.Messaging === 'object' &&
                           (window as any).webtonative.Firebase.Messaging !== null &&
                           typeof (window as any).webtonative.Firebase.Messaging.getFCMToken === 'function';

if (typeof window !== 'undefined') {
  console.log(`[Debug] IS_WEBTONATIVE_ENV check: ${IS_WEBTONATIVE_ENV}`);
  if (!(window as any).webtonative) console.log("[Debug] window.webtonative is not defined");
  else if (!(window as any).webtonative.Firebase) console.log("[Debug] window.webtonative.Firebase is not defined");
  else if (!(window as any).webtonative.Firebase.Messaging) console.log("[Debug] window.webtonative.Firebase.Messaging is not defined");
  else if (typeof (window as any).webtonative.Firebase.Messaging.getFCMToken !== 'function') console.log("[Debug] getFCMToken is not a function on Messaging object");
}


/**
 * Retrieves the FCM token using the webtonative bridge.
 * Returns null if not in the webtonative environment or if an error occurs.
 * @returns {Promise<string | null>} A promise that resolves with the FCM token or null.
 */
export const retrieveFCMTokenFromDevice = (): Promise<string | null> => {
  return new Promise((resolve) => {
    // Alert to indicate the function is being called within the APK environment
    if (typeof window !== 'undefined' && (window as any).webtonative) {
        alert("[Debug] retrieveFCMTokenFromDevice called. IS_WEBTONATIVE_ENV: " + IS_WEBTONATIVE_ENV);
    }


    if (!IS_WEBTONATIVE_ENV) {
      const notInEnvMsg = "Not in WebToNative environment or API not ready. Skipping FCM token retrieval.";
      console.log(notInEnvMsg);
      if (typeof window !== 'undefined' && (window as any).webtonative) alert("[Debug] " + notInEnvMsg); // Alert if webtonative object exists but check failed
      resolve(null);
      return;
    }

    try {
      alert("[Debug] Calling webtonative.getFCMToken..."); // Alert before the actual call
      getFCMToken({
        callback: function(data: { token?: string; error?: string; message?: string }) {
          if (data.token) {
            alert("[Debug] FCM Token SUCCESS: " + data.token.substring(0, 70) + "..."); // Display part of the token
            console.log("WebToNative: FCM Token received:", data.token);
            resolve(data.token);
          } else {
            const errorMessage = data.error || data.message || "Unknown error retrieving FCM token via webtonative";
            alert("[Debug] FCM Token ERROR: " + errorMessage); // Display error
            console.error("WebToNative: Error retrieving FCM token:", errorMessage);
            resolve(null);
          }
        }
      });
    } catch (error: any) {
      const exceptionMessage = "Exception caught: " + (error?.message || String(error));
      alert("[Debug] Exception in getFCMToken call: " + exceptionMessage.substring(0, 100)); // Display exception
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
    alert("[Debug Backend] No token to send to backend."); // Alert if no token
    return;
  }

  let userId: string | null = 'guest_user'; // Default for anonymous users
  try {
    const member = await getLoggedInMember(wixBrowserClient); //
    if (member?._id) {
      userId = member._id;
    }
  } catch (error) {
    console.warn("sendTokenToYourBackend: Could not retrieve logged-in member for FCM token, defaulting to guest. Error:", error);
    alert("[Debug Backend] Error getting member ID: " + String(error).substring(0, 50));
  }

  const attemptMsg = `Attempting to send FCM token to backend. UserID: ${userId}`;
  console.log(attemptMsg);
  alert("[Debug Backend] " + attemptMsg);


  try {
    const response = await fetch('/api/store-fcm-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, userId }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      const backendErrorMsg = `Failed to send FCM token to backend. Status: ${response.status}, Response: ${errorData.substring(0,100)}`;
      console.error(backendErrorMsg);
      alert("[Debug Backend] " + backendErrorMsg);
      throw new Error(`Backend token storage failed: ${response.status}`);
    }

    const responseData = await response.json();
    const successMsg = 'FCM token sent to backend successfully: ' + responseData.message;
    console.log(successMsg);
    alert("[Debug Backend] " + successMsg);
  } catch (error) {
    const catchErrorMsg = 'Error in sendTokenToYourBackend: ' + String(error).substring(0,100);
    console.error(catchErrorMsg);
    alert("[Debug Backend] " + catchErrorMsg);
  }
};

/**
 * Subscribes the device to a specific FCM topic using webtonative.
 * @param {string} topicName - The name of the topic to subscribe to.
 */
export const subscribeToFCCTopicOnDevice = async (topicName: string): Promise<void> => {
  if (typeof window !== 'undefined' && (window as any).webtonative) {
      alert("[Debug] subscribeToFCCTopicOnDevice called for: " + topicName);
  }

  if (!IS_WEBTONATIVE_ENV) {
    console.log("Not in WebToNative environment. Skipping topic subscription:", topicName);
    return;
  }
  if (!topicName || typeof topicName !== 'string' || topicName.trim() === "") {
    console.warn("subscribeToFCCTopicOnDevice: Invalid topic name provided.");
    alert("[Debug] Invalid topic name for subscription: " + topicName);
    return;
  }

  try {
    alert("[Debug] Calling webtonative.subscribe for topic: " + topicName);
    subscribe({
      toTopic: topicName
    });
    console.log(`WebToNative: Attempted subscription to FCM topic: ${topicName}`);
    alert("[Debug] Subscription call made for topic: " + topicName);
  } catch (error: any) {
    const subErrorMsg = `Error subscribing to FCM topic "${topicName}": ` + (error?.message || String(error));
    console.error(`WebToNative: ${subErrorMsg}`);
    alert("[Debug] " + subErrorMsg.substring(0,100));
  }
};

/**
 * Unsubscribes the device from a specific FCM topic using webtonative.
 * @param {string} topicName - The name of the topic to unsubscribe from.
 */
export const unsubscribeFromFCCTopicOnDevice = async (topicName: string): Promise<void> => {
   if (typeof window !== 'undefined' && (window as any).webtonative) {
      alert("[Debug] unsubscribeFromFCCTopicOnDevice called for: " + topicName);
  }

  if (!IS_WEBTONATIVE_ENV) {
    console.log("Not in WebToNative environment. Skipping topic unsubscription:", topicName);
    return;
  }
   if (!topicName || typeof topicName !== 'string' || topicName.trim() === "") {
    console.warn("unsubscribeFromFCCTopicOnDevice: Invalid topic name provided.");
    alert("[Debug] Invalid topic name for unsubscription: " + topicName);
    return;
  }

  try {
    alert("[Debug] Calling webtonative.unsubscribe for topic: " + topicName);
    unsubscribe({
      fromTopic: topicName
    });
    console.log(`WebToNative: Attempted unsubscription from FCM topic: ${topicName}`);
    alert("[Debug] Unsubscription call made for topic: " + topicName);
  } catch (error: any) {
    const unsubErrorMsg = `Error unsubscribing from FCM topic "${topicName}": ` + (error?.message || String(error));
    console.error(`WebToNative: ${unsubErrorMsg}`);
    alert("[Debug] " + unsubErrorMsg.substring(0,100));
  }
};
