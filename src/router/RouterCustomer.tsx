import { Navigate } from "react-router-dom"
import HomePage from "../features/homepages/components/HomePage/HomePages"
import LoginPage from "../features/auth/components/LoginPage"
import RegisterPage from "../features/auth/components/RegisterPage"
import CartPage from "../features/cart/components/CartPage"
import ForgetPage from "../features/auth/components/ForgetPage"
import ProductDetail from "../features/productdetail/components/ProductDetail"
import News from "../features/news/components/News"
import YouTubeChanel from "../features/news/components/YoutubeChanel"
import Intro from "../features/news/components/Intro"
import HD from "../features/news/components/HD"
import Profile from "../features/profile/components/Profile"
import OrderHistory from "../features/profile/components/OrderHistory"
import InfoUser from "../features/profile/components/InfoUser"
import ChangePassword from "../features/profile/components/ChangePassword"
import Game from '../features/news/components/Game';
import ProductByCat from "../features/productdetail/components/ProductByCat"
import ProductByCatItems from "../features/productdetail/components/ProductByCatItems"
import OrderCard from "../features/profile/components/OrderCard"
import ListOrderByStatus from "../features/profile/components/ListOrderByStatus"
import FeedbackProduct from "../features/profile/components/FeedbackProduct"
import LoginAdmin from "../features/auth/components/LoginAdmin"
import ListProductSale from "../features/flashSale/Component/ListProductSale"
export const routerCustomer = [

        {path : '*', element : <Navigate to="/" />},
        {
            path : '/',
            element : <HomePage />
        },
        {
            path: '/login',
            element : <LoginPage />
        },
        {
            path: '/register',
            element : <RegisterPage />
        },
        {
            path: 'cart',
            element : <CartPage />
        },
        {
            path: '/forget',
            element: <ForgetPage />
        },
        {
            path:"/products/:id",
            element : <ProductDetail />
        },
        {
            path:'/news',
            element : <News />
        },
        {
            path:'/yt',
            element : <YouTubeChanel />
        },
        {
            path:'/intro',
            element : <Intro/>
        },
        {
            path:'/game',
            element : <Game/>
        },
        {
            path:'/hd',
            element : <HD/>
        },
       
        {

            path:"/category/:id",
            element: <ProductByCat />
        } ,
        {
            path:"/category/:id/:itemId",
            element:<ProductByCatItems />
        },
        {
            path: '/profile',
            element: <Profile />,
            children: [
                {
                    path:'order-history',
                    element: <OrderHistory />,
                    children: [
                        {
                            path: '',
                            element: <OrderCard />
                        },
                        {
                            path: 'status/:statusCode',
                            element: <ListOrderByStatus />
                        }
                    ]
                },
                {
                    path:'info-user',
                    element: <InfoUser />
                },
                {
                    path:'change-password',
                    element: <ChangePassword />
                },
                {
                    path: 'feedback',
                    element: <FeedbackProduct />
                }

            ]
        },
        {
            path: 'product-sale',
            element: <ListProductSale />
        },
        {
            path: 'admin',
            element: <Navigate to="/admin/login" />
        },
        {
            path: 'admin/login',
            element: <LoginAdmin />
        }
    ]
