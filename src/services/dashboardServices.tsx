import { get } from "../config/axios-config"
import { API_PATHS } from "../constants/apiPath"
export interface Order {
  id: number;
  code: string;
  customerName: string;
  totalAmount: number;
  status: number;
  createdAt: string;
}

export interface ProductTopSelling {
    productId: number,
    productName: string,
    soldQuantity: number
}

export interface RevenueSales {
    revenue: number,
    soldQuantity: number,
    orders: Order[],
    month: string
}

export interface Order {
    id:number,
    code: string,
    customerName: string,
    totalAmount: number,
    status: number,
    createdAt: string
}

export type ResponseDashBoardViewTableHistoryOrder = Order[];
export type ResponseDashBoardProductTopSelling = ProductTopSelling[]
export type ResponseDashBoardRevenueSales = RevenueSales[]

export const dashboardViewHistoryOrder = async (limit: number):Promise<ResponseDashBoardViewTableHistoryOrder> => {
    return await get({
        url: API_PATHS.DASHBOARD.dashboardViewHistoryOrder,
        params: {
            limit: limit
        }
    })
}

export const dashboardProductTopSelling = async (limit: number):Promise<ResponseDashBoardProductTopSelling> => {
    return await get({
        url: API_PATHS.DASHBOARD.dashboardProductTopSelling,
        params: {
            limit: limit
        }
    })
}

export const dashboardRevenueSales = async (year: number, month: number): Promise<ResponseDashBoardRevenueSales> => {
    return await get({
        url: API_PATHS.DASHBOARD.dashboardRevenueSales,
        params: {
            year: year,
            month: month
        }
    })
}