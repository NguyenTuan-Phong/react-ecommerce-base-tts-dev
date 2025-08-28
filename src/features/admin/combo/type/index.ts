export interface ResponseDataGetAllCombo {
    data: {
        currentTotalElementsCount: number;
        content: Combo[];
    };
}

export interface Combo {
    id: string;
    nameCombo: string;
    description: string;
    imageUrl: string;
    price: number;
    originalTotalPrice: number;
    discountAmount: number;
    discountPercentage: number;
    isActive: boolean;
    createdAt: string;
    products: Product[];
}

export interface Product {
    id: string;
    productId: string;
    productName: string;
    productCode: string;
    productPrice: number;
    productImageUrl: string;
    quantity: number;
    totalPrice: number;
    soldQuantity: number;
    remainingQuantity: number;
}

export interface ComboProduct {
    id: string;
    nameCombo: string;
    description: string;
    imageUrl: string;
    price: number;
    originalTotalPrice: number;
    discountAmount: number;
    discountPercentage: number;
    isActive: boolean;
    comboProducts: Product[];
    quantity: number,
    soldQuantity: number,
    remainingQuantity: number,
    code: string
}

export interface ResponseDataGetDetailCombo {
    data: ComboProduct
}