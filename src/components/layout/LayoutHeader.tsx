import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // thêm useLocation
import useUserStore from '../../store/useUserStore';
import { useCart } from '../../features/cart/hook';
import ViewDataHoverButtonCart from '../../features/cart/components/ViewDataHoverButtonCart';
import { HeaderTop } from './HeaderTop';
import QR from '../svg/QR';
import SearchByImage from '../search/Component/SearchByImage';
import { Badge, Popover } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Notification from '../Notification/component/Notification.tsx'; 
import Search from '../search/Component/Search.tsx';
const LayoutHeader = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const categoriesButtonRef = useRef<HTMLButtonElement>(null);
  const categoriesMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation(); 

  const role = useUserStore((state) => state.user?.role.name);
  const [showSearch, setShowSeach] = useState(false);
  const { dataCartItem } = useCart();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // Sticky
  useEffect(() => {
    const handleScroll = () => {
      const isHome = location.pathname === '/';
      if (isHome) {
        const banner = document.querySelector('.header');
        const bannerHeight = banner ? banner.getBoundingClientRect().height : 0;
        setIsSticky(window.scrollY > bannerHeight);
      } else {
        setIsSticky(window.scrollY > 0);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

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

  const headerRef = useRef<HTMLDivElement>(null);
  const dataCartItemMemo = useMemo(() => {
    return {
      cartItems: dataCartItem?.data?.cartItems || [],
      comboItems: dataCartItem?.data?.comboItems || [],
    };
  }, [dataCartItem]);

  const contentCart = (
    <ViewDataHoverButtonCart
      dataCartItem={dataCartItemMemo.cartItems}
      comboItems={dataCartItemMemo.comboItems}
    />
  );

  return (
    <header className="header font-sans w-full overflow-x-hidden">
      
      {!isAuthPage && role !== 'ROLE_MANAGER' && <HeaderTop role={role} />}

      <div
        ref={headerRef}
        className={`bg-white w-full z-50 transition-all duration-300 min-h-[80px] border-b border-gray-300 ${
          isSticky ? 'fixed top-0 shadow-lg' : ''
        } justify-center flex`}
        style={{
          left: 0,
          right: 0,
          overflow: 'visible',
        }}
      >
        <div className='w-full flex items-center justify-center  flex-nowrap gap-1 px-4 sm:px-4 md:px-8 lg:px-10 overflow-x-hidden'>
          {role === 'ROLE_MANAGER' ? (
            <div className='flex items-center gap-4 min-w-[200px]'>
              <Link
                to='/admin'
                className='text-center min-w-[180px] justify-items-center hover:cursor-pointer'
              >
                <img src='/images/logo.png' alt='LOGO' className='h-[75px]' />
              </Link>
            </div>
          ) : (
            <div className='w-auto shrink-0 flex items-center gap-5'>
              <Link to='/'>
                <img src='/images/logo.png' alt='Logo' className='h-[60px] sm:h-[75px] w-auto' />
              </Link>
            </div>
          )}

          {role !== 'ROLE_MANAGER' && (
            <div className='flex items-center gap-5 ml-4 justify-center lg:justify-around relative flex-1 min-w-0'>

              <Search />
            </div>
          )}

          {!isAuthPage && role !== 'ROLE_MANAGER' && (
            <div className="flex items-center gap-6">
              <Notification />
              <div className="pr-5">
                <QR
                  className="cursor-pointer relative"
                  onClick={() => setShowSeach((prev) => !prev)}
                />
                {showSearch && (
                  <div className={`absolute right-0 ${isSticky ? 'top-20' : 'top-31'}`}>
                    <SearchByImage setShowSeach={setShowSeach} />
                  </div>
                )}
              </div>
              <Popover placement="bottomRight" content={contentCart}>
                <Link
                  to="/cart"
                  className="flex items-center gap-3 hover:bg-orange-50 transition-all duration-300 rounded-xl px-4"
                >
                  <Badge
                    count={
                      dataCartItemMemo.cartItems.length + dataCartItemMemo.comboItems.length
                    }
                    offset={[5, 5]}
                  >
                    <ShoppingCartOutlined className="text-2xl" />
                    <span className="hidden lg:inline">Giỏ hàng</span>
                  </Badge>
                </Link>
              </Popover>
            </div>
          )}
        </div>
      </div>

      {isSticky && <div style={{ height: '110px' }}></div>}
    </header>
  );
};

export default LayoutHeader;
