// LeftMenu.tsx
import { useEffect, useState, type JSX } from "react";
import { useCategories } from "../../productdetail/hook/useCategories";
import {
  AliyunOutlined,
  MinusSquareOutlined,
  ApartmentOutlined,
  ProductOutlined,
  HourglassOutlined,
  AudioOutlined,
  QrcodeOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

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
  11: null,
};

const LeftMenu = () => {
  const { data: categoryData, isLoading, isError } = useCategories();
  const parentCategories = categoryData?.data || [];

  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);

  const selectedCategory = parentCategories.find((cat: any) => cat.id === selectedParentId);
    useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth > 1024) {
        setSelectedParentId(null);
        }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);



  

  if (isLoading) return <div>Đang tải danh mục...</div>;
  if (isError) return <div>Lỗi khi tải danh mục...</div>;

  return (
    <div className="flex h-full bg-white relative">
      {/* Danh mục cha */}
      <div className="flex flex-col text-[14px] bg-white w-[150px] max-h-full overflow-y-auto border-r-[1px] border-gray-300">
        {parentCategories.map((item: any) => (
          <div
            key={item.id}
            onClick={() =>
              setSelectedParentId(prev => (prev === item.id ? null : item.id))
            }
            className={`group cursor-pointer hover:bg-[#22a085] hover:text-white py-2 px-3 ${
              selectedParentId === item.id ? "bg-[#22a085] text-white" : ""
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="text-[22px] w-[30px] h-[30px]">
                {iconMap[item.id] ?? null}
              </div>
              <p>{item.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Danh mục con */}
      {selectedParentId !== null && selectedCategory?.categoryItems?.length > 0 && (
        <div className="flex-1 h-full bg-white
           z-10 p-4 leading-[1.8rem] overflow-y-auto">

          {/* Xem thêm */}
          <div className="mb-3 pb-2 border-b">
            <Link
              to={`/category/${selectedCategory.id}`}
              onClick={() => {
                setSelectedParentId(null);
                window.scrollTo(0, 0); 
              }}
              className="text-right block text-[#29A07E] hover:underline"
            >
              Xem thêm
            </Link>
          </div>

          {/* danh mục con */}
          <div className="grid grid-cols-2 gap-y-1 gap-x-1">
            {selectedCategory.categoryItems.map((child: any) => (
              <Link
                to={`/category/${selectedCategory.id}/${child.id}`}
                key={child.id}
                className="cursor-pointer hover:underline px-2 py-1 text-[#29A07E]"
              >
                {child.name}
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default LeftMenu;