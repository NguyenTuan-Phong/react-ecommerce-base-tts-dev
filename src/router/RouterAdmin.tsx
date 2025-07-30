import { Navigate } from "react-router-dom";
import DashBoard from "../features/admin/dashboard/DashBoard";
import Profile from "../features/profile/components/Profile";
import InfoUser from "../features/profile/components/InfoUser";
import ChangePassword from "../features/profile/components/ChangePassword";
import LoginPage from "../features/auth/components/LoginPage";
import RegisterPage from "../features/auth/components/RegisterPage";
import LayoutAdmin from "../components/layout/LayoutAdmin";
// import HomePage from "../features/homepages/components/HomePage/HomePages";
import ProductAdmin from "../features/admin/product/component/ProductAdmin";
import AddProductAdmin from "../features/admin/product/component/AddProductAdmin";
import ManagementVoucher from "../features/admin/voucher/components/ManagerVoucher";
import ProductAdminDetail from "../features/admin/product/component/ProductAdminDetail";
import ManagementCategory from "../features/admin/category/components/ManagementCategory";
import ManagementOrder from "../features/admin/order/components/ManagementOrder";
import ViewDetailOrder from "../features/admin/order/components/ViewDetailOrder";
import PublisherAdmin from "../features/admin/publisher/component/PublisherAdmin";
import ManagementFlashSale from "../features/admin/flashsale/components/ManagementFlashSale";
import ViewDetailFlashSale from "../features/admin/flashsale/components/ViewDetailFlashSale";
import CreateFlashSale from "../features/admin/flashsale/components/CreateFlashSale";
import UpdateFlashSale from "../features/admin/flashsale/components/UpdateFlashSale";

export const routerAdmin = [
    {path : '*', element : <Navigate to="/admin" />},
    // {
    //         path : '/',
    //         element : <HomePage />
    // },
    {
        path: '/login',
        element : <LoginPage />
    },
    {
        path: '/admin',
        element: <LayoutAdmin />,
        children: [
            {
                index: true,
                element: <DashBoard />
            },
            {
                path: 'prod-management',
                element: <ProductAdmin />
            },
            {
                path: 'add-product',
                element: <AddProductAdmin />
            },
            {
                path: 'management-voucher',
                element: <ManagementVoucher />
            },
            {
                path: 'prod-detail-admin/:id',
                element: <ProductAdminDetail />
            },
            {
                path: 'management-category',
                element: <ManagementCategory />
            },
            {
                path: 'management-order',
                element: <ManagementOrder />
            },
            {
                path: 'view-detail-order',
                element: <ViewDetailOrder />
            },
            {
                path: 'publisher-management',
                element: <PublisherAdmin />
            },
            {
                path: 'management-flashsale',
                element: <ManagementFlashSale />
            },
            {
                path: 'view-detail-flashsale/:id',
                element: <ViewDetailFlashSale />
            },
            {
                path: 'create-flashsale',
                element: <CreateFlashSale />
            },
            {
                path: 'update-flashsale',
                element: <UpdateFlashSale />
            }
        ]
    },
    {
        path: '/profile',
        element: <Profile />,
        children: [
            {
                path:'info-user',
                element: <InfoUser />
            },
            {
                path:'change-password',
                element: <ChangePassword />
            }
        ]
    },
    
    {
        path: '/register',
        element : <RegisterPage />
    },
    
]