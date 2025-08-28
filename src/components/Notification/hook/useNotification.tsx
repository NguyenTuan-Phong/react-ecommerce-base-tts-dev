import { useEffect, useState } from "react";
import { getFcmToken } from "../../../firebaseConfig";
import { notification } from "antd";
import { BellFilled } from "@ant-design/icons";

export interface NotificationItem {
  id?: string;
  message: string;
  type: string;
  timestamp: number;
  read: boolean;
  imageUrl?:string

}
const STORAGE_KEY = "notifications";

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    // Đọc từ localStorage khi khởi tạo
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
 useEffect(() => {
    // Lưu vào localStorage 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    // Lấy FCM token
    const initFCM = async () => {
      const token = await getFcmToken();
      if (token) {
        console.log("FCM Token:", token);
      } else {
        console.warn("Không thể lấy FCM token");
      }
    };
    initFCM();

    // Nhận từ Service Worker
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data?.type === "NEW_NOTIFICATION") {
          const payload = event.data.payload;

          const msg =
            payload.data?.description ||
            payload.data?.message ||
            payload.notification?.body ||
            "";

          const type =
            payload.data?.title ||
            payload.data?.type ||
            payload.notification?.title ||
            "info";

          addNotification({
            id: payload.data?.id,
            message: msg,
            type,
            timestamp: Date.now(),
            read: false,
            imageUrl: payload.notification?.imageUrl || payload.data?.imageUrl 

          });
        }
      });
    }
  }, []);

  const addNotification = (noti: NotificationItem) => {
    setNotifications((prev) => {
      // Lọc trùng nếu có id
      if (noti.id && prev.some((p) => p.id === noti.id)) return prev;

      notification.open({
        message: `[${noti.type?.toUpperCase()}]`,
        description: noti.message,
        icon: <BellFilled style={{ color: "#1890ff" }} />,
        placement: "topRight",
        duration: 4,
      });

      return [noti, ...prev];
    });
  };

  return { notifications, setNotifications };
}

