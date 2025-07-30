import { Link } from "react-router-dom";
import { useState, type JSX } from "react";
import {
  AliyunOutlined,
  MinusSquareOutlined,
  ApartmentOutlined,
  ProductOutlined,
  HourglassOutlined,
  AudioOutlined,
  QrcodeOutlined
} from "@ant-design/icons";
import { useCategories } from "../../productdetail/hook/useCategories";

const iconMap: Record<number, JSX.Element | null> = {
  1: <AliyunOutlined />,
  2: <ApartmentOutlined />,
  3: <ProductOutlined />,
  4: <MinusSquareOutlined />,
  5: <HourglassOutlined />,
  6: <AudioOutlined />,
  7: <AliyunOutlined />,
  8: <QrcodeOutlined />,
  9: null,
  10: null,
  11: null
};

const CategoriesMenu = () => {
  const [hoverId, setHoverId] = useState<number | null>(null);
  const { data: categoryData, isLoading, isError } = useCategories();
  const categories = categoryData?.data || [];

  const selectedCategory = categories.find((item: any) => item.id === hoverId);



  if (isLoading) return <div>Đang tải danh mục...</div>;
  if (isError) return <div>Lỗi khi tải danh mục...</div>;

  return (
    <div
      className="flex h-[680px] w-full max-w-none"
      onMouseLeave={() => setHoverId(null)}
    >
      {/* Menu cha */}
      <div className=" relative flex flex-col text-[20px] rounded-[10px] bg-white h-full w-[320px]! overflow-y-auto  border border-gray-300 
        [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent]
        [&::-webkit-scrollbar]:w-2 
        [&::-webkit-scrollbar-track]:bg-transparent 
        [&::-webkit-scrollbar-thumb]:bg-gray-300 
        [&::-webkit-scrollbar-thumb]:rounded-md 
        [&::-webkit-scrollbar-track]:border-l 
        [&::-webkit-scrollbar-track]:border-gray-300
      ">
        {categories.map((item: any) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoverId(item.id)}
            className="group"
          >
            <Link
              key={item.id}
              to={`/category/${item.id}`}
              style={{ color: "black" }}
              className="flex-1"
            >
              <div className="hover:bg-[#22a085] flex flex-col md:flex-row items-center md:gap-4 gap-1 hover:text-white py-2 px-3 sm:text-left">
                <div className="text-[30px] w-[40px] h-[50px]">
                  {iconMap[item.id] ?? null}
                </div>
                 <p className="text-[16px] leading-tight">{item.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Menu con */}

    {selectedCategory?.categoryItems?.length > 0 && (

      <div className="absolute left-[320px] top-0 w-[1100px] h-full bg-white rounded-[10px]
        shadow-xl grid grid-cols-4 gap-2 z-50 auto-rows-[60px] p-5">
        {selectedCategory.categoryItems.map((child: any) => (
          <Link
            key={child.id}
            to={`/category/${selectedCategory.id}/${child.id}`}
            className="text-[14px] text-[#29A07E] hover:underline pb-2 block leading-tight"

            style={{ color: '#29A07E' }}
          >
            {child.name.toUpperCase()}
          </Link>
        ))}
      </div>
    )}

    </div>
  );
};

export default CategoriesMenu;