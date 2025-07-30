import { post, get } from '../config/axios-config';
import { API_PATHS } from '../constants/apiPath';
import { type DataCart } from '../features/cart/type';
import type { ResponseDataOrder } from '../features/profile/type';

export const createOrder = async (id: string, value: DataCart) => {
  const {
    recipientName,
    recipientPhone,
    shippingAddress,
    province,
    district,
    ward,
    note,
    voucherCode,
    type,
    items
  } = value;

  return await post({
    url: `${API_PATHS.CART.order}`,
    config: {
      headers: {
        userId: id,
      },
    },
    data: {
      recipientName,
      recipientPhone,
      shippingAddress,
      province,
      district,
      ward: ward ?? "Hà Nội",
      note : note ?? null,
      voucherCode: voucherCode ?? null,
      type,
      items: items.map((item) => ({
        productId: item.productId || '',
        quantity: item.quantity || 0,
        price: item.price || 0,
      })),
    }
  });
}

export const getAllOrderByAdmin = async (
  page: number, 
  size: number, 
  status?: number, 
  code?: string,
  recipientName?: string,
  recipientPhone?: number,
  shippingAddress?: string,
):Promise<ResponseDataOrder> => {
  const params = {
    page,
    size,
    ...(status !== undefined && { orderStatus: status }),
    ...(code && { code }),
    ...(recipientName && { recipientName }),
    ...(recipientPhone && { recipientPhone }),
    ...(shippingAddress && { shippingAddress }),
  };

  return await get({
    url: API_PATHS.USER.getAllOrder,
    params
  })
}

export const updateStatusOrder = async (
  {
    orderId,
    status
  } : {
    orderId: string,
    status: number
  }
) => {
  return await post({
    url: API_PATHS.CART.updateStatusOrder,
    data: {
      orderId,
      status
    }
  })
}