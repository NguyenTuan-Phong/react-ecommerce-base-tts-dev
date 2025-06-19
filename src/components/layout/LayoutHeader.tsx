import {
    PhoneOutlined,
    ThunderboltOutlined,
    ShoppingCartOutlined,
    UserSwitchOutlined,
    CustomerServiceOutlined,
    EnvironmentOutlined,
    MenuOutlined,
    NotificationOutlined,
    UserOutlined
} from '@ant-design/icons'
import { Popover } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import CategoriesMenu from '../../features/homepages/components/Menu.tsx';
import Search from '../search/Component/Search.tsx';
import { useCategories } from '../../features/productdetail/hook/useCategories.tsx';
import ViewDataHoverButtonCart from '../../features/cart/components/ViewDataHoverButtonCart.tsx';
import useUserStore from '../../store/useUserStore.ts';

const LayoutHeader = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const categoriesButtonRef = useRef<HTMLButtonElement>(null);
    const categoriesMenuRef = useRef<HTMLDivElement>(null);
    const {user, isLoggedIn} = useUserStore();
    //  sticky header
    useEffect(() => {
        const handleScroll = () => {
            const banner = document.querySelector('.banner');
            const bannerHeight = banner? banner.getBoundingClientRect().height :0;
            if (window.scrollY > bannerHeight) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // đóng menu danh mục khi cuộn
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                categoriesMenuRef.current &&
                !categoriesMenuRef.current.contains(e.target as Node) &&
                categoriesButtonRef.current &&
                !categoriesButtonRef.current.contains(e.target as Node)
            ) {
                setShowCategories(false);
            }
        };
        const handleScroll = () => setShowCategories(false);

        if (showCategories) {
            document.addEventListener('mousedown', handleClick);
            window.addEventListener('scroll', handleScroll);
        }
        return () => {
            document.removeEventListener('mousedown', handleClick);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [showCategories]);

    const [hoverId, setHoverId] = useState<number | null>(null);
    const { data: categoryData } = useCategories();
    const categories = categoryData?.data?.content || [];    
    const isfilter = categories.find((item:any)=>item.id==hoverId);

    console.log(hoverId);
    
    const contentCart = (
        <ViewDataHoverButtonCart />
    );

    
    return (
        <header className="font-sans">
            {/* Top Bar */}
            <div className="bg-[#22a085] text-white text-base w-full">
                <div className="max-w-[1400px] flex items-center justify-between mx-auto" style={{padding:'5px 70px 5px 70px'}}>
                    <div className="flex gap-3"> 
                        <p className="bg-[#d6f5d6] text-[#22a085] font-medium gap-1
                        rounded-[20px] flex items-center text-xs h-[32px] px-[12px] py-[12px]">
                            <EnvironmentOutlined className="mr-[6px]" /> Địa chỉ liên hệ
                        </p>
                        <p className="bg-[#d6f5d6] text-[#22a085] font-medium rounded-[20px] 
                        flex items-center text-xs h-[32px] gap-1 px-[12px] py-[12px]">
                            <CustomerServiceOutlined className="mr-[6px]" />
                            Hotline trực tuyến
                        </p>
                    </div>
                    <div className="flex gap-6 items-center">
                        <span className="flex items-center gap-2 h-[40px] mr-[30px]!">
                            <NotificationOutlined />
                            <Link style={{color:'white'}} to='/news'>Tin tức</Link>
                            
                        </span>
                        {isLoggedIn ? (
                            <Link to={'/profile'} className='flex gap-2 text-[white]!'>
                                <UserOutlined style={{fontWeight: 'bold', fontSize : 20}}/>
                                <b className='hover:cursor-pointer'>{user?.username}</b>
                            </Link>
                            
                        ) : (
                            <div className="flex items-center gap-2">
                                <UserSwitchOutlined size={22} />
                                <Link style={{color:'white'}} to='/register'>Register</Link>
                                <p>/</p>
                                <Link style={{color:'white'}} to='/login'>Login</Link>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div
                className={`bg-white w-full z-50 transition-all duration-300 ${isSticky ? 'fixed top-0 shadow-lg' : ''}`}
                style={{
                    left: 0,
                    right: 0,
                }}
            >
                <div className="max-w-[1400px] w-full flex items-center justify-between mx-auto" style={{padding:'0 20px 0 20px'}}>
                    {/* Logo */}
                    <Link to="/" className="text-center min-w-[180px] justify-items-center hover:cursor-pointer">  
                        <div className="font-bold text-2xl text-gray-600">LẮC ĐẦU</div>
                        <svg width="120" height="60" viewBox="0 0 120 60">
                            <ellipse cx="60" cy="30" rx="30" ry="18" fill="none" stroke="#888" strokeWidth="3" />
                            <ellipse cx="60" cy="30" rx="18" ry="10" fill="none" stroke="#888" strokeWidth="3" />
                            <circle cx="60" cy="30" r="4" fill="#888" />
                            <circle cx="48" cy="30" r="2" fill="#888" />
                            <circle cx="72" cy="30" r="2" fill="#888" />
                            <path d="M50 30 Q60 40 70 30" stroke="#888" strokeWidth="2" fill="none" />
                        </svg>
                    </Link>

                    {/* Danh mục + Search */}
                    <div className="flex-1 flex items-center gap-5 ml-8 justify-between relative">
                        <button
                            ref={categoriesButtonRef}
                            className="bg-[#22a085] text-white rounded-[10px] px-[20px]
                            py-[10px] font-bold text-lg flex  gap-1 cursor-pointer"
                            onClick={() => {
                                if (isSticky) setShowCategories(prev => !prev);
                            }}
                        >
                            <MenuOutlined/>
                            DANH MỤC
                        </button>
                        {/* Categories Menu  */}
                        {showCategories && (
                            <div
                                ref={categoriesMenuRef}
                                className="absolute left-0 top-full z-50"
                                style={{marginTop: '8px'}}
                                onMouseEnter={() => setShowCategories(true)}
                                onMouseLeave={() => setShowCategories(false)}
                            >
                                <CategoriesMenu onHoverIdChange={setHoverId} />

                                {!!(hoverId && isfilter && isfilter.type)&& (
                                    <div
                                        className="absolute top-0 left-[260px] z-20 bg-white rounded-[20px] shadow-xl p-6 grid grid-cols-4 gap-2"
                                        style={{ minHeight: 687, minWidth: 600 }}
                                        onMouseEnter={() => setHoverId(hoverId)}
                                    >

                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex-1 flex justify-end mt-8">
                            <Search />
                        </div>
                    </div>

                    {/* Hotline + Tư vấn + Cart */}
                    <div className="flex items-center gap-8 ml-8">
                        <div className="flex items-center gap-2">
                            <PhoneOutlined style={{color :'#22a085' ,fontSize : 32}}/>
                            <div className='flex hover:cursor-pointer'>
                                <p className='hover:text-[#22a085] text-[16px]'>Hotline</p>
                                <p className='text-[#22a085] pl-1 '>0377648322</p>
                            </div>
                        </div>
                        <div className="h-[40px] border-l border-gray-300"></div>
                        <div className="flex items-center gap-2 hover:cursor-pointer">
                            <ThunderboltOutlined style={{color : '#22a085', fontSize:32}} />
                            <span className="text-lg text-700 hover:text-[#22a085]">Tư vấn trực tiếp</span>
                        </div>
                        <Popover placement='bottomRight' content={contentCart}>
                            <Link to={'/cart'} className="border-2 border-[#22a085] rounded-[14px] bg-white flex items-center gap-2 px-[28px] py-[12px] text-lg font-semibold text-gray-700 relative">
                                    <ShoppingCartOutlined className="text-[#22a085] text-2xl" />
                                 Giỏ hàng
                            </Link>
                        </Popover>
                    </div>
                </div>
            </div>
            {isSticky && <div style={{height: '96px'}}></div>}          

        </header>
    );
};

export default LayoutHeader;