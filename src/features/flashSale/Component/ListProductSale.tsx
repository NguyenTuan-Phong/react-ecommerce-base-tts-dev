import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Pagination, Spin } from 'antd';
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SliderButton from '../../../components/button/SliderButton';
import ImageWithFallback from '../../../components/img/ImageWithFallback';
import SkeletonProduct from '../../../components/skeleton/SkeletonProduct';
import useUserStore from '../../../store/useUserStore';
import { useCart } from '../../cart/hook';
import useAddCart from '../../cart/hook/useAddCart';
import { useGetAllFlashSale } from '../hook/GetAllFlashSale';
import { useFlashSaleProducts } from '../hook/useValidFlashSaleProduct';
import FlipCountdown from './CountDown';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ListProductSale = () => {
  const { refetchCart } = useCart();
  const { handleAddCart, loadingProductId } = useAddCart(refetchCart);
  const userId = useUserStore((state) => state.user?.id);

  const { flashSaleProducts, isLoadingAllFlashSale } = useFlashSaleProducts();
  const { allFlashSaleData } = useGetAllFlashSale(0, 50);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);

  const query = useQuery();
  const selectedCategory = query.get('category');

  const filteredFlashSaleProducts = useMemo(() => {
    if (!selectedCategory) return flashSaleProducts;

    const lowerCategory = selectedCategory.toLowerCase();

    return flashSaleProducts.filter((product) =>
      product.categories?.some(
        (cat) =>
          cat.name?.toLowerCase() === lowerCategory ||
          cat.categoryItems?.some((item) => item.name?.toLowerCase() === lowerCategory),
      ),
    );
  }, [selectedCategory, flashSaleProducts]);

  // Pagination slice
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * size;
    const end = start + size;
    return filteredFlashSaleProducts.slice(start, end);
  }, [filteredFlashSaleProducts, page, size]);

  const [indices, setIndices] = useState<Record<number, number>>({});

  return (
    <div className='py-10 flex flex-col gap-5'>
      {/* Breadcrumb + Title */}
      <section className='flex gap-3'>
        <Link to='/' className='link'>
          TRANG CHỦ
        </Link>
        <div className='section-text'>/</div>
        <span className='cursor-default section-text'>
          SIÊU SALE XỊN 6G "GỒNG GANH_GIẢM GẮT_ GIÁ GỐC
        </span>
      </section>

      <section className='flex gap-5 items-end flex-wrap'>
        <h1 className='text-[26px] font-bold section-text'>
          {selectedCategory
            ? `Flash Sale - ${selectedCategory}`
            : 'SIÊU SALE XỊN 6G "GỒNG GANH_GIẢM GẮT_ GIÁ GỐC'}
        </h1>

        <p className='text-[16px] pb-1'>({filteredFlashSaleProducts.length} Sản phẩm)</p>
      </section>

      {/* Product Grid */}
      {selectedCategory ? (
        <section className='rounded-[8px] h-auto bg-[white] p-3'>
          {isLoadingAllFlashSale ? (
            <SkeletonProduct />
          ) : (
            <div>
              {filteredFlashSaleProducts.length === 0 ? (
                <div className='h-50 text-center content-center'>Không có sản phẩm.</div>
              ) : (
                <div className='flex flex-col gap-5'>
                  <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                    {paginatedProducts.map((i) => (
                      <Card
                        key={i.productId}
                        className='flex flex-col bg-white rounded-[8px] p-3 w-full h-full hover:text-[#29A07E] mt-3 max-w-[240px] product-card'
                        hoverable
                        cover={
                          <Link
                            to={`flash-sale/${i.productId}`}
                            className='flex items-center justify-center'
                          >
                            <ImageWithFallback
                              className='rounded-[8px] w-full h-45 object-cover'
                              alt={i.name}
                              src={i.imageUrl}
                            />
                          </Link>
                        }
                      >
                        <Link to={`/products/${i.productId}`}>
                          <div className='text-xs text-[#777] mb-1'>Mã: {i.code}</div>
                          <p className='text-[14px] font-bold line-clamp-2 text-black group-hover:text-[#29A07E]'>
                            {i.name}
                          </p>
                        </Link>

                        <div className='flex'>
                          <div className='flex-1'>
                            <div className='text-gray-500 line-through text-[16px]'>
                              {typeof i.originalPrice === 'number'
                                ? i.originalPrice.toLocaleString('vi-VN') + ' VNĐ'
                                : '0 VNĐ'}
                            </div>
                            <div className='text-[#fa7833] text-[18px] font-bold'>
                              {i.flashPrice?.toLocaleString()} VNĐ
                            </div>
                          </div>
                          <button
                            className='bg-[#e5f8ee] hover:bg-[#fa7833] hover:text-white text-[#fa7833] hover:cursor-pointer rounded-full w-10 h-10 flex items-center justify-center'
                            onClick={() => handleAddCart(userId!, false, i.productId, 1)}
                          >
                            <ShoppingCartOutlined />
                          </button>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className='mt-10'>
                    <Pagination
                      align='center'
                      current={page}
                      pageSize={size}
                      onChange={(pageNumber, pageSizeNumber) => {
                        setPage(pageNumber);
                        setSize(pageSizeNumber);
                      }}
                      total={filteredFlashSaleProducts.length}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      ) : (
        <>
          {allFlashSaleData?.data?.content?.some((c) => new Date(c.endTime) > new Date()) ? (
            allFlashSaleData.data.content
              .filter((campaign) => {
                const now = new Date();
                const start = new Date(campaign.startTime);
                const end = new Date(campaign.endTime);
                return start <= now && end > now;
              })

              .map((campaign) => {
                const campaignProducts = campaign.products || [];
                if (campaignProducts.length === 0) return null;

                const index = indices[Number(campaign.id)] ?? 0;
                const visibleCount = 5;
                const start = index * visibleCount;
                const end = start + visibleCount;
                const visibleProducts = campaignProducts.slice(start, end);
                const maxIndex = Math.max(0, Math.ceil(campaignProducts.length / visibleCount) - 1);

                const goNext = () => {
                  if (index < maxIndex)
                    setIndices((prev) => ({ ...prev, [campaign.id]: index + 1 }));
                };

                const goPrev = () => {
                  if (index > 0) setIndices((prev) => ({ ...prev, [campaign.id]: index - 1 }));
                };

                return (
                  <section
                    key={campaign.id}
                    className='bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-8'
                  >
                    <div className='flex gap-4 items-center mb-4'>
                      <h2 className='text-xl font-bold uppercase text-[#29A07E]'>
                        {campaign.name}
                      </h2>
                      <FlipCountdown endTime={campaign.endTime} />
                    </div>
                    <div className='relative'>
                      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                        {visibleProducts.map((i) => (
                          <Card
                            key={i.productId}
                            className='flex flex-col bg-white rounded-[8px] p-3 w-full h-full hover:text-[#29A07E] mt-3 max-w-[240px]'
                            hoverable
                            cover={
                              <Link
                                to={`/products/${i.productId}`}
                                className='flex items-center justify-center'
                              >
                                <ImageWithFallback
                                  className='rounded-[8px] w-full h-45 object-cover'
                                  alt={i.name}
                                  src={i.imageUrl}
                                />
                              </Link>
                            }
                          >
                            <Link to={`/products/${i.productId}`}>
                              <div className='text-xs text-[#777] mb-1'>Mã: {i.code}</div>
                              <p className='text-[14px] font-bold line-clamp-2 truncate text-black group-hover:text-[#29A07E]'>
                                {i.name}
                              </p>
                              <div className='flex'>
                                <p className='text-[14px] line-clamp-2 text-gray-400 flex-1'>
                                  Số lượng:{i.availableQuantity}
                                </p>
                                {i.availableQuantity === 0 && (
                                  <p className='text-red-600 font-bold'>Hết hàng</p>
                                )}
                              </div>
                            </Link>

                            <div className='flex mt-1'>
                              <div className='flex-1'>
                                <div className='text-gray-500 line-through text-[16px]'>
                                  {typeof i.originalPrice === 'number'
                                    ? i.originalPrice.toLocaleString('vi-VN') + ' VNĐ'
                                    : '0 VNĐ'}
                                </div>
                                <div className='text-[#fa7833] text-[18px] font-bold'>
                                  {i.flashPrice?.toLocaleString()} VNĐ
                                </div>
                              </div>
                              {i.availableQuantity !== 0 && (
                                <Button
                                  className='bg-[#e5f8ee]! hover:bg-[#fa7833]! hover:text-white! text-[#fa7833]! rounded-full! w-10! h-10! flex! items-center! justify-center!'
                                  onClick={() => handleAddCart(userId!, false, i.productId, 1)}
                                  disabled={loadingProductId === i.productId}
                                >
                                  {loadingProductId === i.productId ? (
                                    <Spin size='small' />
                                  ) : (
                                    <ShoppingCartOutlined />
                                  )}
                                </Button>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                      {campaignProducts.length > visibleCount && (
                        <div className='flex justify-between items-center mt-4'>
                          <SliderButton direction='prev' onClick={goPrev} show={index > 0} />
                          <SliderButton direction='next' onClick={goNext} show={index < maxIndex} />
                        </div>
                      )}
                    </div>
                  </section>
                );
              })
          ) : (
            <SkeletonProduct />
          )}
        </>
      )}
    </div>
  );
};

export default ListProductSale;
