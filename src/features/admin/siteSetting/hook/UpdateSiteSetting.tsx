// useUpdateSiteSetting.tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateSiteSetting } from "../../../../services/siteSettingServices";
import { message } from "antd";

export const useUpdateSiteSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { settingKey: string; settingValue: string; description?: string }) =>
      UpdateSiteSetting(payload),
    onSuccess: () => {
      message.success("Cập nhật SiteSetting thành công");
      queryClient.invalidateQueries({ queryKey: ["getAllSiteSetting"] });
    },
    onError: (error) => {
      console.error("❌ UpdateSiteSetting error:", error);
      message.error("Có lỗi khi cập nhật SiteSetting");
    },
  });
};
