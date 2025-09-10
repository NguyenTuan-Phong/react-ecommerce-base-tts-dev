import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { GetAllIdSiteSetting } from "../../../../services/siteSettingServices";
import type { SiteSetting } from "../../../../services/siteSettingServices";

/**
 * Hook gọi API getAllIdSiteSetting (lấy danh sách site settings, có phân trang)
 * @param page: số trang
 * @param size: số bản ghi mỗi trang
 */
export const useSiteSettings = (page: number, size: number) => {
  return useQuery<{ items: SiteSetting[]; total: number }>({
    queryKey: ["getAllSiteSetting", page, size],
    queryFn: async () => {
      console.log(`📤 Fetching getAllSiteSetting page=${page}, size=${size}`);
      const data = await GetAllIdSiteSetting(page, size);
      console.log("✅ getAllSiteSetting response:", data);
      return data;
    },
    placeholderData: keepPreviousData, // v5: giữ data cũ khi đổi page
    staleTime: 1000 * 60, // cache 1 phút
  });
};
