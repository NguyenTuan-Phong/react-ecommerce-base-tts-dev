import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addItemsCart } from '../../../services';
import useUserStore from '../../../store/useUserStore';

const useAddCart = (onSuccessCallback?: () => void) => {
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [loadingButton, setLoadingButton] = useState<null | 1 | 0>(null);
  const [loadingComboId, setLoadingComboId] = useState<string | null>(null);
  const { isPending, mutateAsync: addCartMutation } = useMutation({
    mutationKey: ['addCart'],
    mutationFn: addItemsCart,
    onError: (err: Error) => {
      toast.error(err.message || 'Có lỗi xảy ra vui lòng thử lại sau ít phút!');
    },
    onSuccess: () => {
      setLoadingProductId(null);
      setLoadingButton(null);
      setLoadingComboId(null)
    },
  });

  const userId = useUserStore((state) => state.user?.id);
  const navigate = useNavigate();

  const handleAddCart = async (
    id: string,
    buyNow: boolean,
    productId?: string,
    quantity?: number,
    combo?: {
      id?: string;
      quantity?: number;
    },
  ) => {
    if (!userId) {
      navigate('/login');
      toast.error('Bạn cần đăng nhập để thực hiện chức năng này!');
      return;
    }

    setLoadingProductId(productId ?? null);
    setLoadingComboId(combo?.id ?? null)
    setLoadingButton(buyNow ? 1 : 0);

    try {
      const res = await addCartMutation({
        id,
        productId,
        quantity,
        buyNow,
        combo,
      });
      if (buyNow) {
        navigate('/checkout', {
          state: res,
        });
      } else {
        onSuccessCallback?.();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    isPending,
    handleAddCart,
    loadingProductId,
    loadingButton,
    loadingComboId
  };
};

export default useAddCart;