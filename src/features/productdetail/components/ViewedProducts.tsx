import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SliderButton from '../../../components/button/SliderButton';
import ImageWithFallback from '../../../components/img/ImageWithFallback';
import useUserStore from '../../../store/useUserStore';
import type { Product } from '../../../types';
import { useCart } from '../../cart/hook';
import useAddCart from '../../cart/hook/useAddCart';

interface ViewedProductsProps {
  products: Product[];
  categories?: any;
  title?: string;
}

const ViewedProducts: React.FC<ViewedProductsProps> = ({ products, title = 'Sản phẩm đã xem' }) => {
  if (!products || products.length === 0) return null;

  const { refetchCart } = useCart(); // lấy lại cart
  const { handleAddCart, loadingProductId } = useAddCart(refetchCart);
  const userId = useUserStore((state) => state.user?.id);

  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const cardWidth = 250 + 20;

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerView(1);
      } else if (width < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const goPrev = () => setIndex((prev) => Math.max(prev - 1, 0));
  const goNext = () => setIndex((prev) => Math.min(prev + 1, maxIndex));

  return (
    <div className='relative bg-white p-5 rounded-xl shadow'>
      <h2 className='text-xl font-bold mb-4'>{title}</h2>

      <div className='overflow-hidden relative'>
        <SliderButton direction='prev' onClick={goPrev} show={index > 0} />
        <SliderButton direction='next' onClick={goNext} show={index < maxIndex} />

        <div
          className='flex gap-4 transition-transform duration-300 ease-in-out p-2'
          style={{ transform: `translateX(-${index * cardWidth}px)` }}
        >
          {products.map((prod) => (
            <Card
              key={prod.id}
              className='rounded-lg shadow-sm flex-shrink-0'
              style={{ width: 260 }}
              hoverable
            >
              <Link to={`/products/${prod.id}`}>
                <ImageWithFallback
                  src={prod.imageUrl}
                  alt={prod.name}
                  className='h-40 object-cover rounded-xl w-full'
                />
                {prod.code && <p className='text-[#777] pt-1'>Mã: {prod.code}</p>}
                <p className='text-[16px] font-bold text-black line-clamp-2 truncate'>{prod.name}</p>
                <div className='flex'>
                  <p className='text-[14px] line-clamp-2 text-gray-400 flex-1'>
                    Số lượng:{prod.quantity}
                  </p>
                  {prod.quantity === 0 && (
                    <p className='text-red-600 font-bold'>Hết hàng</p>
                  )}
                </div>
              </Link>

              <div className='flex gap-6 mt-2 items-center'>
                <div className='flex gap-1 mt-2 items-center'>
                          <div className="flex-1 flex flex-col justify-center">
                         {prod?.flashPrice ? (
                          <>
                          <div className="text-gray-500 line-through text-[16px] h-[20px]">
                            {prod?.originalPrice
                            ? prod.originalPrice.toLocaleString('vi-VN') + ' VNĐ'
                            : ''}
                          </div>
                          <div className="text-[#fa7833] text-[18px] font-bold">
                            {prod.flashPrice.toLocaleString('vi-VN')} VNĐ
                          </div>
                          </>
                          ) : (
                          <>
      
                          <div className="h-[20px]"></div>
                          <div className="text-[#fa7833] text-[18px] font-bold">
                              {prod?.price?.toLocaleString('vi-VN')} VNĐ
                          </div>
                          </>
                        )}
                      </div>
                </div>
                <Button
                  className='bg-[#e5f8ee]! hover:bg-[#fa7833]! hover:text-white! text-[#fa7833]! rounded-full! w-10! h-10! flex! items-center! justify-center!'
                  onClick={() => handleAddCart(userId!, false, prod.id, 1)}
                  disabled={loadingProductId === prod.id}
                >
                  {loadingProductId === prod.id ? <Spin /> : <ShoppingCartOutlined />}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewedProducts;
