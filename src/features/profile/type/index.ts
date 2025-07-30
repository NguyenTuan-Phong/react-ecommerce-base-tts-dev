export interface FormChangePassword {
    newPassword: string;
    confirmPassword: string;
}

export interface itemOrder {
    productName: string;
    productCode: string;
    quantity: number;
    price: number;
    totalPrice: number;
    productId: string;
    isReview: boolean
}

export interface contentOrder {
    id: string;
    code: string;
    customerName: string;
    orderStatus:number;
    orderStatusText: string;
    type: number;
    typeText: string;
    createdAt: string;
    items: itemOrder[];
    totalMoney: number;
    originMoney: number;
    shippingMoney: number;
    reduceMoney: number;
    recipientName: string;
    recipientPhone: number;
    shippingAddress: string;
    note: string | null;

}

export interface ResponseDataOrder {
    data: {
        content: contentOrder[],
        currentTotalElementsCount: number
    }
    
}
export interface CategoryItem {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  categoryItems: CategoryItem[];
}
