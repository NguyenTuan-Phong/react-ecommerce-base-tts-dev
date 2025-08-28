import { useQuery } from "@tanstack/react-query";
import { getAllNotification } from "../../../../services/notificationServices";
import type { ResponseNotification } from "../../../../types";

export const useNotification = (
  page: number = 0,
  size: number = 5,
  
) => {
  const {
    data: allNotification,
    isPending: isLoadingNotification,
    error,
  } = useQuery<ResponseNotification>({
    queryKey: ["getAllNotification", page, size],
    queryFn: () => getAllNotification(page,size), 
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });


  return {
     allNotification,
    isLoadingNotification,
    error,
  };
};
