import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteSiteSetting } from "../../../../services/siteSettingServices";
import { message } from "antd";

export const useDeleteSiteSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (key: string) => DeleteSiteSetting(key),
    onSuccess: () => {
      message.success("Xóa SiteSetting thành công");
      queryClient.invalidateQueries({ queryKey: ["getAllSiteSetting"] });
    },
    onError: () => {
      message.error("Có lỗi khi xóa SiteSetting");
    },
  });
};
