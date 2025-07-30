import { useMutation } from "@tanstack/react-query";
import { searchPublisher } from "../../../services";

export const useSearchPublisher = () => {
  const {
    data: dataSearch,
    isPending: isPendingSearch,
    mutateAsync: searchMutation,
  } = useMutation({
    mutationKey: ['searchPublisher'],
    mutationFn: (keyword: string) => searchPublisher(keyword),
    onError: (error) => {
      console.error("Lỗi khi tìm kiếm nhà cung cấp:", error);
    }
  });

  const search = async (keyword: string) => {
    try {
      await searchMutation(keyword);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    isPendingSearch,
    dataSearch,
    search,
  };
};
