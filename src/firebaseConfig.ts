import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import type { Messaging } from 'firebase/messaging';
import { getMessaging, getToken, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyB1m5RSsgGPw964Vk1Wai9lYPog6ub_IoA',
  authDomain: 'ttscodec.firebaseapp.com',
  databaseURL: 'https://ttscodec-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'ttscodec',
  storageBucket: 'ttscodec.appspot.com',
  messagingSenderId: '395007912559',
  appId: '1:395007912559:web:93ab93531a7b746a3afb9a',
  measurementId: 'G-VZNWHK0NNC',
};

const app = initializeApp(firebaseConfig);

// Database luôn an toàn để export
export const database = getDatabase(app);

// Chỉ khởi tạo Messaging nếu hỗ trợ
export let messaging: Messaging | null = null;

(async () => {
  if (typeof window !== 'undefined') {
    try {
      const supported = await isSupported();
      if (supported && 'serviceWorker' in navigator && 'PushManager' in window) {
        messaging = getMessaging(app);
      } else {
        console.warn('Firebase Messaging not supported in this browser/environment.');
      }
    } catch (err) {
      console.warn('Error checking messaging support:', err);
    }
  }
})();

// Hàm lấy FCM token an toàn
export const getFcmToken = async (): Promise<string | null> => {
  if (!messaging) return null;
  try {
    const currentToken = await getToken(messaging, {
      vapidKey:
        'BBLstpihlEVMwbnYiPvhOOW8uYENUhY8gCBrg51ADhQVxNNRtdEqlBIRgSrNi5SAIX10MbVOuQE6ttAM3P3c4VU',
    });
    return currentToken || null;
  } catch (err) {
    console.error('FCM token error:', err);
    return null;
  }
};