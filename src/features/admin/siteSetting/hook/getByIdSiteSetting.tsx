import { useQuery } from "@tanstack/react-query";
import { GetByIdSiteSetting } from "../../../../services/siteSettingServices";

/**
 * Hook gọi API getByIdSiteSetting
 * @param key: key cần lấy
 * @param enabled: có bật query hay không (mặc định true)
 */
export const useGetByIdSiteSetting = (key: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["getByIdSiteSetting", key],
    queryFn: async () => {
      console.log("📤 Fetching getByIdSiteSetting with key:", key);
      const data = await GetByIdSiteSetting(key);
      console.log("✅ getByIdSiteSetting response:", data);
      return data;
    },
    enabled: !!key && enabled, // chỉ chạy khi có key và enabled = true
    staleTime: 1000 * 60, // cache 1 phút
  });
};
