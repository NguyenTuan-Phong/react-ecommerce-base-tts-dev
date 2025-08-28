import { get, post } from '../config/axios-config';
import { API_PATHS } from '../constants/apiPath';
import type { ResponsiveDataCartItems } from '../types';

export const getCartData = async (id: string): Promise<ResponsiveDataCartItems> => {
  return await get({
    url: API_PATHS.CART.get,
    config: {
      headers: {
        userId: id,
      },
    },
  });
};

export const addItemsCart = async ({
  id,
  productId,
  quantity,
  buyNow,
  combo,
}: {
  id: string;
  productId?: string;
  quantity?: number;
  buyNow: boolean;
  combo?: {
    id?: string;
    quantity?: number;
  };
}): Promise<ResponsiveDataCartItems> => {
  return await post({
    url: API_PATHS.CART.add,
    data: {
      product: productId
        ? {
            id: productId,
            quantity,
          }
        : null,
      buyNow,
      combo: combo?.id ? { id: combo.id, quantity: combo.quantity } : null,
    },

    config: {
      headers: {
        userId: id,
      },
    },
  });
};

export const removeItemsCart = async (id: string, productId?: string, comboId?: string) => {
  console.log('[LOG] ~ removeItemsCart ~ id:', id);
  console.log('[LOG] ~ removeItemsCart ~ productId:', productId);
  console.log('[LOG] ~ removeItemsCart ~ comboId:', comboId);
  return await post({
    url: `${API_PATHS.CART.delete}`,
    config: {
      params: {
        productId,
        comboId,
      },
      headers: {
        userId: id,
      },
    },
  });
};

export const clearItemsCart = async (id: string) => {
  return await post({
    url: `${API_PATHS.CART.clear}`,
    config: {
      headers: {
        userId: id,
      },
    },
  });
};

export interface TypeUpdate {
  productId?: string;
  newQuantity?: number;
  comboId?: string;
  comboQuantity?: number;
}

export const updateItemCart = async (id: string, value: TypeUpdate) => {
  const { productId, newQuantity, comboId, comboQuantity } = value;
  return await post({
    url: `${API_PATHS.CART.update}`,
    data: {
      product: productId
        ? {
            id: productId,
            newQuantity,
          }
        : null,
      combo: comboId
        ? {
            id: comboId,
            newQuantity: comboQuantity,
          }
        : null,
    },
    config: {
      headers: {
        userId: id,
      },
    },
  });
};