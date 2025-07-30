// features/product/hooks/useGetAllProducts.ts
import { useQuery } from "@tanstack/react-query";
import type { ResponsePublishers } from "../../../homepages/type";
import { getAllPublisher } from "../../../../services";

export const usePublishers = (
  page: number = 0,
  size: number = 10,
  name?: string
) => {
  const {
    data: publisherData,
    isLoading: isLoadingAllPublisher,
    error,
  } = useQuery<ResponsePublishers>({
    queryKey: ["getAllPublisher", page, size, name],
    queryFn: () => getAllPublisher(page,size, name), 
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    publisherData,
    isLoadingAllPublisher,
    error,
  };
};
