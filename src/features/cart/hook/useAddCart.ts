import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addItemsCart } from "../../../services";
import useUserStore from "../../../store/useUserStore";
import { useNavigate } from "react-router-dom";

const useAddCart = (onSuccessCallback?: () => void) => {
  const {
    isPending,
    mutateAsync: addCartMutation,
  } = useMutation({
    mutationKey: ['addCart'],
    mutationFn: addItemsCart,
    onError: (err: Error) => {
      toast.error(err.message || 'Có lỗi xảy ra vui lòng thử lại sau ít phút!');
    },
    onSuccess: () => {
      onSuccessCallback?.();
    },
  });

  const userId = useUserStore((state) => state.user?.id);
  const navigate = useNavigate();

  const handleAddCart = async (
  id: string,
  productId: string,
  quantity: number,
  price?: number,
  flashPrice?: number,
) => {
  if (!userId) {
    navigate('/login');
    toast.error('Bạn cần đăng nhập để thực hiện chức năng này!');
    return;
  }

  const finalPrice = (flashPrice && flashPrice > 0) ? flashPrice : price;

  await addCartMutation({
    id,
    productId,
    quantity,
    price: finalPrice,
  });
};


  return {
    isPending,
    handleAddCart,
  };
};

export default useAddCart;
