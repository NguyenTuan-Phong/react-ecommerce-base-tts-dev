import { ref, set } from 'firebase/database';
import { getToken } from 'firebase/messaging';
import { database, messaging } from './firebaseConfig';

const PUBLIC_VAPID_KEY =
  'BCLr_HmMpQGd5y4VUY1gllP-e_HUXhr5SIsj1z-YH-2sE1RKXLR3bLWeJ5KnPcknQJryCzPsScf2VbF8hWS-tvU';

export const registerDeviceToken = async (userId: string) => {
  try {
    if (!messaging) {
      console.warn('Firebase Messaging chưa được khởi tạo hoặc không được hỗ trợ.');
      return;
    }

    const token = await getToken(messaging, { vapidKey: PUBLIC_VAPID_KEY });

    if (token) {
      await set(ref(database, `deviceTokens/${userId}`), token);
      console.log('Đã lưu token:', token);
    } else {
      console.warn('Không lấy được token từ FCM.');
    }
  } catch (err) {
    console.error('Lỗi khi lấy token:', err);
  }
};
