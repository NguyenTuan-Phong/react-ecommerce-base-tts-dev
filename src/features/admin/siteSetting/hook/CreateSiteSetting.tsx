import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateSiteSetting, type SiteSetting } from "../../../../services/siteSettingServices";
import { message } from "antd";

export const useCreateSiteSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: { key: string; value: string; description?: string }) => {
      // map sang payload chuẩn backend
      const payload: SiteSetting = {
        settingKey: values.key,
        settingValue: values.value,
        description: values.description,
      };

      console.log("📤 Sending payload to API:", payload);
      return CreateSiteSetting(payload);
    },
    onSuccess: (data) => {
      console.log("✅ CreateSiteSetting success:", data);
      message.success("Thêm mới SiteSetting thành công");
      queryClient.invalidateQueries({ queryKey: ["getAllSiteSetting"] });
    },
    onError: (error) => {
      console.error("❌ CreateSiteSetting error:", error);
      message.error("Có lỗi khi thêm mới SiteSetting");
    },
  });
};
