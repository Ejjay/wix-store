declare module 'webtonative/Firebase/Messaging' {
  interface FCMTokenCallbackData {
    token?: string;
    error?: string;
    message?: string; // To cover potential variations in error reporting
  }

  interface FCMTokenOptions {
    callback: (data: FCMTokenCallbackData) => void;
  }

  interface SubscribeOptions {
    toTopic: string;
    // The docs don't show a callback for subscribe/unsubscribe,
    // but if webtonative adds one, you can define it here.
    // callback?: (response: { success?: boolean; message?: string; error?: string }) => void;
  }

  interface UnsubscribeOptions {
    fromTopic: string;
    // callback?: (response: { success?: boolean; message?: string; error?: string }) => void;
  }

  /**
   * Retrieves the FCM token.
   */
  export function getFCMToken(options: FCMTokenOptions): void;

  /**
   * Subscribes to a specific FCM topic.
   */
  export function subscribe(options: SubscribeOptions): void;

  /**
   * Unsubscribes from a specific FCM topic.
   */
  export function unsubscribe(options: UnsubscribeOptions): void;
}

// This part is for type-checking the global window.webtonative object if you use it directly
// It helps with the check: (window as any).webtonative?.Firebase?.Messaging?.getFCMToken === 'function'
// in FirebaseNotificationsInitializer.tsx by providing type hints.
interface WebToNativeFirebaseMessaging {
  getFCMToken: (options: { callback: (data: { token?: string; error?: string; message?: string }) => void }) => void;
  subscribe: (options: { toTopic: string }) => void;
  unsubscribe: (options: { fromTopic: string }) => void;
}

interface WebToNativeFirebase {
  Messaging: WebToNativeFirebaseMessaging;
}

interface Window {
  webtonative?: {
    Firebase?: WebToNativeFirebase;
    // You can declare other webtonative modules here if you use them
  };
}