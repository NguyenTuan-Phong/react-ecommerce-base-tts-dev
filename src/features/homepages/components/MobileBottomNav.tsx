import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  EnterOutlined,
  HomeOutlined,
  QrcodeOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import LeftMenu from "./LeftMenu";
import useUserStore from "../../../store/useUserStore";

const MobileBottomNav = () => {
  const location = useLocation();
  const [showCategories, setShowCategories] = useState(false);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setShowCategories(false); 
    }
  };

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);


  

  const menuItems = [
    {
      label: "Trang chủ",
      to: "/",
      icon: <HomeOutlined className="text-xl mb-1" />,
      action: () => {
        window.location.href = "/";
      },
    },
    {
      label: "Danh mục",
      to: "#",
      icon: (
        <svg
          className="w-6 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ),
      action: () => setShowCategories(!showCategories), 
    },
    {
      label: "Tìm kiếm",
      to: "/hotline",
      icon: <QrcodeOutlined className="text-xl mb-1"/>,
      action: () => {
        window.location.href = "/hotline";
      },
    },
    isLoggedIn ? 
    {
      label: "Tài khoản",
      to: "/profile",
      icon: <UserSwitchOutlined className="text-xl mb-1" />,
      action: () => {
        window.location.href = "/profile";
      },
    }
    : 
    {
      label: "Đăng nhập",
      to: "/login",
      icon: <EnterOutlined className="text-xl mb-1" />,
      action: () => {
        window.location.href = "/login";
      },
    },
    
  ];

  return (
    <>
      {/* Overlay khi mở danh mục */}
      {showCategories && (
        <div
          className="fixed top-0 left-0 right-0 bottom-14 z-[9998] bg-black bg-opacity-40"
          onClick={() => setShowCategories(false)}
        />
      )}

      {/* Menu danh mục trái */}
      {showCategories && (
        <>
          <div
            className="fixed top-0 left-0 right-0 bottom-14 z-[9998] bg-black bg-opacity-40"
            onClick={() => setShowCategories(false)}
          />
          <div className="fixed top-0 left-0 right-0 bottom-14 w-full z-[9999] bg-white shadow-xl">
            <LeftMenu/>

          </div>
        </>
      )}



      {/* Thanh điều hướng dưới */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-md border-t border-gray-200 flex justify-around items-center h-14 lg:hidden">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            
            <button
              key={item.label}
              onClick={item.action}
              className={`flex flex-col items-center text-xs focus:outline-none cursor-pointer ${
                isActive ? "text-[#29A07E]" : "text-gray-600"
              }`}
            > 
              {

              }
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default MobileBottomNav;
