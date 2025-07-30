import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePublisher } from "../../../../services";
import { message } from "antd";

export const useUpdatePublisher = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({id, payload }: { id: number; payload: any }) => {
      return await updatePublisher(id, payload);
    },
    onSuccess: () => {
      message.success("Cập nhật nhà cung cấp thành công");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "getAllPublisher",
      });
    },
    onError: () => {
      message.error("Có lỗi xảy ra khi cập nhật sản phẩm");
    },
  });

  return { mutate, isPending };
};