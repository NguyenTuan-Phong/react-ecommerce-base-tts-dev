import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteNotification } from "../../../../services/notificationServices";

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteNotification(id);
    },
    onSuccess: () => {
      toast.success("Xoá thông báo thành công!");
      queryClient.invalidateQueries({ queryKey: ["getAllNotification"] });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Xoá thông báo thất bại!");
    },
  });

  return {
    deleteNotification: mutation.mutate,
    isPending: mutation.isPending,
  };
};

