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
  price
}: {
  id: string;
  productId: string;
  quantity: number;
  price?: number; 
}) => {
  return await post({
    url: API_PATHS.CART.add,
    data: {
      productId,
      quantity,
      ...(price !== undefined && { price }) 
    },
    config: {
      headers: {
        userId: id,
      },
    },
  });
};


export const removeItemsCart = async (id: string,productId: string) => {
  return await post({
    url: `${API_PATHS.CART.delete}/${productId}`,
    config: {
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
  productId: string,
  newQuantity: number
}

export const updateItemCart = async (id: string, value: TypeUpdate) => {

  const {
    productId,
    newQuantity
  } = value
  return await post({
    url: `${API_PATHS.CART.update}`,
    data: {
      productId,
      newQuantity
    },
    config: {
      headers: {
        userId: id
      }
    }
  })
}