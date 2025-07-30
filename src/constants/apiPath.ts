
export const API_PATHS = {
  AUTH: {
    login: '/auth/authenticate',
    register: '/auth/register',
    sendVerificationOTP: '/auth/send-verification-otp',
    verifyAccount: '/auth/verify-account',
    sendForgotPassword: '/auth/send-forgot-password-otp',
    forgotPassword: '/auth/forgot-password',
    refreshToken: '/auth/refresh-token',
  },
  CART: {
    get: '/cart/getAll',
    delete: '/cart/remove',
    clear: '/cart/clear',
    order: '/orders/create',
    add: '/cart/add',
    update: '/cart/update',
    updateStatusOrder: '/orders/update-status'
  },
  USER: {
    get: '/auth/getProfile',
    changePassword: '/auth/change-password',
    getAllOrder : '/orders/getAllOrders',
    getOrderByStatus: '/orders/status',
    getHistoryStatusOrder: 'orders/history',
    getOrderByUserId : '/orders/getOrderByUser'
  },
  VOUCHER: {
    get: '/voucher/getAllVouchers',
    remove: '/voucher/delete',
    getDetail: '/voucher/getVoucherById',
    create: '/voucher/create',
    update: '/voucher/update'
  },
  PRODUCT: {
    getAllProduct: 'products/getAllProducts',
    searchProduct: 'products/search',
    getProductByCategory : '/products/getByCategory',
    getPublishers: '/publishers/getAllPublishers',
    searchPublisher:'/publishers/search',
    creatPublisher:'/publishers/create',
    removePublisher:'/publishers/delete',
    updatePublisher:'/publishers/update',
    getCategory: '/category/getAllCategories',
    getProductByCategoryItem: '/products/getByCategoryItem',
    createProduct:'products/create',
    removeProduct:'/products/delete',
    updateProduct:'/products/update',
    // getCategory:'/category/getAllCategories',
    getCategoryDetail: '/category/getById',
    getCategoryItemsDetail: '/categoryItem/getById',
    createCategory: '/category/create',
    createCategoryItems: '/categoryItem/create',
    removeCategory: '/category/delete',
    removeCategoryItems: '/categoryItem/delete',
    updateCategory : '/category/update',
    updateCategoryItems: '/categoryItem/update',
    getAllFlashSale:'/flash-sales/getAll',
    getFlashSaleDetail:'/flash-sales/getById'
  },
  FEEDBACK: {
    getFeedbackByProductId: '/feedbacks/getFeedbacksByProductId',
    createFeedback: 'feedbacks/create',
    removeFeedback: '/feedbacks/delete',
    updateFeedback: '/feedbacks/update'
  },
  FLASHSALE: {
    getAll: '/flash-sales/getAll',
    getFlashSaleById: '/flash-sales/getById',
    createFlashSale: '/flash-sales/create',
    deleteFlashSale: '/flash-sales/delete',
    updateFlashSale: '/flash-sales/update'
  }
};
