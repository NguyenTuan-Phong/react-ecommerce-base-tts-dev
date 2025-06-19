import { cartItems } from '../data/cartItems'
import { Link } from 'react-router-dom';

const totalQty = 9;
const totalPrice = 2618000;


const ViewHoverButtonCart = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg w-[370px] max-h-[420px] flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto bg-[#f8f7f7]">
                {cartItems.map(item => (
                    <div key={item.id} className="flex items-center px-3 py-4 last:border-b-0">
                        <img
                            src={item.img}
                            alt={item.name}
                            className="w-[80px] h-[80px] object-cover rounded mr-3"
                        />
                        <div className='flex-1'>
                            <div className="flex-1">
                                <div className="font-semibold text-[15px] leading-5 text-[#222] mb-1 line-clamp-2">{item.name}</div>
                            </div>
                            <div className="text-[#e74c3c] font-bold text-[17px] ml-2 flex justify-between items-center">
                                <div className="text-xs text-[#888]">x{item.qty}</div>
                                {item.price.toLocaleString()} đ
                            </div>
                        </div>
                        
                    </div>
                ))}
            </div>
            <div className="bg-[#fafbfc] px-4 py-3">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-[#888] text-[15px]">
                        Tổng tiền hàng (<span className="text-[#e74c3c]">{totalQty} sản phẩm</span>):
                    </span>
                    <span className="text-[#e74c3c] font-bold text-[20px]">{totalPrice.toLocaleString()}đ</span>
                </div>
                <button className="w-full bg-[#22a085] hover:bg-[#1b7e6b] text-white font-bold py-3 
                rounded-lg text-[17px] transition hover:cursor-pointer">
                    <Link style={{color: 'black'}} to={'/cart'}>
                        THANH TOÁN NGAY
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default ViewHoverButtonCart;