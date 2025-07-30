// src/features/admin/product/hook/useUpdateProduct.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { updateProduct } from "../../../../services";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({id, payload }: { id: number; payload: any }) => {
      return await updateProduct(id, payload);
    },
   onSuccess: async () => {
  message.success("Cập nhật sản phẩm thành công");

  await queryClient.invalidateQueries({
    predicate: (query) => query.queryKey[0] === "getAllProduct",
  });

  
},
    onError: () => {
      message.error("Có lỗi xảy ra khi cập nhật sản phẩm");
    },
  });
  

  return { mutate, isPending };
};
