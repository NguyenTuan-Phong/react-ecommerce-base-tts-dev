import { useMutation } from "@tanstack/react-query";
import { sendNotificationToAll } from "../../../../services/notificationServices";

export const useSendNotification = () => {
  const token = localStorage.getItem("token");

  return useMutation({
    mutationFn: (params: { id: number }) =>
      sendNotificationToAll(params.id, token || ""),
  });
};