import { LoadingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SliderButton from '../../../components/button/SliderButton';
import ImageWithFallback from '../../../components/img/ImageWithFallback';
import useResponsiveProductCount from '../../../components/responsive/useResponsiveProductCount';
import useUserStore from '../../../store/useUserStore';
import useAddCart from '../../cart/hook/useAddCart';
import { useCart } from '../../cart/hook/useCart';
import { useCategories } from '../../productdetail/hook/useCategories';
import { useProducts } from '../hook/useProduct';
import '../../../assets/css/ProductAnimation.css';

interface ProductListProp {
  page: number;
  size: number;
}
const ProductList = ({ page, size }: ProductListProp) => {
  const { data: categoryData, isError } = useCategories(page, size);
  // const categories: Category[] = Array.isArray(categoryData?.data?.content)
  const categories: any = Array.isArray(categoryData?.data?.content)
    ? categoryData.data.content
    : [];
  const navigate = useNavigate();

  const { refetchCart } = useCart();
  const { loadingProductId, handleAddCart } = useAddCart(refetchCart);
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
      {categories.map((cat: any) => {
        const productsInCategoryRaw = groupedProducts?.[cat.id] || [];

        const productsInCategory = Array.from(
          new Map(productsInCategoryRaw.map((p) => [p.id, p])).values(),
        );

        if (productsInCategory.length === 0) return null;

        const index = getIndex(cat.id);
        const maxIndex = Math.ceil(productsInCategory.length / visibleCount) - 1;

        const goNext = () => {
          if (index < maxIndex) updateIndex(cat.id, index + 1);
        };

        const goPrev = () => {
          if (index > 0) updateIndex(cat.id, index - 1);
        };

        return (
          <div key={cat.id} className='mt-5 mb-10 bg-white rounded-xl p-3'>
            <div className='flex justify-between items-center flex-wrap px-2'>
              <h2 className='text-xl font-bold uppercase'>{cat.name}</h2>
              <div className='flex gap-5'>
                <div className='flex gap-2 '>
                  {(cat.categoryItems || []).slice(0, 2).map((item: any) => (
                    <div
                      key={item.id}
                      onClick={() => navigate(`/category/${cat.id}/${item.id}`)}
                      className='px-5 py-3 rounded-[5px] text-sm bg-gray-200 cursor-pointer hover:bg-[#fa7833] hover:text-white'
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
                <button
                  className='text-[#fa7833] hover:underline text-sm hover:cursor-pointer'
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
                  className='flex flex-wrap gap-3 overflow-hidden pt-2'
                  style={{
                    maxHeight: '360px',
                    overflowY: 'hidden',
                  }}
                >
                  {productsInCategory
                    .slice(index * visibleCount, index * visibleCount + visibleCount)
                    .map((prod) => (
                      <Card
                        key={prod.id}
                        className='flex flex-col p-3 bg-white rounded-[8px] flex-shrink-0 h-85  product-card'
                        hoverable
                        style={{ borderRadius: 8, width: 240, margin: 8 }}
                        cover={
                          <Link
                            to={`/products/${prod.id}`}
                            className='flex! items-center! justify-center! pt-4!'
                          >
                            <div className="overflow-hidden rounded-[8px]">
                            <ImageWithFallback
                              className="hover:cursor-pointer w-50 h-40 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                              src={prod.imageUrl}
                              alt={prod.name}
                            />
                          </div>
                          </Link>
                        }
                      >
                        <Link to={`/products/${prod.id}`}>
                          <div className='flex items-center gap-15 text-[12px]'>
                            <p className='text-[#777]'>Mã: {prod.code}</p>
                          </div>
                          <p className='text-[16px] font-bold line-clamp-2 text-black truncate'>
                            {prod.name}
                          </p>

                          <div className='flex'>
                            <p className='text-[14px] line-clamp-2 text-gray-400 flex-1'>
                              Số lượng:{prod.availableQuantity}
                            </p>
                            {prod.availableQuantity === 0 && (
                              <p className='text-red-600 font-bold'>Hết hàng</p>
                            )}
                          </div>
                        </Link>
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

                          {prod.availableQuantity !== 0 && (
                            <Button
                              className='bg-[#e5f8ee]! hover:bg-[#fa7833]! hover:text-white! text-[#fa7833]! rounded-full! 
                            w-10! h-10! flex! items-center! justify-center! hover:border-0!'
                              onClick={() => handleAddCart(userId!, false, prod.id, 1)}
                              disabled={loadingProductId === prod.id}
                            >
                              {loadingProductId === prod.id ? (
                                <LoadingOutlined/>
                              ) : (
                                <ShoppingCartOutlined />
                              )}
                             
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                </div>

                <SliderButton direction='prev' onClick={goPrev} show={index > 0} />
                <SliderButton direction='next' onClick={goNext} show={index < maxIndex} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
