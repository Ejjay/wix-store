// src/components/FirebaseNotificationsInitializer.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import {
  retrieveFCMTokenFromDevice,
  sendTokenToYourBackend,
  // subscribeToFCCTopicOnDevice // Import if you want to auto-subscribe
} from "@/lib/firebase-notifications"; // Adjust path if needed

export default function FirebaseNotificationsInitializer() {
  const [isFcmInitialized, setIsFcmInitialized] = useState(false);
  const initializationAttempted = useRef(false); // Prevents multiple initialization attempts

  useEffect(() => {
    // Check if running in a browser environment and initialization hasn't been attempted
    if (typeof window !== "undefined" && !initializationAttempted.current) {
      initializationAttempted.current = true; // Mark that an attempt is being made

      const initializeFCM = async () => {
        console.log("FirebaseNotificationsInitializer: Attempting FCM initialization...");

        // Check for the webtonative specific function more reliably
        const webtonativeMessaging = (window as any).webtonative?.Firebase?.Messaging;
        if (webtonativeMessaging && typeof webtonativeMessaging.getFCMToken === 'function') {
          console.log("WebToNative Firebase Messaging API detected.");
          try {
            const token = await retrieveFCMTokenFromDevice();
            if (token) {
              await sendTokenToYourBackend(token);
              setIsFcmInitialized(true); // Mark as successfully initialized
              console.log("FirebaseNotificationsInitializer: FCM initialized and token processed.");

              // Example: Auto-subscribe to a general topic after successful initialization
              // Consider user preferences before automatically subscribing.
              // await subscribeToFCCTopicOnDevice("general-updates");

            } else {
              console.warn("FirebaseNotificationsInitializer: FCM token retrieval returned null or failed.");
            }
          } catch (error) {
            console.error("FirebaseNotificationsInitializer: Failed to initialize FCM:", error);
          }
        } else {
          console.log("FirebaseNotificationsInitializer: WebToNative Firebase Messaging API not available. This is expected in a standard web browser.");
        }
      };

      // The webtonative bridge might need a moment to be available after the webview loads.
      // If webtonative provides a 'ready' event, that would be ideal.
      // Otherwise, a small delay can be a pragmatic approach.
      const initDelay = setTimeout(initializeFCM, 2500); // Adjust delay if testing shows it's needed

      return () => clearTimeout(initDelay); // Cleanup on component unmount
    }
  }, []); // Empty dependency array ensures this runs once after initial render

  if (isFcmInitialized) {
    console.log("FirebaseNotificationsInitializer: FCM setup complete.");
  }

  return null; // This component does not render any UI
}