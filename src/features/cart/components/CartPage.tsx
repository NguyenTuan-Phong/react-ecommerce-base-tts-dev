import { Button } from 'antd';
import { Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { TypeUpdate } from '../../../services';
import useUserStore from '../../../store/useUserStore';
import type { CartItem, IComboItemsResp } from '../../../types';
import { useUpdateCart } from '../hook';
import { useCart } from '../hook/useCart';
import Pay from './Pay';
import ImageWithFallback from '../../../components/img/ImageWithFallback';

const CartPage = () => {
  const {
    refetchCart,
    dataCartItem,
    handleRemoveProduct,
    isPendingRemoveProduct,
    isPendingClearCart,
    handleClearCart,
  } = useCart();

  const { isPendingUpdateItemCart, handleUpdateItemCart, isModalOpen, setIsModalOpen } =
    useUpdateCart(refetchCart);
  console.log('[LOG] ~ CartPage ~ isModalOpen:', isModalOpen);
  console.log('[LOG] ~ CartPage ~ isPendingUpdateItemCart:', isPendingUpdateItemCart);

  const [selectedItem, setSelectedItem] = useState<CartItem | null | IComboItemsResp>(null);
  const [currentQuantity, setCurrentQuantity] = useState(1);
  console.log('[LOG] ~ CartPage ~ currentQuantity:', currentQuantity);
  const dataCartItemMemo = useMemo(() => {
    return {
      cartItems: dataCartItem?.data?.cartItems || ([] as CartItem[]),
      comboItems: dataCartItem?.data?.comboItems || ([] as IComboItemsResp[]),
    };
  }, [dataCartItem]);

  const userId = useUserStore((state) => state.user?.id);

  const totalQuantity = dataCartItemMemo.cartItems.reduce((sum, item) => sum + item.quantity, 0)
                      + dataCartItemMemo.comboItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = dataCartItemMemo.cartItems.reduce((sum, item) => {
      const price =
        item.product.flashPrice && item.product.flashPrice > 0
          ? item.product.flashPrice
          : item.product.price;

      return sum + item.quantity * price;
    },0) + 
    
    (dataCartItem?.data?.comboItems || []).reduce((sum, combo) => {
      const price = combo.combo.price;
      return sum + combo.quantity * price;
    }, 0)
  
  ;

  const data = {
    totalQuantity,
    totalPrice,
  };

  useEffect(() => {
    setCurrentQuantity(selectedItem?.quantity!);
  }, [selectedItem]);

  const handleUpdateV2 = (data: TypeUpdate) => {
    handleUpdateItemCart(data);
  };

  return (
    <div className='max-w-screen-xl mx-auto flex flex-col px-4 lg:px-6 min-h-[calc(100vh-512px)]'>
      {/* Breadcrumbs */}
      <section className='flex items-center gap-3 py-4 text-sm text-gray-500'>
        <Link className='hover:text-gray-700 transition' to={'/'}>
          TRANG CHỦ
        </Link>
        <span className='select-none'>/</span>
        <p className='font-semibold text-gray-800'>THÔNG TIN GIỎ HÀNG</p>
      </section>

      {dataCartItemMemo.cartItems.length || dataCartItemMemo.comboItems.length > 0 ? (
        <>
          {/* Header Card */}
          <section className='my-3 flex flex-col gap-4'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
              <div className='flex flex-wrap items-center justify-between p-4'>
                <p className='font-semibold text-gray-800'>THÔNG TIN GIỎ HÀNG</p>
                <div>
                  <Button
                    loading={isPendingClearCart}
                    className='!h-10 !px-5 rounded-lg shadow-sm hover:shadow transition'
                    onClick={() => handleClearCart(userId!)}
                  >
                    XÓA GIỎ HÀNG
                  </Button>
                </div>
              </div>
              <div className='h-px bg-gray-100' />

              {/* Title row (desktop) */}
              <div className='hidden lg:grid grid-cols-[1fr_180px_180px_180px_120px] items-center px-4 py-3 text-sm text-gray-700 bg-gray-50'>
                <div className='font-semibold'>Sản phẩm</div>
                <div className='text-center font-semibold border-l border-gray-200'>Đơn giá</div>
                <div className='text-center font-semibold border-l border-gray-200'>Số lượng</div>
                <div className='text-center font-semibold border-l border-gray-200'>Số tiền</div>
                <div className='text-center font-semibold border-l border-gray-200'>Thao tác</div>
              </div>
            </div>

            {/* Items */}
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
                  <div className='hidden lg:grid grid-cols-[1fr_180px_180px_180px_120px] items-center divide-x divide-gray-100'>
                    {/* Sản phẩm */}
                    <div className='px-4 py-4'>
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

                    {/* Số lượng */}
                    <div className='px-4 py-4 text-center'>
                      <div className='mx-auto w-max flex items-center gap-2'>
                        <button
                          type='button'
                          className='w-9 h-9 rounded-full bg-gray-50 text-gray-700 grid place-items-center border border-gray-200 hover:bg-gray-100 active:scale-95 transition'
                          onClick={() => {
                            setSelectedItem(item);
                            // setIsModalOpen(true);
                            handleUpdateV2({
                              productId: item.product.id,
                              newQuantity: Number(item.quantity - 1),
                            });
                          }}
                          aria-label='Giảm số lượng'
                        >
                          −
                        </button>
                        <input
                          className='w-14 h-9 text-center border border-gray-200 rounded-md bg-white text-gray-900 select-none'
                          type='text'
                          readOnly
                          value={item.quantity}
                          aria-label='Số lượng hiện tại'
                        />
                        <button
                          type='button'
                          className='w-9 h-9 rounded-full bg-gray-50 text-gray-700 grid place-items-center border border-gray-200 hover:bg-gray-100 active:scale-95 transition'
                          onClick={() => {
                            setSelectedItem(item);
                            // setIsModalOpen(true);
                            handleUpdateV2({
                              productId: item.product.id,
                              newQuantity: Number(item.quantity + 1),
                            });
                          }}
                          aria-label='Tăng số lượng'
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Số tiền */}
                    <div className='px-4 py-4 text-center'>
                      <div className='text-lg font-bold text-emerald-600'>
                        {(unitPrice * item.quantity).toLocaleString()} VNĐ
                      </div>
                    </div>

                    {/* Thao tác */}
                    <div className='px-4 py-4 text-center'>
                      <Button
                        type='primary'
                        danger
                        icon={<Trash2 className='w-4 h-4' />}
                        loading={isPendingRemoveProduct}
                        onClick={() => handleRemoveProduct(userId!, item.product.id)}
                        className='!px-4 !h-10 rounded-lg shadow-sm hover:shadow transition focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                      >
                        Xoá
                      </Button>
                    </div>
                  </div>

                  {/* Mobile/Tablet stacked layout with labeled rows */}
                  <div className='lg:hidden p-4 flex flex-col gap-3'>
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
                          <button
                            type='button'
                            className='w-8 h-8 rounded-full bg-gray-50 text-gray-700 grid place-items-center border border-gray-200 hover:bg-gray-100 active:scale-95 transition'
                            onClick={() => {
                              setSelectedItem(item);
                              // setIsModalOpen(true);
                              handleUpdateV2({
                                productId: item.product.id,
                                newQuantity: Number(item.quantity - 1),
                              });
                            }}
                            aria-label='Giảm số lượng'
                          >
                            −
                          </button>
                          <input
                            className='w-12 h-8 text-center border border-gray-200 rounded-md bg-white text-gray-900 select-none'
                            type='text'
                            readOnly
                            disabled
                            value={item.quantity}
                            aria-label='Số lượng hiện tại'
                          />
                          <button
                            type='button'
                            className='w-8 h-8 rounded-full bg-gray-50 text-gray-700 grid place-items-center border border-gray-200 hover:bg-gray-100 active:scale-95 transition'
                            onClick={() => {
                              setSelectedItem(item);
                              // setIsModalOpen(true);
                              handleUpdateV2({
                                productId: item.product.id,
                                newQuantity: Number(item.quantity + 1),
                              });
                            }}
                            aria-label='Tăng số lượng'
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className='p-3 bg-gray-50 col-span-2 flex items-center justify-between'>
                        <div>
                          <p className='text-xs text-gray-500'>Số tiền</p>
                          <p className='text-base font-semibold text-emerald-600'>
                            {unitPrice.toLocaleString()} VNĐ
                          </p>
                        </div>
                        <Button
                          key={item.id}
                          type='primary'
                          danger
                          icon={<Trash2 className='w-4 h-4' />}
                          loading={isPendingRemoveProduct}
                          onClick={() => handleRemoveProduct(userId!, item.product.id)}
                          className='!px-4 !h-9 rounded-lg'
                        >
                          Xoá
                        </Button>
                      </div>
                    </div>
                  </div>
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
                  <div className='hidden lg:grid grid-cols-[1fr_180px_180px_180px_120px] items-center divide-x divide-gray-100'>
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
                        <button
                          type='button'
                          className='w-9 h-9 rounded-full bg-gray-50 text-gray-700 grid place-items-center border border-gray-200 hover:bg-gray-100 active:scale-95 transition'
                          onClick={() => {
                            setSelectedItem(item);
                            // setIsModalOpen(true);
                            handleUpdateV2({
                              comboId: item.combo.id,
                              comboQuantity: Number(item.quantity + 1),
                            });
                          }}
                          aria-label='Giảm số lượng'
                        >
                          −
                        </button>
                        <input
                          className='w-14 h-9 text-center border border-gray-200 rounded-md bg-white text-gray-900 select-none'
                          type='text'
                          readOnly
                          value={item.quantity}
                          aria-label='Số lượng hiện tại'
                        />
                        <button
                          type='button'
                          className='w-9 h-9 rounded-full bg-gray-50 text-gray-700 grid place-items-center border border-gray-200 hover:bg-gray-100 active:scale-95 transition'
                          onClick={() => {
                            setSelectedItem(item);
                            // setIsModalOpen(true);
                            handleUpdateV2({
                              comboId: item.combo.id,
                              comboQuantity: Number(item.quantity + 1),
                            });
                          }}
                          aria-label='Tăng số lượng'
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Số tiền */}
                    <div className='px-4 py-4 text-center'>
                      <div className='text-lg font-bold text-emerald-600'>
                        {unitPriceCombo.toLocaleString()} VNĐ
                      </div>
                    </div>

                    {/* Thao tác */}
                    <div className='px-4 py-4 text-center'>
                      <Button
                        type='primary'
                        danger
                        icon={<Trash2 className='w-4 h-4' />}
                        loading={isPendingRemoveProduct}
                        onClick={() => handleRemoveProduct(userId!, '', item?.combo?.id)}
                        className='!px-4 !h-10 rounded-lg shadow-sm hover:shadow transition focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                      >
                        Xoá
                      </Button>
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
                          <button
                            type='button'
                            className='w-8 h-8 rounded-full bg-gray-50 text-gray-700 grid place-items-center border border-gray-200 hover:bg-gray-100 active:scale-95 transition'
                            onClick={() => {
                              setSelectedItem(item);
                              setIsModalOpen(true);
                            }}
                            aria-label='Giảm số lượng'
                          >
                            −
                          </button>
                          <input
                            className='w-12 h-8 text-center border border-gray-200 rounded-md bg-white text-gray-900 select-none'
                            type='text'
                            readOnly
                            disabled
                            value={item.quantity}
                            aria-label='Số lượng hiện tại'
                          />
                          <button
                            type='button'
                            className='w-8 h-8 rounded-full bg-gray-50 text-gray-700 grid place-items-center border border-gray-200 hover:bg-gray-100 active:scale-95 transition'
                            onClick={() => {
                              setSelectedItem(item);
                              setIsModalOpen(true);
                            }}
                            aria-label='Tăng số lượng'
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className='p-3 bg-gray-50 col-span-2 flex items-center justify-between'>
                        <div>
                          <p className='text-xs text-gray-500'>Số tiền</p>
                          <p className='text-base font-semibold text-emerald-600'>
                            {unitPriceCombo.toLocaleString()} VNĐ
                          </p>
                        </div>
                        <Button
                          key={item.combo.id}
                          type='primary'
                          danger
                          icon={<Trash2 className='w-4 h-4' />}
                          loading={isPendingRemoveProduct}
                          onClick={() => handleRemoveProduct(userId!, '', item.combo.id)}
                          className='!px-4 !h-9 rounded-lg'
                        >
                          Xoá
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Pay section */}
          <section className='mt-2 mb-6'>
            <Pay data={data} isBuyNow={false} />
          </section>
        </>
      ) : (
        <section className='bg-white rounded-xl shadow-sm border border-gray-100 h-48 grid place-items-center text-xl sm:text-2xl font-semibold text-gray-700 mb-4'>
          <p>Giỏ hàng của bạn đang trống</p>
        </section>
      )}
    </div>
  );
};

export default CartPage;