import { AppstoreAddOutlined, BarChartOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PayCircleOutlined, ProductOutlined, ShoppingCartOutlined, TagsOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const LayoutAdmin = () => {
    const location = useLocation();
    const pathKeyMap: { pattern: RegExp; key: string }[] = [
    { pattern: /^\/admin(\/)?$/, key: "admin" },
    { pattern: /^\/admin\/(prod-management|add-product|prod-detail-admin)/, key: "prod-management" },
    { pattern: /^\/admin\/management-category/, key: "management-category" },
    { pattern: /^\/admin\/publisher-management/, key: "publisher-management" },
    { pattern: /^\/admin\/management-voucher/, key: "management-voucher" },
    { pattern: /^\/admin\/management-order/, key: "management-order" },
    ];

    const getSelectedKey = (pathname: string): string => {
    for (const { pattern, key } of pathKeyMap) {
        if (pattern.test(pathname)) return key;
    }
    return "admin";
    };

const selectedKey = getSelectedKey(location.pathname);
    const [collapsed, setCollapsed] = useState(false);

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
            label: <Link to={'prod-management'}>Quản lý Sản phẩm</Link>,
        },
        {
            key: 'management-category',
            icon: <AppstoreAddOutlined />,
            label: <Link to={'management-category'}>Quản lý Loại sản phẩm</Link>,
        },
        {
            key: 'publisher-management',
            icon: <UserSwitchOutlined />,
            label: <Link to={'publisher-management'}>Quản lý Publisher</Link>,
        },
        {
            key: 'management-voucher',
            icon: <TagsOutlined />,
            label: <Link to={'management-voucher'}>Quản lý Khuyến mại</Link>,
        },
        {
            key: 'management-order',
            icon: <ShoppingCartOutlined />,
            label: <Link to={'management-order'}>Quản lý Đơn hàng</Link>,
        },
        {
            key: 'management-flashsale',
            icon: <PayCircleOutlined />,
            label: <Link to={'management-flashsale'}>Quản lý chiến dịch giảm giá</Link>,
        },
    ];


    return (
        <div className="flex gap-5 h-[calc(112vh-110px)]">
            <aside className={`bg-white transition-all duration-300 ${collapsed ? 'w-[80px]!' : 'w-[300px]!'} flex-shrink-0 flex flex-col h-full`}>
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
                        className="text-[16px] font-bold"
                    />
                </div>
            </aside>


            <main className="flex-1 p-2 md:p-5 overflow-hidden min-h-[400px]">
                <div className="bg-white h-full p-2 md:p-5 rounded-[8px] w-full">
                <Outlet />
                </div>
            </main>
        </div>
    );
};

export default LayoutAdmin;
