import back_ground from '../../../assets/img/home-bg-collection.png';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { useState, useEffect } from 'react';
import { useCart } from '../../cart/hook';
import useAddCart from '../../cart/hook/useAddCart';
import useUserStore from '../../../store/useUserStore';
import { useCategories } from '../../productdetail/hook/useCategories';
import SliderButton from '../../../components/button/SliderButton';
import useResponsiveProductCount from '../../../components/responsive/useResponsiveProductCount';
import useIsMobile from '../../../components/responsive/useIsMobile';
import ImageWithFallback from '../../../components/img/ImageWithFallback';
import type { Category, FlashSaleProduct } from '../../../types';
import { useFlashSaleProducts } from '../hook/useValidFlashSaleProduct';


const FlashSale = () => {
  const [index, setIndex] = useState(0);
  const [dataSale, setDataSale] = useState<FlashSaleProduct[]>([]);
  const { refetchCart } = useCart();
  const { handleAddCart } = useAddCart(refetchCart);
  const userId = useUserStore((state) => state.user?.id);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);


  const { data: categoryData } = useCategories();
  const categories: Category[] = Array.isArray(categoryData?.data)
    ? categoryData.data
    : [];

const { flashSaleProducts, isLoadingAllFlashSale } = useFlashSaleProducts();
  
  useEffect(() => {
  if (flashSaleProducts?.length > 0) {
    setDataSale(flashSaleProducts);
  }
}, [flashSaleProducts]);


  const goNext = () => {
    if (index + visibleCount < dataSale.length) {
      setIndex(index + 1);
    }
  };

  const goPrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    const timeNext = setTimeout(() => {
      if (index + visibleCount < dataSale.length) {
        goNext();
      } else {
        setIndex(0);
      }
    }, 10000);
    return () => clearTimeout(timeNext);
  }, [index, dataSale]);

  const handleViewItemCategorySale = (categoryName: string) => {
    setSelectedCategoryName(categoryName);
  const filtered = flashSaleProducts?.filter((products) => {
    return products.categories?.some((cat) => {
      return (
        cat.name?.toLowerCase() === categoryName.toLowerCase() ||
        cat.categoryItems?.some(
          (item) => item.name?.toLowerCase() === categoryName.toLowerCase()
        )
      );
    });
  });

  setDataSale(filtered ?? []);
  setIndex(0);
};

useEffect(() => {
  console.log("Flash Sale Products:", flashSaleProducts);
}, [flashSaleProducts]);



  const visibleCount = useResponsiveProductCount();
  const isMobile = useIsMobile();
  const visibleCategories = isMobile ? categories.slice(0, 3) : categories;
  const maxIndex = dataSale.length - visibleCount;

  return (
    <div
      className="max-w-[1400px] mx-auto bg-cover rounded-[8px] pb-3"
      style={{ background: `url(${back_ground})`, backgroundRepeat: 'no-repeat', border: '8px' }}
    >
      <h1
        className="text-[white] text-[24px] font-bold text-center p-5 hover:underline hover:cursor-pointer "
        onClick={() => {
          setDataSale(flashSaleProducts); 
          setSelectedCategoryName(null);  
          setIndex(0);                    
        }}
      >
        SIÊU SALE XỊN 6G "GỒNG GANH_GIẢM GẮT_ GIÁ GỐC"
      </h1>
      <div className="flex">
        <div className="flex-1"></div>
        <div className="flex gap-5">
          {visibleCategories.slice(0,5).map((item, index) => (
            <div
              key={item.id}
              style={{ color: 'white', textDecoration: 'none' }}
              className={`hover:cursor-pointer pr-5 ${index !== 4 ? 'border-r-2 border-white' : ''}`}
              onClick={() => handleViewItemCategorySale(item.name)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="flex-1"></div>
      </div>

      {isLoadingAllFlashSale ? (
        <div className="text-center text-white text-[20px] font-bold p-5">Đang tải sản phẩm...</div>
      ) : dataSale.length > 0 ? (
        <div>
          <div className="overflow-x-hidden relative">
            <div className="grid justify-center grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 transition-all duration-300">
              {dataSale.slice(index, index + visibleCount).map((item) => (
                <Card
                  key={item.productId}
                  className="flex flex-col p-0 bg-white rounded-[8px] flex-shrink-0"
                  hoverable
                  style={{ borderRadius: 8 }}
                  cover={
                    <Link to={`/flash-sale/${item.productId}`} className="block p-5">
                      <ImageWithFallback
                        className="rounded-[8px] hover:cursor-pointer w-full h-45"
                        src={item.imageUrl}
                        alt="Sản phẩm"
                      />
                    </Link>
                  }
                >
                  <Link to={`/products/${item.productId}`} className="block">
                    <div className="flex pb-2">
                      <p className="flex-1 text-[#777]">Mã : {item.code}</p>
                    </div>
                    <p className="text-[12px] font-bold pb-2 truncate text-black">
                        {item.name.toUpperCase()}
                    </p>
                  </Link>
                  <div className="flex">
                    <div className="flex-1">
                       <div className="text-gray-500 line-through text-[16px]">
                        {typeof item.originalPrice === 'number'
                          ? item.originalPrice.toLocaleString('vi-VN') + ' VNĐ'
                          : '0 VNĐ'}
                      </div>
                      <div className="text-[#29A07E] text-[18px] font-bold">
                        {item.flashPrice?.toLocaleString()} VNĐ
                      </div>
                    </div>
                    <button
                      className="bg-[#e5f8ee] hover:bg-[#22a085] hover:text-white text-[#22a085] hover:cursor-pointer rounded-full w-10 h-10 flex items-center justify-center"
                     onClick={() => handleAddCart(userId!, item.productId,1,item.flashPrice)}
                    >
                      <ShoppingCartOutlined />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
            <SliderButton
              direction="prev"
              onClick={goPrev}
              show={index > 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[30px] h-15 opacity-75 cursor-pointer"
            />
            <SliderButton
              direction="next"
              onClick={goNext}
              show={index < maxIndex}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[30px] h-15 opacity-75 cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="text-center text-[white] text-[20px] font-bold p-5 h-50 content-center">
          Không có sản phẩm.
        </div>
      )}

      <div className="">
        <div
          className="mx-auto w-[140px] h-[50px] border border-white text-center rounded-[999px]
            hover:cursor-pointer font-blod text-[18px] content-center"
        >
          <Link
          to={
            selectedCategoryName
              ? `/product-sale?category=${encodeURIComponent(selectedCategoryName)}`
              : '/product-sale'
          }
          className="text-[white]!"
          >
            Xem thêm
          </Link>

        </div>
      </div>
    </div>
  );
};

export default FlashSale;
