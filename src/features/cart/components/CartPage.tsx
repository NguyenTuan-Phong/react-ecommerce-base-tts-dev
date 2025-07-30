/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import IMG from '../../../assets/img_news_event/14-maxresdefault-2-711x400.jpg';
import { useCart } from '../hook/useCart';
import Pay from './Pay';
import useUserStore from '../../../store/useUserStore';
import { useEffect, useState } from 'react';
import type { CartItem } from '../../../types';
import { useUpdateCart } from '../hook';

const CartPage = () => {
  const {
    refetchCart,
    dataCartItem,
    handleRemoveProduct,
    isPendingRemoveProduct,
    isPendingClearCart,
    handleClearCart,
  } = useCart();

  const {
    isPendingUpdateItemCart,
    handleUpdateItemCart,
    isModalOpen,
    setIsModalOpen
  } = useUpdateCart(refetchCart);

  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  const [currentQuantity, setCurrentQuantity] = useState(1);
  


  const cartItems = dataCartItem?.data?.cartItems ?? [];

  useEffect(() => {
  console.log('Cart Items:', dataCartItem);
}, [dataCartItem]);

  const userId = useUserStore((state) => state.user?.id);



  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
  const price = item.product.flashPrice && item.product.flashPrice > 0
    ? item.product.flashPrice
    : item.product.price;

  return sum + item.quantity * price;
}, 0);


  const data = {
    totalQuantity,
    totalPrice,
  };

  useEffect(() => {
    setCurrentQuantity(selectedItem?.quantity!);
  },[selectedItem])
  
  const handleIncreaseQuantity = () => {
    setCurrentQuantity(currentQuantity + 1);
  }

  const handleDecreaseQuantity = () => {
    if (currentQuantity > 1) {
      setCurrentQuantity(currentQuantity - 1);
    }
  }

  const handleUpdate = () => {
    const productId = selectedItem?.product.productId!
    handleUpdateItemCart({ productId: productId, newQuantity: currentQuantity })
  }


  return (
    <div className='max-w-[1400px] flex mx-auto flex-col'>
      <section className='flex gap-4 py-[20px]'>
        <Link className="link" to={'/'}>
          TRANG CHỦ
        </Link>
        <p className='section-text'>/</p>
        <p className='font-bold section-text'>THÔNG TIN GIỎ HÀNG</p>
      </section>

      {cartItems.length > 0 ? (
        <>
          <section className='my-[10px] gap-4 flex flex-col'>
            <div className='bg-[white] rounded-[8px]'>
              <div className='flex p-4 flex-wrap'>
                <p className='font-[600] flex-1'>THÔNG TIN GIỎ HÀNG</p>
                <div className='gap-4 flex flex-wrap'>
                  <div className='hover:cursor-pointer font-[600]'>
                    <Button
                      loading={isPendingClearCart}
                      className='px-5! py-4! h-10!'
                      onClick={() => handleClearCart(userId!)}
                    >
                      XÓA GIỎ HÀNG
                    </Button>
                  </div>
                </div>
              </div>
              <div className='h-[1px] bg-[#f5f5f5]'></div>

              {/* title */}
              <div className='p-4 hidden lg:flex'>
                <div className='flex-1'>
                  <b>Sản phẩm</b>
                </div>
                <div className='w-[180px] text-center'>
                  <b>Đơn giá</b>
                </div>
                <div className='w-[180px] text-center'>
                  <b>Số lượng</b>
                </div>
                <div className='w-[180px] text-center'>
                  <b>Số tiền</b>
                </div>
                <div className='w-[120px] text-center'>
                  <b>Thao tác</b>
                </div>
              </div>
            </div>

            {cartItems.map((item: any) => (
              <div key={item.id} className='flex p-3 bg-[white] rounded-[8px] gap-2 flex-1'>
                <img className='h-[100px] w-[100px] rounded-[5px]' src={IMG} alt='Ảnh sản phẩm' />
                <div className='flex flex-wrap'>
                  {/* Mã sản phẩm */}
                  <div className='flex-1 flex gap-5'>
                    <ul className='flex flex-col'>
                      <b className="text-[18px] w-[170px] sm:min-w-[200px] md:w-[400px] lg:min-w-[600px] whitespace-normal break-words">
                        {item.product.name}
                      </b>
                      <li>Mã sản phẩm: {item.product.code || 'N/A'}</li>
                    </ul>
                  </div>
                
                  <div className='w-[180px] text-center text-[16px] text-[#818181] mt-3 content-center hidden lg:block'>
                    <div className={`text-[18px] font-bold ${item.product.flashPrice ? 'text-[#29A07E]' : 'text-[#E94E1B]'}`}>
                      {(item.product.flashPrice && item.product.flashPrice > 0 
                          ? item.product.flashPrice 
                          : item.product.price
                        ).toLocaleString()} VNĐ
                    </div>
                  </div>


                  <div className='flex flex-col flex-wrap sm:flex-row md:flex-row lg:flex-row sm:items-center gap-11'>
                    <div className='w-[180px] text-center text-[16px] text-[#818181] mt-3 flex items-center justify-center gap-2'>
                      <div className='w-10 h-10 bg-[#818181] rounded-full opacity-25 text-black flex items-center justify-center hover:cursor-pointer'
                      onClick={() => {
                        setSelectedItem(item);
                        setIsModalOpen(true);
                      }}>
                        -
                      </div>

                      <input
                        className='w-[60px] h-10 text-center'
                        type='text'
                        readOnly
                        value={item.quantity}
                      />

                      <div className='w-10 h-10 bg-[#818181] rounded-full opacity-50 text-black flex items-center justify-center hover:cursor-pointer'
                      onClick={() => {
                        setSelectedItem(item);
                        setIsModalOpen(true);
                      }}>
                        +
                      </div>
                    </div>
                    <div className='flex flex-wrap sm:flex-col md:flex-col lg:flex-row sm:items-center gap-y-2 sm:gap-x-4 gap-3'>
                      {/* Giá */}
                      <div className="text-[18px] font-bold text-[#29A07E]">
                           {(item.product.flashPrice && item.product.flashPrice > 0 ? item.product.flashPrice : item.product.price).toLocaleString()} VNĐ
                      </div>

                                              

                      {/* Nút Xóa */}
                      <div
                        className='text-[16px] sm:text-right  hover:cursor-pointer text-center'
                        onClick={() => handleRemoveProduct(userId!, item.product.id)}
                      >
                        <Button className='px-5!' loading={isPendingRemoveProduct}>
                          Xóa
                        </Button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </section>
          <section className='mt-2 mb-5'>
            <Pay data={data} />
          </section>

          <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer
          >
            <div className='flex pt-5 bg-[white] rounded-[8px] flex-col'>
                <div className='flex gap-3'>
                  <img className='h-[160px] w-[160px] rounded-[5px] ' src={IMG} alt='Ảnh sản phẩm' />
                  <div className='flex flex-col gap-3 pl-2 flex-wrap '>
                    <ul className="flex flex-col lg:max-w-full max-w-[150px]">
                      <li className="text-[18px] font-bold truncate overflow-hidden whitespace-nowrap w-full">
                        {selectedItem?.product?.name}
                      </li>
                      <li>
                        Mã sản phẩm: {selectedItem?.product.code || 'N/A'}
                      </li>
                    </ul>


                    <div className='text-[16px] text-[#818181] content-center'>
                      {(selectedItem?.product.flashPrice ?? selectedItem?.product.price)?.toLocaleString()} VNĐ
                    </div>

                    <div className='text-[16px] text-[#818181] mt-3 flex items-center gap-2'>
                      <div className={`w-10 h-10 bg-[#818181] rounded-full opacity-25 text-black flex items-center justify-center 
                          ${
                            currentQuantity === 1 ? 'cursor-not-allowed' : 'hover:cursor-pointer'
                          }`}
                      onClick={handleDecreaseQuantity}
                      >
                        -
                      </div>

                      <input
                        className='w-[60px] h-10 text-center'
                        type='text'
                        readOnly
                        value={currentQuantity}
                      />

                      <div className='w-10 h-10 bg-[#818181] rounded-full opacity-50 text-black flex items-center justify-center hover:cursor-pointer'
                      onClick={handleIncreaseQuantity}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div className='mt-10 flex justify-center'>
                  <Button className={`p-5! w-30! h-12! font-bold! text-[18px]! bg-[#cf442f]! text-[white]!
                  hover:bg-[#3e7b3e]! hover:border-[#3e7b3e]`}
                  onClick={handleUpdate}
                  loading={isPendingUpdateItemCart}
                  >Lưu</Button>
                </div>
              </div>
          </Modal>
        </>
      ) : (
        <section className='bg-[white] h-[200px] text-center content-center text-[24px] font-bold mb-3'>
          <p>Giỏ hàng của bạn đang trống</p>
        </section>
      )}
    </div>
  );
};

export default CartPage;