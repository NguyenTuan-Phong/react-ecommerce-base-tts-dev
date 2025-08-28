import { AppstoreAddOutlined, BarChartOutlined, BellOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PayCircleOutlined, ProductOutlined, ShoppingCartOutlined, TagsOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import SVGCombo from '../svg/Combo';
import useUserStore from '../../store/useUserStore';

const MainLayoutAdmin = () => {
    const location = useLocation();
    const pathKeyMap: { pattern: RegExp; key: string }[] = [
        { pattern: /^\/admin(\/)?$/, key: "admin" },
        { pattern: /^\/admin\/(prod-management|add-product|prod-detail-admin)/, key: "prod-management" },
        { pattern: /^\/admin\/management-category/, key: "management-category" },
        { pattern: /^\/admin\/publisher-management/, key: "publisher-management" },
        { pattern: /^\/admin\/management-voucher/, key: "management-voucher" },
        { pattern: /^\/admin\/(management-order|view-detail-order)/, key: "management-order" },
        { pattern: /^\/admin\/(management-flashsale|view-detail-flashsale\/\d+|create-flashsale|update-flashsale)/, key: "management-flashsale" },
        { pattern: /^\/admin\/(management-combo|view-detail-combo\/\d+|create-combo|update-combo)/, key: "management-combo" },
    ];


    const getSelectedKey = (pathname: string): string => {
        for (const { pattern, key } of pathKeyMap) {
            if (pattern.test(pathname)) return key;
        }
        return "admin";
    };

const selectedKey = getSelectedKey(location.pathname);
    const [collapsed, setCollapsed] = useState(false);
    const username = useUserStore().user?.username
    const toggleMenu = () => {
        setCollapsed(!collapsed);
    };

    const menuItems = [
        {
            key: 'admin',
            icon: <BarChartOutlined />,
            label: <Link to={''}>DashBoard</Link>,
        },
        {
            key: 'prod-management',
            icon: <ProductOutlined />,
            label: <Link to={'admin/prod-management'}>Quản lý Sản phẩm</Link>,
        },
        {
            key: 'management-category',
            icon: <AppstoreAddOutlined />,
            label: <Link to={'admin/management-category'}>Quản lý Loại sản phẩm</Link>,
        },
        {
            key: 'publisher-management',
            icon: <UserSwitchOutlined />,
            label: <Link to={'admin/publisher-management'}>Quản lý Publisher</Link>,
        },
        {
            key: 'management-voucher',
            icon: <TagsOutlined />,
            label: <Link to={'admin/management-voucher'}>Quản lý Khuyến mại</Link>,
        },
        {
            key: 'management-order',
            icon: <ShoppingCartOutlined />,
            label: <Link to={'admin/management-order'}>Quản lý Đơn hàng</Link>,
        },
        {
            key: 'management-flashsale',
            icon: <PayCircleOutlined />,
            label: <Link to={'admin/management-flashsale'}>Quản lý chiến dịch giảm giá</Link>,
        },
        {
            key: 'management-notification',
            icon: <BellOutlined />,
            label: <Link to={'admin/management-notification'}>Quản lý thông báo</Link>,
        },
        {
            key: 'management-combo',
            icon: <SVGCombo />,
            label: <Link to={'admin/management-combo'}>Quản lý Combo sản phẩm</Link>,
        },
        {
            key: 'management-article',
            icon: <BellOutlined />,
            label: <Link to={'admin/management-article'}>Quản lý Blog</Link>
        },
    ];


    return (
        <div>
            <div className='h-20 border-b border-gray-300 flex'>
                <div className='pl-20'>
                    <Link
                        to='/admin'
                        className='text-center min-w-[180px] justify-items-center hover:cursor-pointer'
                    >
                        <img src='/images/logo.png' alt='LOGO' className='h-[75px]' />
                    </Link>
                </div>
                <div className='flex-1'></div>
                <div className='items-center flex justify-center pr-20 gap-5'>
                    <b>{username}</b>
                    <Link to={'/admin/login'}>
                        <LogoutOutlined 
                            className='text-[40px] hover:text-orange-500!'
                        />
                    </Link>
                    
                </div>
                
            </div>
            <div className="flex gap-5 h-[calc(100vh-80px)]">
                <aside className={`bg-white transition-all duration-300 ${collapsed ? 'w-[80px]!' : 'w-[300px]!'} flex-shrink-0 
                                flex flex-col h-full border-r border-gray-300`}>
                    <div className="flex-1 overflow-auto">
                        <div className="flex justify-end pr-7 py-2">
                            <button onClick={toggleMenu} className="text-xl cursor-pointer">
                                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            </button>
                        </div>
                        <Menu
                            mode="inline"
                            items={menuItems}
                            selectedKeys={[selectedKey]}
                            inlineCollapsed={collapsed}
                            className="text-[16px] font-bold border-none"
                            style={{ borderInlineEnd: "none" }}
                        />
                    </div>
                </aside>


                <main className="flex-1 p-2 md:p-5 overflow-hidden min-h-[400px]">
                    <div className="bg-white h-full p-2 md:p-5 rounded-[8px] w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayoutAdmin;