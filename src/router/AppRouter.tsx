import { useRoutes , Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/components/LoginPage';
import RegisterPage from '../features/auth/components/RegisterPage';
import HomePage from '../features/homepages/components/HomePage/HomePages';
import CartPage from '../features/cart/components/CartPage';
import ProductDetail from '../features/productdetail/components/ProductDetail';
import ForgetPage from '../features/auth/components/ForgetPage';
import Pay from '../features/cart/components/Pay';
import News from '../features/news/components/News';
import YouTubeChanel from '../features/news/components/YoutubeChanel';
import Intro from '../features/news/components/Intro';
import Game from '../features/news/components/Game';
import HD from '../features/news/components/HD';
import ProductListPage from '../features/productdetail/components/ProductListPage';
import Profile from '../features/profile/components/Profile';
import OrderHistory from '../features/profile/components/OrderHistory';
import InfoUser from '../features/profile/components/InfoUser';
import ViewListOrder from '../features/profile/components/ViewListOrder';
import ChangePassword from '../features/profile/components/changepassword';
const AppRouter = () => {

    const router = [
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
            path:'/pay',
            element : <Pay data={{
                total: 0,
                totalPrice: 0
            }} />
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
            path:'/product-list-page',
            element : <ProductListPage/>
        },
        {

            path:"/category/:id",
            element: <ProductListPage />
        } ,
        {
            path:"/category/:id/:childrenId",
            element:<ProductListPage />
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
                            element: <ViewListOrder />
                        }
                    ]
                },
                {
                    path:'info-user',
                    element: <InfoUser />
                },        
                {
                    path:'change-password',
                    element: <ChangePassword/>
                }
            ]
        },

    ]
    return (
        useRoutes(router)
    )
}

export default AppRouter;