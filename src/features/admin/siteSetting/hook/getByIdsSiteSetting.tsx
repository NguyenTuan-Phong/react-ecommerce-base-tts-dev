import { useQuery } from "@tanstack/react-query";
import { GetByIdsSiteSetting } from "../../../../services/siteSettingServices";

/**
 * Hook gọi API getByIdsSiteSetting
 * @param keys: danh sách key cần lấy
 * @param enabled: có bật query hay không (mặc định true)
 */
export const useGetByIdsSiteSetting = (
  keys: string[],
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["getByIdsSiteSetting", keys],
    queryFn: async () => {
      console.log("📤 Fetching getByIdsSiteSetting with keys:", keys);
      const data = await GetByIdsSiteSetting(keys);
      console.log("✅ getByIdsSiteSetting response:", data);
      return data;
    },
    enabled: keys.length > 0 && enabled, // chỉ chạy khi có keys và enabled = true
    staleTime: 1000 * 60, // cache 1 phút
  });
};
