export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    flashPrice?:number;
    originalPrice?: number;
    imageUrl: string;
    // categoryId: Category[];
    categories: Category[];
    code: string;
    rating: number;
    color: string;
    size: string;
    quantity: number;
    publisher: {
        id: string;
        name: string;
    },
    availableQuantity:number
}

export interface Category {
    id: number;
    name: string;
}

export interface ResponseProduct {
    data: {
        content: Product[];
        currentTotalElementsCount: number;
    }
}

export interface itemPublishers {
    id: string,
    name: string
}

export interface ResponsePublishers {
    data: {
        content: itemPublishers[]
        currentTotalElementsCount: number;

    }
}


// export interface categoryItems {
    
// }

export interface ResponseCategory {
    data:{
        content:category[],
        currentTotalElementsCount: number
    }
}

export interface category {
    id: string,
    name: string,
    categoryItems: categoryItems[]
}

export interface categoryItems {
    id: string,
    name: string
}

export interface ResponseGetCategoryDetail {
    data:categoryItems
}

export interface ResponseSearchProductByImage {
    data: Product[]
}