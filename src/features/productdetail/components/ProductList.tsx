import { Card } from "antd";
import React, { useState } from "react";
import { useCategories } from "../../productdetail/hook/useCategories";
import {
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";
import type { Category } from "../../../types";
import { useProducts } from "../hook/useProduct";
import { useCart } from "../../cart/hook/useCart";
import useAddCart from "../../cart/hook/useAddCart";
import ImageWithFallback from "../../../components/img/ImageWithFallback";
import SliderButton from "../../../components/button/SliderButton";
import useResponsiveProductCount from "../../../components/responsive/useResponsiveProductCount";

const ProductList: React.FC = () => {

  const { data: categoryData, isError } = useCategories();
const categories: Category[] = Array.isArray(categoryData?.data)
  ? categoryData.data
  : [];
const navigate = useNavigate();

const { refetchCart } = useCart(); // lấy lại cart
const { handleAddCart } = useAddCart(refetchCart);
const userId = useUserStore((state) => state.user?.id);

const [indices, setIndices] = useState<Record<number, number>>({});

const getIndex = (catId: number) => indices[catId] || 0;
const updateIndex = (catId: number, newIndex: number) => {
  setIndices((prev) => ({ ...prev, [catId]: newIndex }));
};

const { data: groupedProducts } = useProducts(categories);
const visibleCount = useResponsiveProductCount(); 



  if (isError) return <div>Lỗi khi tải danh mục...</div>;
  
  return (
    <div>
      {categories.map((cat) => {
      const productsInCategoryRaw = groupedProducts?.[cat.id] || [];

      // Loại bỏ trùng sản phẩm theo id
      const productsInCategory = Array.from(
        new Map(productsInCategoryRaw.map(p => [p.id, p])).values()
      );

      if (productsInCategory.length === 0) return null;

      const index = getIndex(cat.id);
      const maxIndex = Math.max(0, Math.floor((productsInCategory.length - visibleCount) / visibleCount));

        const goNext = () => {
          if (index < maxIndex) updateIndex(cat.id, index + 1);
        };

        const goPrev = () => {
          if (index > 0) updateIndex(cat.id, index - 1);
        };


        return (
          <div key={cat.id} className="mt-5 mb-10 bg-white rounded-xl p-3">
            <div className="flex justify-between items-center flex-wrap px-2">
              <h2 className="text-xl font-bold uppercase">{cat.name}</h2>
              <div className="flex gap-5">
                <div className="flex gap-2 ">
                  {(cat.categoryItems || []).slice(0, 2).map((item) => (
                    <div
                        key={item.id}
                        onClick={() => navigate(`/category/${cat.id}/${item.id}`)} 
                        className="px-5 py-3 rounded-[5px] text-sm bg-gray-200 cursor-pointer hover:bg-[#29A07E] hover:text-white"
                      >
                        {item.name}
                    </div>
                  ))}
                </div>
                <button
                  className="text-[#29A07E] hover:underline text-sm hover:cursor-pointer"
                  onClick={() => navigate(`/category/${cat.id}`)}
                >
                  XEM THÊM
                </button>
              </div>
            </div>
            {productsInCategory.length === 0 ? (
              <p>Đang cập nhật...</p>
            ) : (
              <div className='relative'>
                <div
                  className="flex flex-wrap gap-3 overflow-hidden pt-2"
                  style={{
                    maxHeight: '360px', // hoặc tùy chiều cao 1 card
                    overflowY: 'hidden',
                  }}
                >
                  {productsInCategory.slice(index * visibleCount, index * visibleCount + visibleCount).map((prod) => (
                    <Card
                      key={prod.id}
                      className='flex flex-col p-3 bg-white rounded-[8px] flex-shrink-0 h-85'
                      hoverable
                      style={{ borderRadius: 8, width: 240, margin: 8 }}
                      cover={
                        <Link to={`/products/${prod.id}`} className="flex! items-center! justify-center! pt-4!">
                          <ImageWithFallback 
                            className='rounded-[8px] hover:cursor-pointer w-50 h-40 object-cover'
                            src={prod.imageUrl}
                            alt={prod.name}
                          />
                        </Link>
                      }
                    >
                      <Link to={`/products/${prod.id}`}
                      >
                        <div className="flex items-center gap-15 text-[12px]">
                          <p className='text-[#777]'>Mã: {prod.code}</p>
                        </div> 
                        <p className='text-[16px] font-bold line-clamp-2 h-12 text-black truncate'>{prod.name}</p>
                      </Link>
                      <div className='flex gap-6 mt-2 items-center'>
                        <div className='flex-1'>
                          {prod?.flashPrice ? (
                          <>
                            {prod?.originalPrice && (
                              <div className="text-gray-500 line-through text-[16px]">
                              {typeof prod.originalPrice === 'number'
                                ? prod.originalPrice.toLocaleString('vi-VN') + ' VNĐ'
                                : '0 VNĐ'}
                            </div>
                            )}
                            <div className="text-[#29A07E] text-[18px] font-bold">
                              {prod.flashPrice.toLocaleString()} VNĐ
                            </div>
                          </>
                        ) : (
                          <div className="text-[#29A07E] text-[18px] font-bold">
                            {prod?.price?.toLocaleString()} VNĐ
                          </div>
                        )}
                        </div>
                        <button
                          className='bg-[#e5f8ee] hover:bg-[#22a085] hover:text-white text-[#22a085] rounded-full 
                          w-10 h-10 flex items-center justify-center hover:cursor-pointer'
                          onClick={() => handleAddCart(userId!,prod.id, 1)}
                        >
                          <ShoppingCartOutlined />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Prev Button */}
                
            <SliderButton direction="prev" onClick={goPrev} show={index > 0} />
            <SliderButton direction="next" onClick={goNext} show={index < maxIndex} />
              </div>
            )}
          
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;