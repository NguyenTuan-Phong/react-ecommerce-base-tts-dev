import { Link, useLocation } from 'react-router-dom';
import ImageWithFallback from '../../../components/img/ImageWithFallback';
import Pay from './Pay';
import { useMemo } from 'react';
import type { CartItem, IComboItemsResp, ResponsiveDataCartItems } from '../../../types';

const CheckOut = () => {
  const location = useLocation();
  const data:ResponsiveDataCartItems = location.state;

  const dataCartItemMemo = useMemo(() => {
     return {
      cartItems: data?.data.cartItems || ([] as CartItem[]),
      comboItems: data?.data.comboItems || ([] as IComboItemsResp[]),
    };
  }, [data]);

  return (
    <div>
      <section className='flex gap-4 py-[20px]'>
        <Link className='link' to={'/'}>
          TRANG CHỦ
        </Link>
        <p className='section-text'>/</p>
        <p className='font-bold section-text'>THÔNG TIN ĐƠN HÀNG</p>
      </section>
      {dataCartItemMemo.cartItems.length || dataCartItemMemo.comboItems.length > 0 ? (
        <>
          <section className='my-3 flex flex-col gap-4'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
              <div className='flex flex-wrap items-center justify-between p-4'>
                <p className='font-semibold text-gray-800'>THÔNG TIN GIỎ HÀNG</p>
                
              </div>
              <div className='h-px bg-gray-100' />

              <div className='hidden lg:grid grid-cols-[1fr_180px_180px_180px] items-center py-3 text-sm text-gray-700 bg-gray-50'>
                <div className='font-semibold px-4'>Sản phẩm</div>
                <div className='text-center font-semibold border-l border-gray-200'>Đơn giá</div>
                <div className='text-center font-semibold border-l border-gray-200'>Số lượng</div>
                <div className='text-center font-semibold border-l border-gray-200'>Số tiền</div>
              </div>
            </div>

            {dataCartItemMemo.cartItems.map((item: CartItem) => {
              const unitPrice =
                item.product.flashPrice && item.product.flashPrice > 0
                  ? item.product.flashPrice
                  : item.product.price;

              return (
                <div
                  key={item.id}
                  className='bg-white rounded-xl shadow-sm border border-gray-100 lg:overflow-hidden'
                >
                  {/* Desktop grid layout for clear column distinction */}
                  <div className='hidden lg:grid grid-cols-[1fr_180px_180px_180px] items-center divide-x divide-gray-100 border-b'>
                    {/* Sản phẩm */}
                    <div className='px-4 py-4'>
                      <Link to={`/products/${item.product.id}`}>
                      <div className='flex gap-3'>
                        
                        
                        <ImageWithFallback
                          className='h-24 w-24 rounded-md object-cover flex-shrink-0'
                          src={item.product.imageUrl}
                          alt={item.product.name}
                        />
                        <div className='min-w-0'>
                          <p
                            className='text-lg font-semibold text-gray-900 truncate max-w-[400px]'
                            title={item.product.name}
                          >
                            {item.product.name}
                          </p>
                          <p className='text-sm text-gray-500'>
                            Mã sản phẩm: {item.product.code || 'N/A'}
                          </p>
                        </div>
                        
                      </div>
                      </Link>
                    </div>

                    {/* Đơn giá */}
                    <div className='px-4 py-4 text-center'>
                      <div
                        className={`text-lg font-bold ${
                          item.product.flashPrice ? 'text-emerald-600' : 'text-orange-600'
                        }`}
                      >
                        {unitPrice.toLocaleString()} VNĐ
                      </div>
                    </div>

                    <div className='px-4 py-4 text-center'>
                      <div className='mx-auto w-max flex items-center gap-2'>
                        <input
                          className='w-14 h-9 text-center border border-gray-200 rounded-md bg-white text-gray-900 select-none'
                          type='text'
                          readOnly
                          value={item.quantity}
                          aria-label='Số lượng hiện tại'
                        />
                      </div>
                    </div>

                    {/* Số tiền */}
                    <div className='px-4 py-4 text-center'>
                      <div className='text-lg font-bold text-emerald-600'>
                        {(unitPrice * item.quantity).toLocaleString()} VNĐ
                      </div>
                    </div>

                  </div>

                  {/* Mobile/Tablet stacked layout with labeled rows */}
                  <div className='lg:hidden p-4 flex flex-col gap-3 border-b'>
                    <Link to={`/products/${item.product.id}`}>
                      <div className='flex gap-3'>
                        
                        <ImageWithFallback
                          className='h-24 w-24 rounded-md object-cover flex-shrink-0'
                          src={item.product.imageUrl}
                          alt={item.product.name}
                        />
                        <div className='min-w-0'>
                          <p
                            className='text-base sm:text-lg font-semibold text-gray-900 truncate'
                            title={item.product.name}
                          >
                            {item.product.name}
                          </p>
                          <p className='text-sm text-gray-500'>
                            Mã sản phẩm: {item.product.code || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </Link>

                    <div className='grid grid-cols-2 gap-2 rounded-xl border border-gray-100 overflow-hidden'>
                      <div className='p-3 bg-gray-50'>
                        <p className='text-xs text-gray-500'>Đơn giá</p>
                        <p
                          className={`text-base font-semibold ${
                            item.product.flashPrice ? 'text-emerald-600' : 'text-orange-600'
                          }`}
                        >
                          {unitPrice.toLocaleString()} VNĐ
                        </p>
                      </div>
                      <div className='p-3'>
                        <p className='text-xs text-gray-500'>Số lượng</p>
                        <div className='mt-1 flex items-center gap-2'>
                          
                          <input
                            className='w-12 h-8 text-center border border-gray-200 rounded-md bg-white text-gray-900 select-none'
                            type='text'
                            readOnly
                            disabled
                            value={item.quantity}
                            aria-label='Số lượng hiện tại'
                          />
                        </div>
                      </div>
                      <div className='p-3 bg-gray-50 col-span-2 flex items-center justify-between'>
                        <div>
                          <p className='text-xs text-gray-500'>Số tiền</p>
                          <p className='text-base font-semibold text-emerald-600'>
                            {unitPrice.toLocaleString()} VNĐ
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <section>
                    <Pay
                      isBuyNow={true}
                      data={{
                        items: {
                          productId: item.product.id,
                          quantity: item.quantity,
                          price:
                            item.product.flashPrice && item.product.flashPrice > 0
                              ? item.product.flashPrice
                              : item.product.price,
                        },
                        totalQuantity: item.quantity,
                        totalPrice:
                          (item.product.flashPrice && item.product.flashPrice > 0
                            ? item.product.flashPrice
                            : item.product.price) * item.quantity,
                      }}
                    />
                  </section>
                </div>
                
              );
            })}
            

            {/*  Combo */}
            {dataCartItemMemo.comboItems.map((item: IComboItemsResp) => {
              const unitPriceCombo = item.combo.price * item.quantity;

              return (
                <div
                  key={item.id}
                  className='bg-white rounded-xl shadow-sm border border-gray-100 lg:overflow-hidden'
                >
                  {/* Desktop grid layout for clear column distinction */}
                  <div className='hidden lg:grid grid-cols-[1fr_180px_180px_180px] items-center divide-x divide-gray-100 border-b'>
                    {/* Sản phẩm */}
                    <div className='px-4 py-4'>
                      <div className='flex gap-3'>
                        <ImageWithFallback
                          className='h-24 w-24 rounded-md object-cover flex-shrink-0'
                          src={item.combo.imageUrl}
                          alt={item.combo.nameCombo}
                        />
                        <div className='min-w-0'>
                          <p
                            className='text-lg font-semibold text-gray-900 truncate max-w-[400px]'
                            title={item.combo.nameCombo}
                          >
                            {item.combo.nameCombo}
                          </p>
                          <p className='text-sm text-gray-500'>
                            Mã sản phẩm: {item.combo.code || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Đơn giá */}
                    <div className='px-4 py-4 text-center'>
                      <div
                        className={`text-lg font-bold ${
                          item.combo.price ? 'text-emerald-600' : 'text-orange-600'
                        }`}
                      >
                        {item.combo.price.toLocaleString()} VNĐ
                      </div>
                    </div>

                    {/* Số lượng */}
                    <div className='px-4 py-4 text-center'>
                      <div className='mx-auto w-max flex items-center gap-2'>
                        <input
                          className='w-14 h-9 text-center border border-gray-200 rounded-md bg-white text-gray-900 select-none'
                          type='text'
                          readOnly
                          value={item.quantity}
                          aria-label='Số lượng hiện tại'
                        />
                      </div>
                    </div>

                    {/* Số tiền */}
                    <div className='px-4 py-4 text-center'>
                      <div className='text-lg font-bold text-emerald-600'>
                        {unitPriceCombo.toLocaleString()} VNĐ
                      </div>
                    </div>
                  </div>

                  {/* Mobile/Tablet stacked layout with labeled rows */}
                  <div className='lg:hidden p-4 flex flex-col gap-3'>
                    <div className='flex gap-3'>
                      <ImageWithFallback
                        className='h-24 w-24 rounded-md object-cover flex-shrink-0'
                        src={item.combo.imageUrl}
                        alt={item.combo.nameCombo}
                      />
                      <div className='min-w-0'>
                        <p
                          className='text-base sm:text-lg font-semibold text-gray-900 truncate'
                          title={item.combo.nameCombo}
                        >
                          {item.combo.nameCombo}
                        </p>
                        <p className='text-sm text-gray-500'>
                          Mã sản phẩm: {item.combo.code || 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-2 rounded-xl border border-gray-100 overflow-hidden'>
                      <div className='p-3 bg-gray-50'>
                        <p className='text-xs text-gray-500'>Đơn giá</p>
                        <p
                          className={`text-base font-semibold ${
                            item.combo.price ? 'text-emerald-600' : 'text-orange-600'
                          }`}
                        >
                          {unitPriceCombo.toLocaleString()} VNĐ
                        </p>
                      </div>
                      <div className='p-3'>
                        <p className='text-xs text-gray-500'>Số lượng</p>
                        <div className='mt-1 flex items-center gap-2'>
                          <input
                            className='w-12 h-8 text-center border border-gray-200 rounded-md bg-white text-gray-900 select-none'
                            type='text'
                            readOnly
                            disabled
                            value={item.quantity}
                            aria-label='Số lượng hiện tại'
                          />
                        </div>
                      </div>
                      <div className='p-3 bg-gray-50 col-span-2 flex items-center justify-between'>
                        <div>
                          <p className='text-xs text-gray-500'>Số tiền</p>
                          <p className='text-base font-semibold text-emerald-600'>
                            {unitPriceCombo.toLocaleString()} VNĐ
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <section>
                    <Pay
                      isBuyNow={true}
                      data={{
                        items: {
                          productId: item.combo.id,
                          quantity: item.quantity,
                          price:
                            item.combo.price,
                        },
                        totalQuantity: item.quantity,
                        totalPrice:
                          (item.combo.price > 0
                            ? item.combo.price : 0) * item.quantity,
                      }}
                    />
                  </section>
                </div>
              );
            })}
          </section>
          
        </>
      ) : (
        <div className='h-100 w-full text-center content-center font-bold'>
          Không có dữ liệu để thanh toán
        </div>
      )}
      
    </div>
  );
};
export default CheckOut;