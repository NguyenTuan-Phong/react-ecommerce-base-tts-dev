import { Link } from 'react-router-dom';
import type { CartItem, IComboItemsResp } from '../../../types';
import ImageWithFallback from '../../../components/img/ImageWithFallback';

interface Props {
  dataCartItem: CartItem[];
  comboItems: IComboItemsResp[];
}
const ViewHoverButtonCart = ({ dataCartItem, comboItems }: Props) => {
  // const { dataCartItem } = useCart();
  const cartItems = dataCartItem ?? [];

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  return (
    <>
      {cartItems.length > 0 ? (
        <div className='bg-white  shadow-lg w-[370px] max-h-[420px] flex flex-col overflow-hidden'>
          <div className='flex-1 overflow-y-auto bg-[#f8f7f7] flex flex-col gap-2'>
            {dataCartItem.map((item: CartItem) => (
              <div key={item.id} className='flex items-center px-3 py-4 border'>
                <ImageWithFallback
                  src={item.product.imageUrl} 
                  alt={item.product.name} 
                  className='w-[60px] h-[60px] object-cover rounded mr-3' 
                />
                <div className='flex-1'>
                  <div className='flex-1'>
                    <div className='font-semibold text-[15px] leading-5 text-[#222] mb-1 line-clamp-1'>
                      {item.product.name}
                    </div>
                  </div>
                  <div className='text-[#e74c3c] font-bold text-[17px] ml-2 flex justify-between items-center'>
                    <div className='text-xs text-[#888]'>{item.quantity}</div>
                    {(item.product.price * item.quantity).toLocaleString()} VNĐ
                  </div>
                </div>
              </div>
            ))}
            {comboItems &&
              comboItems.map((item: IComboItemsResp) => (
                <div key={item.id} className='flex items-center px-3 py-4 border'>
                  <ImageWithFallback
                    src={item.combo.imageUrl}
                    alt={item.combo.nameCombo}
                    className='w-[60px] h-[60px] object-cover rounded mr-3'
                  />
                  <div className='flex-1'>
                    <div className='flex-1'>
                      <div className='font-semibold text-[15px] leading-5 text-[#222] mb-1 line-clamp-1'>
                        {item.combo.nameCombo}
                      </div>
                    </div>
                    <div className='text-[#e74c3c] font-bold text-[17px] ml-2 flex justify-between items-center'>
                      <div className='text-xs text-[#888]'>{item.quantity}</div>
                      {(item.combo.price * item.quantity).toLocaleString()} VNĐ
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className='bg-[#fafbfc] px-4 py-3'>
            <div className='flex justify-between items-center mb-3'>
              <span className='text-[#888] text-[15px]'>
                Tổng tiền hàng (<span className='text-[#e74c3c]'>{totalQuantity} sản phẩm</span>):
              </span>
              <span className='text-[#e74c3c] font-bold text-[20px]'>
                {totalPrice?.toLocaleString()} VNĐ
              </span>
            </div>
            <button className='w-full bg-[#fa7833]  text-white font-bold py-3 rounded-lg text-[17px] transition hover:cursor-pointer'>
              <Link className='text-white' to={'/cart'}>
                THANH TOÁN NGAY
              </Link>
            </button>
          </div>
        </div>
      ) : (
        <div className='bg-white  shadow-lg w-[370px] h-[120px] flex flex-col overflow-hidden text-center items-center justify-center'>
          Có 0 sản phẩm trong giỏ hàng
        </div>
      )}
    </>
  );
};

export default ViewHoverButtonCart;