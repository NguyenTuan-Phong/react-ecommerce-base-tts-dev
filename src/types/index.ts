export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface FormSendOTPForget {
  email: string;
}

export interface FormForget {
  email: string;
  otp: number;
  newPassword: string;
  confirmPassword: string;
}

export interface LoginForm {
  email: string;
  password: string;
  fcmToken: string | null;
}

export interface Category {
  type: number | Category | null | undefined;
  id: string;
  name: string;
  description: string;
  categoryItems: { id: number; name: string; img: string }[];
}

export interface FormLogin {
  email: string;
  password: string;
  fcmToken?: string | null;
}

export interface FormRegister {
  email: string;
  fullName: string;
  phoneNumber: string;
  gender: number;
  password: string;
  role: number;
}

export interface LoginResponseData {
  fullname: string;
  accessToken: string;
  verified?: boolean;
}
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface FormForget {
  email: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  code: string;
  rating: number;
  color: string | null;
  size: number | null;
  quantity: number;
  originalPrice?: number;
  flashPrice?: number;
  isActive: 0 | 1;
  publisher: {
    id: number;
    name: string;
    isActive: 0 | 1;
  };
  categories: [
    {
      id: number;
      name: string;
      description: string;
      isActive: 0 | 1;
    },
  ];
  feedbackStats: string | null;
  availableQuantity: number;
};
export interface FormLogin {
  email: string;
  password: string;
}

export interface FormRegister {
  email: string;
  fullName: string;
  phoneNumber: string;
  gender: number;
  password: string;
  role: number;
}

export interface LoginResponseData {
  fullname: string;
  accessToken: string;
  verified?: boolean;
}

export interface DataProduct {
  name: string;
  price: number;
  code: string;
  color: string;
  size: string;
  id: string;
  imageUrl: string;
  flashPrice?: number;
  originalPrice?: number;
}
export interface CartItem {
  id: number;
  quantity: number;
  name: string;
  product: DataProduct;
}
export interface IComboItemsResp {
  id?: number | string;
  quantity: number;
  combo: {
    id: string;
    nameCombo: string;
    description: string;
    imageUrl: string;
    price: number;
    originalTotalPrice: null;
    discountAmount: null;
    discountPercentage: null;
    comboProducts: null;
    isActive: null;
    quantity: number;
    soldQuantity: number;
    remainingQuantity: number;
    code: string;
  };
}

export interface ResponsiveDataCartItems {
  data: {
    id: string;
    cartItems: CartItem[];
    comboItems?: IComboItemsResp[];
  };
}

export interface Publisher {
  id: number;
  name: string;
}

export interface PriceRange {
  label: string;
  min: number;
  max: number;
}
export interface FeedbackPayload {
  name: string;
  email: string;
  content: string;
  rate: number;
}

export interface itemHistoryStatusOrder {
  id: string;
  note: string;
  createdAt: string;
  products: itemsProduct[];
}

export interface ResponseGetHistoryStatusOrder {
  data: itemHistoryStatusOrder[];
}

export interface itemsProduct {
  productId: string;
  isReviewed: boolean;
}

export interface ResponseFlashSale {
  data: {
    currentPage: number;
    currentTotalElementsCount: number;
    pageSize: number;
    content: FlashSale[];
    notLast: boolean;
    pagesCount: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
}

export interface FlashSale {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  products: FlashSaleProduct[];
  createdBy: string;
  active: boolean;
}

export interface FlashSaleProduct {
  productId: string;
  name: string;
  description: string;
  code: string;
  originalPrice: number;
  imageUrl: string;
  flashPrice: number;
  availableQuantity: number;
  soldQuantity: number;
  publisher: Publisher;
  categories: Category[];
}

export interface contentFlashSale {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  active: boolean;
}

// Category
export interface categoryItems {
  id: string;
  name: string;
}

export interface categories {
  id: string;
  name: string;
  categoryItems: categoryItems[];
}

// Piblisher
export interface publisher {
  id: string;
  name: string;
}

export interface products {
  productId: string;
  name: string;
  description: string;
  code: string;
  originalPrice: number;
  imageUrl: string;
  flashPrice: number;
  availableQuantity: number;
  soldQuantity: number;
  publisher: publisher;
  categories: categories[];
  active: boolean;
}

export interface ResponseFlashSaleById {
  data: {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    active: boolean;
    products: products[];
    createdBy: string;
  };
}

export interface flashSale {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  active: boolean;
  products: products[];
  createdBy: string;
}

export interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  avatar: string;
}

export interface ChatProps {
  userId: string;
  onClick?: () => void;
}
export interface Notification {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface ResponseNotification {
  data: {
    content: Notification[];
    currentTotalElementsCount: number;
  };
}
