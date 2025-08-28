import { LoadingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Skeleton } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import ImageWithFallback from '../../../components/img/ImageWithFallback';
import { useGetDetailCombo } from '../../admin/combo/hook/useGetDetailCombo';
import useUserStore from '../../../store/useUserStore';
import useAddCart from '../../cart/hook/useAddCart';
import { useCart } from '../../cart/hook';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ComboProductDetail = () => {
  const location = useLocation();
  const id = location.state || undefined;
  const { refetchCart } = useCart();
  const { loadingButton, handleAddCart } = useAddCart(refetchCart);
  const userId = useUserStore((state) => state.user?.id);
  const [number, setNumber] = useState(1);
  const { isLoadingGetDetailCombo, ResponseDataGetDetailCombo } = useGetDetailCombo(id);

  const data = ResponseDataGetDetailCombo?.data;

  return (
    <div className='max-w-[1400px] mx-auto my-5'>
      <div className='flex items-center justify-between mb-6'>
        <nav className='text-sm text-gray-500'>
          <Link to='/' className='hover:underline'>
            TRANG CHỦ
          </Link>{' '}
          / <span className='text-gray-700 font-semibold'>CHI TIẾT COMBO SẢN PHẨM</span>
        </nav>
      </div>

      <div className='px-4 md:px-8 py-6 bg-[#f9fafb] rounded-[5px]'>
        {isLoadingGetDetailCombo ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Skeleton.Image active style={{ width: '100%', height: 300 }} />
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        ) : data ? (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow mb-10'>
              <ImageWithFallback
                src={data.imageUrl}
                alt={data.nameCombo}
                className='w-full h-80 object-cover rounded-lg '
              />

              <div className='flex flex-col justify-between'>
                <div>
                  <h1 className='text-3xl font-bold text-gray-800 uppercase mb-2 line-clamp-1'>
                    {data.nameCombo}
                  </h1>
                  <p className='text-gray-600 mb-4 line-clamp-1'>{data.description}</p>

                  <div className='flex flex-wrap gap-4 mb-4 text-sm text-gray-600'>
                    <span>
                      Đã bán: <strong>{data.soldQuantity}</strong>
                    </span>
                    <span>
                      Còn lại: <strong>{data.remainingQuantity}</strong>
                    </span>
                  </div>

                  <div className='bg-[#fef6f6] p-4 rounded-lg border border-red-200 space-y-2'>
                    <p className='text-gray-500 line-through'>
                      Giá gốc: {data.originalTotalPrice.toLocaleString()} VNĐ
                    </p>
                    <p className='text-red-600 font-semibold'>
                      Giảm: {data.discountAmount.toLocaleString()} VNĐ ({data.discountPercentage}%)
                    </p>
                    <p className='text-2xl font-bold text-[#fa7833]'>
                      Giá chỉ còn: {data.price.toLocaleString()} VNĐ
                    </p>
                  </div>
                </div>
                <div className='flex gap-4 mt-5 text-sm sm:text-base items-center'>
                  <span className='text-[#8b8681]'>Số lượng</span>
                  <Button
                    onClick={() => setNumber((n) => Math.max(1, n - 1))}
                    disabled={number === 1}
                  >
                    -
                  </Button>
                  <span>{number}</span>
                  <Button
                    onClick={() => {
                      setNumber((n) => {
                        if (n < data.quantity) {
                          return n + 1;
                        } else {
                          toast.warning("Bạn đã chọn số lượng tối đa!");
                          return n;
                        }
                      });
                    }}
                  >
                    +
                  </Button>

                </div>
                <div className='grid gap-3 grid-cols-1 sm:grid-cols-2'>
                  <Button
                    className='mt-6! w-full! bg-[#fa7833]! hover:bg-[#1b8870]! text-white! py-3! rounded-lg! 
                    text-lg! font-semibold! flex items-center justify-center gap-2 transition-all h-12!'
                    disabled={loadingButton === 0}
                    onClick={() => handleAddCart(userId!,false, undefined, undefined, { id: data.id, quantity: number })}
                  >
                    {loadingButton === 0 ? (
                      <LoadingOutlined />
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <ShoppingCartOutlined className="h-4 w-4" />
                        Bấm Để Mua Deal Sốc
                      </div>
                  )}
                  </Button>
                  <Button
                    className='mt-6! w-full! bg-[#fa7833]! hover:bg-[#1b8870]! text-white! py-3! rounded-lg! 
                    text-lg! font-semibold! flex items-center justify-center gap-2 transition-all h-12!'
                    disabled={loadingButton === 1}
                    onClick={() => handleAddCart(userId!,true, undefined, undefined, { id: data.id, quantity: number })}
                  >
                    {loadingButton === 1 ? (
                      <LoadingOutlined />
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <ShoppingCartOutlined className="h-4 w-4" />
                        Mua Ngay Deal Sốc
                      </div>
                  )}
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h2 className='text-xl font-bold mb-4 text-gray-800'>Sản phẩm trong combo</h2>
              <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6'>
                {data.comboProducts.map((product) => (
                  <div
                    key={product.id}
                    className='relative group overflow-hidden rounded-xl border border-gray-100 bg-white 
                                            p-4 shadow transition-shadow duration-300 hover:shadow-lg cursor-pointer'
                  >
                    <ImageWithFallback
                      src={product.productImageUrl}
                      alt={product.productName}
                      className='w-full h-40 object-cover rounded-md mb-3'
                    />

                    <h3 className='text-base font-semibold truncate' title={product.productName}>
                      {product.productName}
                    </h3>

                    <p className='text-[#fa7833] font-bold mt-1'>
                      {product.productPrice.toLocaleString()} VNĐ
                    </p>

                    <p className='text-sm text-gray-600 mt-1'>
                      Số lượng trong combo: <strong>{product.quantity}</strong>
                    </p>

                    <div
                      className='absolute inset-0 z-10 flex items-center justify-center
                                                    bg-black/20 opacity-0 group-hover:opacity-100
                                                    transition-opacity duration-300 pointer-events-none'
                    >
                      <Link to={`/products/${product.productId}`}>
                        <Button
                          className='pointer-events-auto px-4 py-2 bg-white text-black font-semibold rounded-md shadow-lg
                                                        transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                                                        transition-all duration-250 h-10! w-20'
                        >
                          Xem
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className='text-center text-gray-500 py-10'>Không tìm thấy thông tin combo.</div>
        )}
      </div>
    </div>
  );
};

export default ComboProductDetail;
