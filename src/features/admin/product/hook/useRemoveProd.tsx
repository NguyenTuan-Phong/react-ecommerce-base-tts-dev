import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { removeProduct } from "../../../../services";
import { useNavigate } from "react-router-dom";

export const useRemoveProd = (onSuccessCallBack?: () => void) => {
  const queryClient = useQueryClient(); 
  const navigate = useNavigate();

  const {
    isPending: isPendingRemoveProduct,
    mutateAsync: removeProductMutation,
  } = useMutation({
    mutationKey: ["removeProduct"],
    mutationFn: removeProduct,
    onSuccess: () => {
        toast.success("Xóa sản phẩm thành công!");
        queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === "getAllProduct",
        });

        if (typeof onSuccessCallBack === "function") {
            onSuccessCallBack();
        }
        },

    onError: (err: Error) => {
      toast.error(
        err.message || "Có lỗi xảy ra, vui lòng thực hiện lại sau ít phút!"
      );
    },
  });

  const handleRemoveProduct = (id: string) => {
    removeProductMutation(id);
  };  
    const onClickDelete = async (id: string) => {
      const confirmed = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");
      if (!confirmed) return;
  
      await handleRemoveProduct(id);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "getAllProduct",
      });
  
      navigate("/admin/prod-management");
    };

  return {
    onClickDelete,
    isPendingRemoveProduct,
    handleRemoveProduct,
  };
};
