import { Navigate } from "react-router-dom";
// Pages
import DashBoard from "../features/admin/dashboard/components/DashBoard";
import ProductAdmin from "../features/admin/product/component/ProductAdmin";
import AddProductAdmin from "../features/admin/product/component/AddProductAdmin";
import ProductAdminDetail from "../features/admin/product/component/ProductAdminDetail";
import ManagementVoucher from "../features/admin/voucher/components/ManagerVoucher";
import ManagementCategory from "../features/admin/category/components/ManagementCategory";
import ManagementOrder from "../features/admin/order/components/ManagementOrder";
import ViewDetailOrder from "../features/admin/order/components/ViewDetailOrder";
import PublisherAdmin from "../features/admin/publisher/component/PublisherAdmin";
import ManagementFlashSale from "../features/admin/flashsale/components/ManagementFlashSale";
import ViewDetailFlashSale from "../features/admin/flashsale/components/ViewDetailFlashSale";
import CreateFlashSaleV2 from "../features/admin/flashsale/components/CreateFlashSaleV2";
import UpdateFlashSaleV2 from "../features/admin/flashsale/components/UpdateFlashSaleV2";
import AdminNotification from "../features/admin/notification/component/AdminNotification";
import AddNotification from "../features/admin/notification/component/AddNotification";
import ManagementCombo from "../features/admin/combo/components/ManagementCombo";
import ViewDetailCombo from "../features/admin/combo/components/ViewDetailCombo";
import CreateComboProduct from "../features/admin/combo/components/CreateComboProduct";
import UpdateComboProduct from "../features/admin/combo/components/UpdateComboProduct";
import Profile from "../features/profile/components/Profile";
import InfoUser from "../features/profile/components/InfoUser";
import ChangePassword from "../features/profile/components/ChangePassword";
import RegisterPage from "../features/auth/components/RegisterPage";
import AuthLayoutAdmin from "../components/layout/AuthLayoutAdmin";
import MainLayoutAdmin from "../components/layout/LayoutAdmin";
import LoginAdmin from "../features/auth/components/LoginAdmin";
import SiteSettingPage from "../features/admin/siteSetting/components/siteSetting";



export const routerAdmin = [
    {
        element: <AuthLayoutAdmin />,
        children: [
            { path: "/admin/login", element: <LoginAdmin /> },
        ],
    },

    {
        element: <MainLayoutAdmin />,
        children: [
            { path: "/admin", element: <DashBoard /> },
            { path: "admin/prod-management", element: <ProductAdmin /> },
            { path: "admin/add-product", element: <AddProductAdmin /> },
            { path: "admin/prod-detail-admin/:id", element: <ProductAdminDetail /> },
            { path: "admin/management-voucher", element: <ManagementVoucher /> },
            { path: "admin/management-category", element: <ManagementCategory /> },
            { path: "admin/management-order", element: <ManagementOrder /> },
            { path: "admin/view-detail-order", element: <ViewDetailOrder /> },
            { path: "admin/publisher-management", element: <PublisherAdmin /> },
            { path: "admin/management-flashsale", element: <ManagementFlashSale /> },
            { path: "admin/view-detail-flashsale/:id", element: <ViewDetailFlashSale /> },
            { path: "admin/create-flashsale", element: <CreateFlashSaleV2 /> },
            { path: "admin/update-flashsale", element: <UpdateFlashSaleV2 /> },
            { path: "admin/management-notification", element: <AdminNotification /> },
            { path: "admin/add-notification", element: <AddNotification /> },
            { path: "admin/management-combo", element: <ManagementCombo /> },
            { path: "admin/view-detail-combo/:id", element: <ViewDetailCombo /> },
            { path: "admin/create-combo-product", element: <CreateComboProduct /> },
            { path: "admin/update-combo-product", element: <UpdateComboProduct /> },
            { path: "admin/management-site-setting", element: <SiteSettingPage /> },
            {
                path: "/profile",
                element: <Profile />,
                children: [
                    { path: "info-user", element: <InfoUser /> },
                    { path: "change-password", element: <ChangePassword /> },
                ],
            },
        ],
    },

    { path: "/register", element: <RegisterPage /> },
    { path: "*", element: <Navigate to="/admin" /> },
];
