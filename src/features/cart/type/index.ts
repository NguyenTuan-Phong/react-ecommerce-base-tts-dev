export interface ItemVoucher {
    id: string,
    code: string,
    name: string,
    description: string,
    type: number,
    typeText: string,
    startDate: string,
    endDate: string,
    statusVoucher: number,
    statusText: string,
    isPublic: boolean,
    value: number,
    minOrderAmount: number,
    maxDiscountAmount: number,
    usedCount: number,
    usageLimitPerUser: number,
    quantity: number,
    remainingUsage: number
}

export interface ResponseVoucher {
    data: {
        content: ItemVoucher[],
    }
}

export interface ResponseDetailVoucher {
    data:ItemVoucher
}

export interface itemsCart {
    productId: string,
    quantity: number,
    price: number,
    flashPrice?:number,
}

export interface DataCart {
    recipientName: string,
    recipientPhone: string,
    shippingAddress: string,
    province: string,
    district: string,
    ward: string,
    note: string,
    voucherCode: string | null,
    type: number,
    items: itemsCart[],
}