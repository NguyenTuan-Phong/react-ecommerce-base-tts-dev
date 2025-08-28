import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import back_ground from '../../../assets/img/home-bg-collection.png';
import SliderButton from '../../../components/button/SliderButton';
import ImageWithFallback from '../../../components/img/ImageWithFallback';
// import useIsMobile from '../../../components/responsive/useIsMobile';
import useResponsiveProductCount from '../../../components/responsive/useResponsiveProductCount';
import useUserStore from '../../../store/useUserStore';
import type { FlashSaleProduct } from '../../../types';
import { useCart } from '../../cart/hook';
import useAddCart from '../../cart/hook/useAddCart';
// import { useCategories } from '../../productdetail/hook/useCategories';
import { useFlashSaleProducts } from '../hook/useValidFlashSaleProduct';
import '../../../assets/css/ProductAnimation.css';


const FlashSale = () => {
  const [index, setIndex] = useState(0);
  const [dataSale, setDataSale] = useState<FlashSaleProduct[]>([]);
  const { refetchCart } = useCart();
  const { handleAddCart, loadingProductId } = useAddCart(refetchCart);
  const userId = useUserStore((state) => state.user?.id);
  // const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);

  // const { data: categoryData } = useCategories(0, 10);
  // const categories: Category[] = Array.isArray(categoryData?.data?.content)
  // const categories: any = Array.isArray(categoryData?.data?.content)
  //   ? categoryData.data.content
  //   : [];

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

//   const handleViewItemCategorySale = (categoryName: string) => {
//     setSelectedCategoryName(categoryName);
//     const filtered = flashSaleProducts?.filter((products) => {
//       return products.categories?.some((cat) => {
//         return (
//           cat.name?.toLowerCase() === categoryName.toLowerCase() ||
//           cat.categoryItems?.some((item) => item.name?.toLowerCase() === categoryName.toLowerCase())
//         );
//       });
//     });
// 
//     setDataSale(filtered ?? []);
//     setIndex(0);
//   };

  // const flashSaleCategoryIds = useMemo(() => {
  //   const ids = new Set<number>();
  //   flashSaleProducts?.forEach((product) => {
  //     product.categories?.forEach((cat) => {
  //       if (cat.id) ids.add(Number(cat.id));
  //       cat.categoryItems?.forEach((item) => {
  //         if (item.id) ids.add(item.id);
  //       });
  //     });
  //   });
  //   return ids;
  // }, [flashSaleProducts]);

  const visibleCount = useResponsiveProductCount();
  // const isMobile = useIsMobile();
  // const sortedCategories = [...categories].sort((a, b) => {
  //   const aInFlashSale = flashSaleCategoryIds.has(a.id);
  //   const bInFlashSale = flashSaleCategoryIds.has(b.id);
  //   return Number(bInFlashSale) - Number(aInFlashSale); // true > false
  // });

  // const visibleCategories = isMobile ? sortedCategories.slice(0, 3) : sortedCategories;
  const maxIndex = dataSale.length - visibleCount;

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const diff = endOfDay.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="mx-auto bg-gradient-to-b from-orange-400 to-white bg-cover rounded-[8px] pb-3">
       <div className="text-center mb-4">
        <div className="text-4xl md:text-5xl font-extrabold mb-2 animate-pulse pt-10 text-white">
          MEGA SALE SIÊU KHỦNG
        </div>
        <p className="text-2xl md:text-3xl font-bold text-white pt-5">
          GIẢM GIÁ LÊN ĐẾN 80%
        </p>
      </div>

      <p className="text-center text-lg md:text-xl mb-6 font-medium text-white">
        Cơ hội vàng trong năm - Đừng bỏ lỡ
      </p>

       <div className="flex justify-center items-center space-x-4 md:space-x-8 mb-4">
          {/* Hours */}
          <div className="text-center">
            <div className="bg-orange-500 bg-opacity-30 rounded-lg py-3 px-4 md:px-6">
              <span className="text-3xl md:text-4xl font-bold block text-white">
                {timeLeft.hours.toString().padStart(2, "0")}
              </span>
              <span className="text-sm md:text-base text-white">Giờ</span>
            </div>
          </div>

          <div className="text-3xl md:text-4xl font-bold pt-4 text-white">:</div>

          {/* Minutes */}
          <div className="text-center">
            <div className="bg-orange-500 bg-opacity-30 rounded-lg py-3 px-4 md:px-6">
              <span className="text-3xl md:text-4xl font-bold block text-white">
                {timeLeft.minutes.toString().padStart(2, "0")}
              </span>
              <span className="text-sm md:text-base text-white">Phút</span>
            </div>
          </div>

          <div className="text-3xl md:text-4xl font-bold pt-4 text-white">:</div>

          {/* Seconds */}
          <div className="text-center">
            <div className="bg-orange-500 bg-opacity-30 rounded-lg py-3 px-4 md:px-6 text-white">
              <span className="text-3xl md:text-4xl font-bold block text-white">
                {timeLeft.seconds.toString().padStart(2, "0")}
              </span>
              <span className="text-sm md:text-base">Giây</span>
            </div>
          </div>
        </div>
      <div className='flex'>
        <div className='flex-1'></div>
        {/* <div className='flex gap-5'>
          {visibleCategories.slice(0, 5).map((item, index) => (
            <div
              key={item.id}
              style={{ color: 'white', textDecoration: 'none' }}
              className={`hover:cursor-pointer pr-5 ${
                index !== 4 ? 'border-r-2 border-white' : ''
              }`}
              onClick={() => handleViewItemCategorySale(item.name)}
            >
              {item.name}
            </div>
          ))}
        </div> */}
        <div className='flex-1'></div>
      </div>

      {isLoadingAllFlashSale ? (
        <div className='text-center text-white text-[20px] font-bold p-5'>Đang tải sản phẩm...</div>
      ) : dataSale.length > 0 ? (
        <div>
          <div className='overflow-x-hidden relative'>
            <div className='grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 transition-all duration-300'>
              {dataSale.slice(index, index + visibleCount).map((item) => (
                <Card
                  key={item.productId}
                  className='flex flex-col p-0 bg-white rounded-[8px] flex-shrink-0'
                  hoverable
                  style={{ borderRadius: 8 }}
                  cover={
                    <Link to={`/products/${item.productId}`} className='block px-5 pt-5'>
                      <ImageWithFallback
                        className='rounded-[8px] hover:cursor-pointer w-full h-45 p-2'
                        src={item.imageUrl}
                        alt='Sản phẩm'
                      />
                    </Link>
                  }
                >
                  <Link to={`/products/${item.productId}`} className='block'>
                    <div className='flex'>
                      <p className='flex-1 text-[#777]'>Mã : {item.code}</p>
                      
                    </div>
                    <p className='text-[12px] font-bold line-clamp-2 text-black h-[44px]'>
                      {item.name.toUpperCase()}
                    </p>
                    <div className='flex'>
                        {item.availableQuantity !== 0 ? (
                          <p className='text-[14px] line-clamp-2 text-gray-400 flex-1'>
                            Số lượng:{item.availableQuantity}
                          </p>
                        ) : (
                          <p className='text-red-600 font-bold'>Hết hàng</p>
                        )}
                      </div>
                  </Link>
                  <div className='flex'>
                    <div className='flex-1'>
                      <div className='text-gray-500 line-through text-[16px]'>
                        {typeof item.originalPrice === 'number'
                          ? item.originalPrice.toLocaleString('vi-VN') + ' VNĐ'
                          : '0 VNĐ'}
                      </div>
                      <div className='text-[#fa7833] text-[18px] font-bold'>
                        {item.flashPrice?.toLocaleString()} VNĐ
                      </div>
                    </div>
                    <Button
                      className='bg-[#e5f8ee]! hover:bg-[#fa7833]! hover:text-white! text-[#fa7833]! rounded-full! 
                      w-10! h-10! flex! items-center! justify-center! hover:border-0!'
                      onClick={() =>
                        handleAddCart(userId!, false, item.productId, 1)
                      }
                      disabled={loadingProductId === item.productId}
                    >
                      {loadingProductId === item.productId ? (
                        <Spin size='small' />
                      ) : (
                        <ShoppingCartOutlined />
                      )}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <SliderButton
              direction='prev'
              onClick={goPrev}
              show={index > 0}
              className='absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[30px] h-15 opacity-75 cursor-pointer'
            />
            <SliderButton
              direction='next'
              onClick={goNext}
              show={index < maxIndex}
              className='absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[30px] h-15 opacity-75 cursor-pointer'
            />
          </div>
        </div>
      ) : (
        <div className='text-center text-[white] text-[20px] font-bold p-5 h-50 content-center'>
          Không có sản phẩm.
        </div>
      )}

      <div className='py-5'>
        <div
          className='mx-auto w-[300px] h-[50px] border border-gray-200 text-center rounded-[999px]
            hover:cursor-pointer font-blod text-[18px] content-center bg-white hover:border hover:border-orange-500'
        >
          <Link
            // to={
            //   selectedCategoryName
            //     ? `/product-sale?category=${encodeURIComponent(selectedCategoryName)}`
            //     : '/product-sale'
            // }
            to={'/product-sale'}
            className='text-orange-600! bg-white!'
          >
            Xem tất cả sản phẩm sale
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
