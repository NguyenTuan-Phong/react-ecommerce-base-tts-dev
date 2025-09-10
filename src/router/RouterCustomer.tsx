import { Navigate } from "react-router-dom";

// Layouts
import AuthLayout from "../components/layout/AuthLayout";
import MainLayout from "../components/layout/MainLayout";

// Pages
import HomePage from "../features/homepages/components/HomePage/HomePages";
import CartPage from "../features/cart/components/CartPage";
import ProductDetail from "../features/productdetail/components/ProductDetail";
import ProductByCat from "../features/productdetail/components/ProductByCat";
import ProductByCatItems from "../features/productdetail/components/ProductByCatItems";
import ListProductSale from "../features/flashSale/Component/ListProductSale";
import Compare from "../features/compare/components/Compare";
import News from "../features/news/components/News";
import YouTubeChanel from "../features/news/components/YoutubeChanel";
import Intro from "../features/news/components/Intro";
import HD from "../features/news/components/HD";
import Game from "../features/news/components/Game";
import Profile from "../features/profile/components/Profile";
import OrderHistory from "../features/profile/components/OrderHistory";
import OrderCard from "../features/profile/components/OrderCard";
import ListOrderByStatus from "../features/profile/components/ListOrderByStatus";
import InfoUser from "../features/profile/components/InfoUser";
import ChangePassword from "../features/profile/components/ChangePassword";
import FeedbackProduct from "../features/profile/components/FeedbackProduct";
import ComboProductDetail from "../features/comboproduct/components/ComboProductDetail";
import ComboProductPage from "../features/comboproduct/components/ComboProductPage";
import Regulation from "../features/policies/components/Regulation";
import Shipping from "../features/policies/components/Shipping";
import Returns from "../features/policies/components/Returns";
import Warranty from "../features/policies/components/Warranty";
import Privacy from "../features/policies/components/Privacy";
import Security from "../features/policies/components/Security";
import SupportBuy from "../features/policies/components/SupportBuy";
import PaymentGuide from "../features/policies/components/PaymentGuide";
import FeedBack from "../features/policies/components/FeedBack";
import LoginPage from "../features/auth/components/LoginPage";
import RegisterPage from "../features/auth/components/RegisterPage";
import ForgetPage from "../features/auth/components/ForgetPage";
import LoginAdmin from "../features/auth/components/LoginAdmin";
import PaymentPage from "../features/cart/components/Payment";
import PaymentResult from "../features/cart/components/PaymentResult";
import CheckOut from "../features/cart/components/CheckOut";



// import { elements } from "chart.js";


export const routerCustomer = [
  { path: "*", element: <Navigate to="/" /> },

  // Auth layout: không có header/footer
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forget", element: <ForgetPage /> },
      { path: "/admin/login", element: <LoginAdmin /> },
    ],
  },

  // Main layout: có header/footer
  {
    element: <MainLayout />,
    children: [
      // Home & Cart
      { path: "/", element: <HomePage /> },
      { path: "/cart", element: <CartPage /> },

      // Products
      { path: "/products/:id", element: <ProductDetail /> },
      { path: "/category/:id", element: <ProductByCat /> },
      { path: "/category/:id/:itemId", element: <ProductByCatItems /> },
      { path: "/product-sale", element: <ListProductSale /> },
      { path: "/compare", element: <Compare /> },

      // News & Extras
      { path: "/news", element: <News /> },
      { path: "/yt", element: <YouTubeChanel /> },
      { path: "/intro", element: <Intro /> },
      { path: "/hd", element: <HD /> },
      { path: "/game", element: <Game /> },

      // Profile
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "order-history",
            element: <OrderHistory />,
            children: [
              { path: "", element: <OrderCard /> },
              { path: "status/:statusCode", element: <ListOrderByStatus /> },
            ],
          },
          { path: "info-user", element: <InfoUser /> },
          { path: "change-password", element: <ChangePassword /> },
          { path: "feedback", element: <FeedbackProduct /> },
        ],
      },

      // Combo Product
      { path: "/combo-product", element: <ComboProductDetail /> },
      { path: "/combo-product-page", element: <ComboProductPage /> },

      // Cart Payment
      { path: "/payment", element: <PaymentPage /> },
      { path: "/api/v1/vnpay/callback/*", element: <PaymentResult /> },
      { path: "/checkout", element: <CheckOut /> },

      // Policies
      { path: "/regulation", element: <Regulation /> },
      { path: "/shipping", element: <Shipping /> },
      { path: "/returns", element: <Returns /> },
      { path: "/warranty", element: <Warranty /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/security", element: <Security /> },
      { path: "/support-buy", element: <SupportBuy /> },
      { path: "/payment-guide", element: <PaymentGuide /> },
      { path: "/feedback", element: <FeedBack /> },

      // Admin redirect
      { path: "/admin", element: <Navigate to="/admin/login" /> },
    ],
  },
];
