// import { get, post } from '../config/axios-config';
import { get, post } from '../config/axios-config';
import { API_PATHS } from '../constants/apiPath';
import { type ResponseCategory, type ResponseGetCategoryDetail, type ResponseProduct, type ResponsePublishers } from '../features/homepages/type';
import type { ResponseFlashSale } from '../types';



export const getAllProduct = async (page: number, size: number, sort?: string, nameProduct?: string) : Promise<ResponseProduct> => {
  const params = {
    page,
    size,
    sort,
    ...(nameProduct && { nameProduct }),
  }

  return await get({
    url: `${API_PATHS.PRODUCT.getAllProduct}`,
    params
  });
  
};


export const searchProduct = async (keyword: string): Promise<ResponseProduct> => {
  return await get({
    url: `${API_PATHS.PRODUCT.searchProduct}`,
    params: {
      nameProduct: keyword,
      page: 0,
      size: 10
    },
  });
}

export const searchPublisher = async (keyword: string): Promise<ResponsePublishers> => {
  return await get({
    url: `${API_PATHS.PRODUCT.searchPublisher}`,
    params: {
      namePublisher: keyword,
    },
  });
}


export const getProductByCategory = async (
  categoryId: string,
  page: number,
  size: number,
  publisherId?: string | undefined,
  minPrice?: number | undefined,
  maxPrice?: number | undefined
) : Promise<ResponseProduct> => {
  return await get({
    url: API_PATHS.PRODUCT.getProductByCategory,
    params: {
      categoryId,
      page,
      size,
      publisherId,
      minPrice,
      maxPrice
    }
  })
}

export const getAllPublisher = async (
  page: number,
  size: number,
  name: string = ""
) : Promise<ResponsePublishers> => {
  const params = {
    page,
    size,
    name: name ?? undefined
  }
  return await get({
    url: API_PATHS.PRODUCT.getPublishers,
    params
  })
}

export const createPublisher = async (
    {
        publisherId,
        name
    } : {
        publisherId: string,
        name: string,
       
    },
    token:string,
) => {
    return await post({
        url: API_PATHS.PRODUCT.creatPublisher,
        data: {
            publisherId,
            name
        },
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
    })
}

export const removePublisher = async (id:  string) => {
    return await post({
        url: `${API_PATHS.PRODUCT.removePublisher}/${id}`,

    })
}
export const updatePublisher = async(
  id:number,
  payload:{
    name?:string
  }
)=>{
    const token = localStorage.getItem("token");
  return await post({
    url: `${API_PATHS.PRODUCT.updatePublisher}`, 
    data: {
      id,
      ...payload,
    },
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  }


export const getProductByCategoryItem = async (
  categoryItemId: string,
  page: number,
  size: number,
  publisherId?: string | undefined,
  minPrice?: number | undefined,
  maxPrice?: number | undefined
) : Promise<ResponseProduct> => {
  return await get({
    url: API_PATHS.PRODUCT.getProductByCategoryItem,
    params: {
      categoryItemId,
      page,
      size,
      publisherId,
      minPrice,
      maxPrice
    }
  })
}

export const getCategory = async (page?: number, size?: number) :Promise<ResponseCategory> => {
  return await get({
    url: API_PATHS.PRODUCT.getCategory,
    params: {
      page: page ?? 0,
      size: size ?? 20
    }
  })
}

export const removeProduct = async (id:  string) => {
    return await post({
        url: `${API_PATHS.PRODUCT.removeProduct}/${id}`,

    })
}


export const updateProduct = async (
  id: number,
  payload: {
    name?: string;
    price?: number;
    quantity?: number;
    imageUrl?: File;
    publisherId?: number;
    categoryIds?: number[];
    code?: string;
    description?: string;
  }
) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();

  const requestPayload = {
    id,
    name: payload.name,
    code: payload.code,
    price: payload.price,
    quantity: payload.quantity,
    description: payload.description,
    publisherId: payload.publisherId,
    categoryItemIds: payload.categoryIds,
  };
  console.log(id);
  

  const blob = new Blob([JSON.stringify(requestPayload)], {
    type: "application/json",
  });

  formData.append("request", blob);

  if (payload.imageUrl instanceof File) {
    formData.append("image", payload.imageUrl);
  } else {
    formData.append("image", new File([], ""), "");
  }

  return await post({
    url: API_PATHS.PRODUCT.updateProduct,
    data: formData,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};



export const createProduct = async (
  {
    name,
    code,
    price,
    description,
    imageUrl,
    quantity,
    publisherId,
    categoryItemIds,
    color,
    size,
  }: {
    name: string;
    code: string;
    price: number;
    description: string;
    imageUrl: File;
    quantity: number;
    publisherId: number;
    categoryItemIds: number[];
    color: string;
    size: string;
  },
  token: string
) => {
  const formData = new FormData();

  const requestPayload = {
    name,
    price,
    code,
    description,
    publisherId,
    quantity,
    categoryItemIds,
    color,
    size,
  };

  const blob = new Blob([JSON.stringify(requestPayload)], {
    type: "application/json",
  });

  formData.append("request", blob);      
  formData.append("image", imageUrl);      

  return await post({
    url: API_PATHS.PRODUCT.createProduct,
    data: formData,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};





export const getCategoryDetail = async (id: string) :Promise<ResponseGetCategoryDetail> => {
  return await get({
    url: `${API_PATHS.PRODUCT.getCategoryDetail}/${id}`
  })
}

export const getCategoryDetailItems = async (id: string):Promise<ResponseGetCategoryDetail>  => {
  return await get({
    url: `${API_PATHS.PRODUCT.getCategoryItemsDetail}/${id}`
  })
}

export const createCategory = async (
  {
    name
  } : {
    name :  string
  }
) => {
  return await post({
    url: API_PATHS.PRODUCT.createCategory,
    data: {
      name
    }
  })
}


export const createCategoryItems = async (
  {
    name,
    categoryId
  } : {
    name: string,
    categoryId: string
  }
) => {
  return await post({
    url: API_PATHS.PRODUCT.createCategoryItems,
    data: {
      name,
      categoryId
    }
  })
}

export const removeCategory = async (id: string) => {
  return await post({
    url: `${API_PATHS.PRODUCT.removeCategory}/${id}`
  })
}

export const removeCategoryItems = async (id: string) => {
  return await post({
    url: `${API_PATHS.PRODUCT.removeCategoryItems}/${id}`
  })
}

export const updateCategory = async (
  {
    id,
    name
  } : {
    id: string,
    name: string
  }
) => {
  return await post({
    url: API_PATHS.PRODUCT.updateCategory,
    data: {
      id,
      name
    }
  })
}


export const updateCategoryItems = async (
  {
    id,
    name,
    categoryId
  } : {
    id: string,
    name: string,
    categoryId: string
  }
) => {
  return await post({
    url: API_PATHS.PRODUCT.updateCategoryItems,
    data: {
      id,
      name,
      categoryId
    }
  })
}

export const getAllFlashSale = async (
  page: number,
  size: number,
  
): Promise<ResponseFlashSale> => {
  const params: Record<string, any> = {
    page,
    size,
    
  };

  return await get({
    url: API_PATHS.PRODUCT.getAllFlashSale,
    params,
  });
};

export const getFlashSaleDetail = async (id: number) => {
  return await get({
    url: `${API_PATHS.PRODUCT.getFlashSaleDetail}/${id}`,
  });
};
