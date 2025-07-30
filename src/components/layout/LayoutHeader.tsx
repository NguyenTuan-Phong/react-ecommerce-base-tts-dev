import {
  ShoppingCartOutlined,
  UserSwitchOutlined,
  MenuOutlined,
  NotificationOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CategoriesMenu from "../../features/homepages/components/Menu.tsx";
import Search from "../search/Component/Search.tsx";
import { useCategories } from "../../features/productdetail/hook/useCategories.tsx";
import ViewDataHoverButtonCart from "../../features/cart/components/ViewDataHoverButtonCart.tsx";
import useUserStore from "../../store/useUserStore.ts";
import ThemeToggle from "./ThemeToggle.tsx";

const LayoutHeader = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const categoriesButtonRef = useRef<HTMLButtonElement>(null);
    const categoriesMenuRef = useRef<HTMLDivElement>(null);
    const user = useUserStore((state) => state.user);
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const role = useUserStore((state) => state.user?.role.name);

    //  sticky header
    useEffect(() => {
        const handleScroll = () => {
        const isHome = location.pathname === "/";
        if (isHome) {
            const banner = document.querySelector(".header");
            const bannerHeight = banner ? banner.getBoundingClientRect().height : 0;

            if (window.scrollY > bannerHeight) {
            setIsSticky(true);
            } else {
            setIsSticky(false);
            }
        } else {
            setIsSticky(window.scrollY > 0);
        }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
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
            document.addEventListener("mousedown", handleClick);
            window.addEventListener("scroll", handleScroll);
        }
        return () => {
            document.removeEventListener("mousedown", handleClick);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [showCategories]);

    const [hoverId, setHoverId] = useState<number | null>(null);
    const { data: categoryData } = useCategories();
    const categories = categoryData?.data?.content || [];
    const isfilter = categories.find((item: any) => item.id == hoverId);
    
    const headerRef = useRef<HTMLDivElement>(null);

    const contentCart = <ViewDataHoverButtonCart />;
    const socialLinks = [
        { name: "Shopee", url: "https://shopee.vn/lacdaushop" },
        { name: "Lazada", url: "https://www.lazada.vn/shop/lacdaushop/" },
        { name: "Instagram", url: "https://www.instagram.com/lac.dau/" },
        { name: "Tiktok", url: "https://www.tiktok.com/@lacdaustore" },
        { name: "Youtube", url: "https://www.youtube.com/channel/UC0kL-L4W-QBwgwqCv408J2A" },
        { name: "Facebook", url: "https://www.facebook.com/lacdaustore" },
        ];

    return (
        <header className={`header font-sans w-full overflow-x-hidden`}>
            
            <div className=" items-center gap-2 bg-[#29a07e] py-2  hidden lg:flex px-12">
                <div className="relative group inline-block">
                    {/* Nút Địa chỉ liên hệ */}
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#d4f5c7] to-[#a6f0d5] text-green-800 text-sm font-medium cursor-pointer font-bold">
                        <span className="text-sm">📍</span>
                        <span>Địa chỉ liên hệ</span>
                    </div>
                    <div className="fixed w-[350px] bg-white text-black p-2 shadow-lg rounded-md border border-gray-200 z-20 leading-[2.5rem] hidden group-hover:block font-bold">
                        <div className="bg-[#29a07e] text-[white] p-2 rounded-[10px] py-2">Địa chỉ</div>
                        <p>Địa chỉ: Số 66 Xã Đàn, Phường Phương Liên, Quận Đống Đa, Hà Nội</p>
                        <p>Số điện thoại: 0349296461</p>
                        <p>Địa chỉ email: Lacdaushop@gmail.com</p>
                        <p>Giờ mở cửa: 8h30 - 21h30</p>
                    </div>
                </div>
                <div className="relative group inline-block">
                    {/* Nút Hotline */}
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#d4f5c7] to-[#a6f0d5] text-green-800 text-sm font-medium cursor-pointer font-bold">
                        <PhoneOutlined />
                        <span>Hotline trực tuyến</span>
                    </div>
                    <div className="fixed w-[350px] bg-white text-black p-2 shadow-lg rounded-md border border-gray-200 z-20 leading-[2.5rem] hidden group-hover:block font-bold">
                        <div className="bg-[#29a07e] text-[white] p-2 rounded-[10px] py-2">Hotline</div>
                        <p>Số điện thoại: 0349296461</p>
                        <p>Địa chỉ email: Lacdaushop@gmail.com</p>
                    </div>
                </div>
                <div className="flex gap-4 text-white text-sm">
                <div className="flex gap-4 !text-white text-sm">
                {socialLinks.map(({ name, url }) => (
                    <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 !text-white hover:underline"
                    >
                    {name}
                    </a>
                ))}
                </div>
                </div>
            </div>


            <div
                ref={headerRef}
                className={`bg-white w-full z-50 transition-all duration-300 min-h-[110px] border-b border-gray-300 ${
                    isSticky ? "fixed top-0 shadow-lg" : "" } justify-center flex`}
                style={{
                    left: 0,
                    right: 0,
                    overflow: "visible",
                }}>
                    <div className="w-full flex items-center justify-between flex-nowrap gap-1 px-4 sm:px-4 md:px-8 lg:px-10 overflow-x-hidden">
                    {/* Logo */}
                        {role === "ROLE_MANAGER" ? (
                            <Link
                                to="/admin"
                                className="text-center min-w-[180px] justify-items-center hover:cursor-pointer">
                                <img src="/images/logo.png" alt="LOGO" className="h-[75px]" />
                            </Link>
                        ) : (
                            <div className="w-auto shrink-0">
                                <Link to="/">
                                    <img
                                    src="/images/logo.png"
                                    alt="Logo"
                                    className="h-[60px] sm:h-[75px] w-auto"
                                    />
                                </Link>
                            </div>
                        )}

                    {role !== "ROLE_MANAGER" && (
                        <div className="relative flex items-center gap-5 ml-4 justify-end lg:justify-between relative flex-1 min-w-0">
                                <button
                                    ref={categoriesButtonRef}
                                    className=" hidden lg:flex bg-[#22a085] text-white rounded-[10px] px-[20px] py-[10px] font-bold text-lg flex gap-1 cursor-pointer"
                                    onClick={() => {
                                    const isHome = location.pathname === '/';
                                    if (!isHome || isSticky) {
                                        setShowCategories(prev => !prev);
                                    }
                                    }}

                                    >
                                    <MenuOutlined />
                                    DANH MỤC
                                    </button>

                                    {showCategories && headerRef.current && (
                                        <div
                                            ref={categoriesMenuRef}
                                            className="fixed left-0 w-full z-[9999] shadow-md ml-15"
                                            style={{
                                                top: headerRef.current.getBoundingClientRect().bottom,
                                            }}
                                            onMouseEnter={() => setShowCategories(true)}
                                            onMouseLeave={() => setShowCategories(false)}
                                        >
                                            <CategoriesMenu />

                                        {!!(hoverId && isfilter && isfilter.type)&& (
                                            <div
                                                className="max-w-[850px] h-full bg-white rounded-r-[18px] shadow-xl grid grid-cols-4 gap-2 p-4"
                                                style={{ minHeight: 687, minWidth: 600 }}
                                                onMouseEnter={() => setHoverId(hoverId)}
                                            >

                                            </div>
                                        )}
                                    </div>
                                )}

                            <div className="flex items-center gap-3 flex-1 max-w-[600px] min-w-[100px]">
                            <Search />
                            <ThemeToggle />
                            </div>

                        </div>
                    )}

                    <div className="flex items-center gap-8 ml-8">
                        {role !== "ROLE_MANAGER" && (
                            <>
                                <span className="hidden lg:flex items-center gap-2 h-[40px] mr-[30px]! font-bold!">
                                   
                                    <NotificationOutlined className="font-bold!" />
                                    <Link className="text-[black]! text-[16px]!" to="/news">
                                        Tin tức
                                    </Link>
                                </span>
                                <div className="w-auto shrink-0 flex items-center gap-3">
                                    <Popover placement="bottomRight" content={contentCart}>
                                        <Link
                                            to={"/cart"}
                                            className="border-2 border-[#22a085] rounded-[14px] bg-white flex items-center gap-2 px-[16px] py-[10px] text-lg font-semibold text-gray-700 relative">
                                            <ShoppingCartOutlined className="text-[#22a085] text-2xl" />
                                            <span className="hidden lg:inline">Giỏ hàng</span>
                                        </Link>
                                    </Popover>
                                </div>
                            </>
                        )}

                        {isLoggedIn ? (
                            <Link
                                to={"/profile"}
                                className={`hidden lg:flex gap-2 ${ role !== "ROLE_MANAGER" && "text-[black]! text-[16px]" }`}
                                >
                                    <UserOutlined style={{ fontWeight: "bold", fontSize: 22 }} />
                                    <b className="hover:cursor-pointer ">{user?.username}</b>
                            </Link>
                            ) : (
                            <div className="hidden lg:flex items-center gap-2 text-[black]! ">
                                <UserSwitchOutlined size={22} />
                                <Link className="text-[black]! text-[16px]!" to="/register">
                                    Register
                                </Link>
                                <p>/</p>
                                <Link className="text-[black]! text-[16px]!" to="/login">
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isSticky && <div style={{ height: "110px" }}></div>}
        </header>
    );
};

export default LayoutHeader;